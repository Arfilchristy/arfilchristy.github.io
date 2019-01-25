// JavaScript Document

//$(document).ready(function(){
var board;
const x = 'X';
const o = 'O';
const grid = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
var count = 0;
var o_win = 0;
var x_win = 0;

const game = document.querySelectorAll('.btn');
startGame();

function startGame() {
  document.querySelector(".endgame").style.display = "none";
  board = Array.from(Array(9).keys()) ;
  for (var i = 0; i < game.length; i++) {
    game[i].innerText = ' ';
    //game[i].style.removeClass('disable');
    game[i].style.removeProperty('background-color');
    game[i].addEventListener('click', turnClick, false);
    //game[i].removeClass('btn-primary');
    //game[i].removeClass('btn-info');
  }
}

/*function render(){
  $("#o_win").text("o Score: " + o_win);
  $("#x_win").text("x Score: " + x_win);
} */

function turnClick(square) {
  if (typeof board[square.target.id] == 'number') {
    turn(square.target.id, o)
    if (!winCheck(board, o) && !checkTie()) turn(spot(), x);
  } 
  
}

function turn(squareId, player){
  board[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let won = winCheck(board, player)
  if (won) gameOver (won)
}

function winCheck(br, player){
  let play = br.reduce((a, e, i) => 
    (e === player) ? a.concat(i) : a, []);
  let won = null;
  for (let [index, win] of grid.entries()){
    if (win.every(elem => play.indexOf(elem) > -1)) {
      won = {index: index, player: player};
      break;
    }
  }
  return won;
}

function gameOver(won){
  for (let index of grid[won.index]) {
    document.getElementById(index).style.backgroundColor =
      won.player == o ? "none" : "none";
  }
  for (var i = 0; i < game.length; i++) {
    game[i].removeEventListener('click', turnClick, false);
  }
  declareWinner(won.player == o ? "You win!" : "You lose.");
}

function declareWinner(XorO) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = XorO;
}

function emptySquares(){
  return board.filter(s => typeof s == 'number');
}

function spot(){
  return emptySquares()[0];
}

function checkTie() {
  if (emptySquares().length == 0){
    for (var i = 0; i < game.length; i++){
      //game[i].style.backgroundColor = "green";
      game[i].removeEventListener('click', turnClick, false);
    }
    declareWinner("Tie Game!")
    return true;
  }
  return false;
}

function minimax(newBoard, player) {
  var availSpot = emptySquares();

  if (winCheck(newBoard, o)) {
    return {score: -10};
  } else if (winCheck(newBoard, x)) {
    return {score: 10};
  } else if (availSpot.length === 0) {
    return {score: 0};
  }
  var moves = [];
  for (var i = 0; i < availSpot.length; i++) {
    var move = {};
    move.index = newBoard[availSpot[i]];
    newBoard[availSpot[i]] = player;

    if (player == x) {
      var result = minimax(newBoard, o);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, x);
      move.score = result.score;
    }

    newBoard[availSpot[i]] = move.index;

    moves.push(move);
  }

  var bestMove;
  if(player === x) {
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

/*
function CountWin(){
  if (count == 9) {
    alert('Its a tie. It will restart.')
    count = 0
  }
   else if ($(this).hasClass('disable'))
  {
    alert('Already selected')
  }
  else if (count%2 == 0)
  {
    count++
    $(this).text(o)
      $(this).addClass('disable o btn-primary')
      if ($("#0").hasClass('o') && $("#1").hasClass('o') && $("#2").hasClass('o') || $("#3").hasClass('o') && $("#4").hasClass('o') && $("#5").hasClass('o') || $("#6").hasClass('o') && $("#7").hasClass('o') && $("#8").hasClass('o') || $("#0").hasClass('o') && $("#3").hasClass('o') && $("#6").hasClass('o') || $("#1").hasClass('o') && $("#4").hasClass('o') && $("#7").hasClass('o') || $("#2").hasClass('o') && $("#5").hasClass('o') && $("#8").hasClass('o') || $("#0").hasClass('o') && $("#4").hasClass('o') && $("#8").hasClass('o') || $("#2").hasClass('o') && $("#4").hasClass('o') && $("#6").hasClass('o'))
      //if (winCheck)
      {
     alert('O wins')
     count = 0
     o_win++
$('#o_win').text(o_win)
        }
  }
   else  
  {
    count++
    $(this).text(x)
    $(this).addClass('disable x btn-info')
     if ($("#one").hasClass('x') && $("#two").hasClass('x') && $("#three").hasClass('x') || $("#four").hasClass('x') && $("#five").hasClass('x') && $("#six").hasClass('x') || $("#seven").hasClass('x') && $("#eight").hasClass('x') && $("#nine").hasClass('x') || $("#one").hasClass('x') && $("#four").hasClass('x') && $("#seven").hasClass('x') || $("#two").hasClass('x') && $("#five").hasClass('x') && $("#eight").hasClass('x') || $("#three").hasClass('x') && $("#six").hasClass('x') && $("#nine").hasClass('x') || $("#one").hasClass('x') && $("#five").hasClass('x') && $("#nine").hasClass('x') || $("#three").hasClass('x') && $("#five").hasClass('x') && $("#seven").hasClass('x'))
      // if (winCheck)
        {
   alert('X wins')
   count = 0
   x_win++
   $('#x_win').text(x_win)
        }
}
}
*/