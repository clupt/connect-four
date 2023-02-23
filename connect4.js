"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // this was a previous attempt at making the board array
  /*const row = new Array(WIDTH).fill(null);
  let i = 0;
  while (i < HEIGHT) {
    board.push(row);
    i++;
  }*/
  // const wholeBoard = [...Array(WIDTH)].map(() => Array(HEIGHT));

  for (let y = 0; y < HEIGHT; y++) {
    const row = [];

    for (let x = 0; x < WIDTH; x++) {
      row.push(null);
    }
    board.push(row);
  }
  //board.push(wholeBoard);
}

console.log("board=", board);

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');

  //create the top row of the board and give each an event listener
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", `top-${x}`);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // TODO: Create a table row element and assign to a "row" variable
    const row = document.createElement('tr');
    for (let x = 0; x < WIDTH; x++) {
      // TODO: Create a table cell element and assign to a "cell" variable
      const cell = document.createElement('td');
      // TODO: add an id, c-y-x, to the above table cell element
      // you'll use this later, so make sure you use c-y-x
      cell.setAttribute('id', `c-${y}-${x}`);
      // TODO: append the table cell to the table row
      row.append(cell);
    }
    // TODO: append the row to the html board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  // console.log("x in findSpotForCol=", x);
  // TODO: write the real version of this, rather than always returning 5
  for (let y = HEIGHT - 1; y >= 0; y--) {
    //console.log("board[y][x] =", board[y][x]);

    console.log("currPlayer inside of findSpot=", currPlayer);
    if (board[y][x] === null) {
      console.log("x in find spot in col=", x);
      console.log("y in find spot in col=", y);
      return y;
    }
  }
  return null;
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  console.log(x);
  console.log(y);
  // TODO: make a div and insert into correct table cell
  const pieceToPlace = document.createElement("div");
  pieceToPlace.classList.add("piece");
  pieceToPlace.classList.add(`p${currPlayer}`);
  const place = document.getElementById(`c-${y}-${x}`);
  console.log(place);
  place.append(pieceToPlace);
}

/** endGame: announce game end */
//we would update this alert to handle a tie if there was more time
function endGame(msg) {
  //temporary alert message
  alert(`Game over player ${currPlayer} wins`);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = Number(evt.target.id.slice(-1));
  // console.log("evt.target.id=", evt.target.id);
  // console.log("+evt.target.id=", +evt.target.id);
  console.log("x in handleClick=", x);
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table

  board[y][x] = currPlayer;
  console.log("board", board[y][x]);
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  console.log("board in evt=", board);
  //Uses top row to check if last cell is filled and triggers endGame function
  if (board[0].every(el => el !== null)) {
    endGame();
  }

  // switch players

  if (currPlayer === 1) {
    currPlayer = 2;
  } else {
    currPlayer = 1;
  }
  console.log("current player", currPlayer);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {
    //console.log("CELLS", cells)
    return cells.every(([y, x]) => {
      return ((y < HEIGHT && y >= 0) && (x < WIDTH && x >= 0)) && (board[y][x] === currPlayer);

    });
    /*for(let i=0; i<cells.length; i++){
      for(let j=0; j<i.length; j++){
        if(cells)

      }*/

  }


  // TODO: Check four cells to see if they're all legal & all color of current
  // player



  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDR = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //console.log("diag", diagDL);

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
