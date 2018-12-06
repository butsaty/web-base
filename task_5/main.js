var currentRow = 0;
var currentCell = 0;
var boardSize = 0;
var moveCount = 0;
var hasWinner = false;
var currentPlayer;
var table;

var Player = Object.freeze({
  "playerX": "X", 
  "playerO": "O"
});

var State = Object.freeze({
  "blank": "", 
  __proto__: Player
});

function setCurrentCell() {
//window.setTimeout(function () {
    table = document.getElementById('game-table');
    var row = table.rows[currentRow];
    var cell = table.rows[currentRow].cells[currentCell];

    row.focus();
    cell.focus();

    if(boardSize === 0){
      boardSize = table.rows.length;
    }
  //}, 300);             
}

function markCell() {
  if(isEmpty()){
    table.rows[currentRow].cells[currentCell].innerText = currentPlayer;

    moveCount++;
  } 
}

function rematch() {
    //clean up the board
    for (var r = 0, n = table.rows.length; r < n; r++) {
      for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
        table.rows[r].cells[c].innerHTML = State.blank;
      }
    }

    currentRow = 0;
    currentCell = 0;
    moveCount = 0;
    hasWinner = false;

    changePlayer();
    setCurrentCell();
}

function checkWinner(){
  hasWinner = winnerFound();
  var playerElement = document.getElementById('current-player');

  if(hasWinner){
    playerElement.innerText = "Palyer " + currentPlayer + " - win!";
  }
  else if(gameOver()){
    playerElement.innerText = "It was the great game! Rematch?";
  }
}

function winnerFound(){
  //check horizontal
  for(var i = 0; i < boardSize; i++){
    if(table.rows[currentRow].cells[i].innerText != currentPlayer)
      break;
    if(i === boardSize-1){
      return true;
    }
  }

  //check vertical
  for(var i = 0; i < boardSize; i++){
    if(table.rows[i].cells[currentCell].innerText != currentPlayer)
        break;
    if(i === boardSize-1){
      return true;
    }
  } 
      
  //check diagonal      
  if(currentCell === currentRow){
      for(var i = 0; i < boardSize; i++){
          if(table.rows[i].cells[i].innerText != currentPlayer)
            break;
          if(i === boardSize-1){
            return true;
          }
      }
  }

  //reverse check diagonal
  if(currentCell + currentRow === boardSize - 1){
      for(var i = 0; i<boardSize; i++){
          if(table.rows[i].cells[(boardSize-1)-i].innerText != currentPlayer)
              break;
          if(i === boardSize-1){
              return true;
          }
      }
  }

  return false;
}

function gameOver(){
  return hasWinner || moveCount === Math.pow(boardSize, 2);
}

function isEmpty(){
  return table.rows[currentRow].cells[currentCell].innerText === State.blank;
}

function changePlayer(){
  if(currentPlayer === Player.playerX)
      currentPlayer = Player.playerO;
  else currentPlayer = Player.playerX;

  var playerElement = document.getElementById('current-player');  
  playerElement.innerText = "Current player is '" + currentPlayer + "'";
}

function keydown(e){
  if(gameOver()){    
    return true;
  }

  switch(e.keyCode) {
    case 13:
    case 32: {
      if(!isEmpty()){
        return true;
      }

      markCell(); 
      checkWinner();  

      if(!gameOver())
        changePlayer();    

      return true;
    }

    case 37:
      if(currentCell != 0)
        currentCell--;            
      break;

    case 38:
      if(currentRow != 0)
        currentRow--;            
      break;

    case 39:
      if(currentCell < boardSize -1)
        currentCell++;            
      break;

    case 40:
      if(currentRow < boardSize -1)
        currentRow++;            
      break;

    default: return true;
  }         

  setCurrentCell();  
  return true;
};

//initialization
document.onkeydown = keydown;
setCurrentCell();
changePlayer();