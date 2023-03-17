const xClass = "x";
const oClass = "o";
let circleTurn;
const tiles = document.querySelectorAll("[data-tile]");
const game = document.querySelector("#game");
const winBox = document.querySelector("#msg")
const winMsg = document.querySelector("[data-msg] h2")
const restartBtn = document.querySelector("[data-restart")
const displayTurn = document.querySelector("#display-turn");
const turnO = document.querySelector(".o-turn")
const turnX = document.querySelector(".x-turn")

const winCombos = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row

    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column

    [0, 4, 8], // diagonal from top left
    [2, 4, 6]  // diagonal from top right
  ];


  
game.classList.add(xClass)

tiles.forEach(tile => {
    tile.addEventListener("click", handleClick, {once : true})
})

function handleClick(e){
    let tile = e.target;
    let currentClass = circleTurn? oClass : xClass;
    placeMark(tile, currentClass);

    if(checkWin(currentClass)){
        endGame(false);
    }else if(isDraw()){
        endGame(true)
    }else{
        changeTurn()
        tileHover()
    }
}

// ========PLACE MARK==========
function placeMark(tile, currentClass){
    tile.classList.add(currentClass)
}

// =========CHANGE TURN==========

function changeTurn(){
    circleTurn = !circleTurn
}

// =========TILE HOVER==========

function tileHover(){
    game.classList.remove(xClass)
    game.classList.remove(oClass);

    if(circleTurn){
        game.classList.add(oClass)
    }else{
        game.classList.add(xClass)
    }
}

// ===========CHECK WIN=========
function checkWin(currentClass){
    return winCombos.some(combo =>{
        return combo.every(index=>{
            return tiles[index].classList.contains(currentClass)
        })
    })
}
     

// =========CHECK DRAW===========
function isDraw(){
    return [...tiles].every(tile=>{
        return tile.classList.contains(oClass) || tile.classList.contains(xClass)
    })    
}

// ============SHOW MSG===========

function endGame(draw){
    if(draw){
        winMsg.innerText = `Draw!`
        winBox.classList.add("show")
    }else{
        winMsg.innerText = `${circleTurn? "O" : "X"} Wins!`
        winBox.classList.add("show")
    }
}

// ========RESTART=========

restartBtn.addEventListener("click", startGame)

function startGame(){

    winBox.classList.remove("show")

    tiles.forEach(tile =>{
        tile.classList.remove("x")
        tile.classList.remove("o")
    })

    tiles.forEach(tile => {
        tile.removeEventListener("click", handleClick)
    })

    tiles.forEach(tile => {
    tile.addEventListener("click", handleClick, {once : true})
})
}