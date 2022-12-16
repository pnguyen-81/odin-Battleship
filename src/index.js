import './style.css';
import { Gameboard, placeShip } from './gameboard';

//generating user board
const user = new Gameboard('user')
let uBoard = document.createElement('div')
uBoard.classList.add('uBoard')
document.querySelector('.userGame').appendChild(uBoard)
for (let i in user.board){
    let tile = document.createElement('div')
    tile.id = parseInt(i)
    tile.classList.add('tile')
    uBoard.appendChild(tile)
}

//Add event listener to buttons
let randombtn = document.querySelector('.Reset')
let startbtn = document.querySelector('.start')
randombtn.addEventListener('click', ()=>{do{user.generateShip()}while(document.querySelectorAll('.active').length!=15);startbtn.style.display = 'inline'})
startbtn.addEventListener('click', ()=>{do{ai.generateShip()}while(document.querySelectorAll('.aiactive').length!=15);user.started=true; randombtn.style.display = 'none'; startbtn.style.display = 'none'})

//generating AI board
let aiBoard = document.createElement('div')
aiBoard.classList.add('aiBoard')
const ai = new Gameboard();
document.querySelector('.aiGame').appendChild(aiBoard)
for (let i in user.board){
    let tile = document.createElement('div')
    tile.id = parseInt(i)
    tile.classList.add('aitile')
    tile.addEventListener('click', ()=>{if((user.started == true) && (!tile.classList.contains('hit'))&&(!tile.classList.contains('miss'))){
        if (ai.board[tile.id].ship){
            tile.classList.add('hit')
        } else {
            ai.shots.push(tile.id);
            tile.classList.add('miss')
        }
        ai.shipMarker(parseInt(tile.id))
        if(ai.allShipSunk()){
            user.started=false
            gameOver('Win')
        }
        if (user.started==true){
            user.started=false
            setTimeout(()=>AIturn(), 500)
        }
    }})
    aiBoard.appendChild(tile)
}

function AIturn(){
    const turn = generateMove();
    user.shots.push(turn)
    if(user.board[turn].ship){
        document.querySelector(`.uBoard>[id='${turn}']`).classList.add('hit')
        hitGlow()
        } else {
        document.querySelector(`.uBoard>[id='${turn}']`).classList.add('miss')
        missGlow()
        }
        user.shipMarker(parseInt(turn))
    if(user.allShipSunk()){
        user.started=false
        gameOver('Lost')
    } else {
    user.started=true}
}


function generateMove(){
    let move = Math.floor(Math.random()*100)
    if (user.shots.includes(move)){
        move = generateMove()
    }
    return move
}

function hitGlow(){
    document.querySelector('.miss.sample').style = 'box-shadow: inset rgb(207, 207, 207, .5) 0px 0px 0px 10px'
    document.querySelector('.hit.sample').style = 'box-shadow: inset rgb(255, 145, 145) 0px 0px 0px 10px'
}

function missGlow(){
    document.querySelector('.miss.sample').style = 'box-shadow: inset rgb(207, 207, 207) 0px 0px 0px 10px'
    document.querySelector('.hit.sample').style = 'box-shadow: inset rgb(255, 145, 145, .5) 0px 0px 0px 10px'
}

function gameOver(x){
    document.querySelector('.result>div').textContent = `You ${x}!`
    document.querySelector('.result').style.display = 'inline'
}