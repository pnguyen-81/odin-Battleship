import {Ship} from "./ship"

class Gameboard {
    constructor(boardOwner='ai'){
        this.owner = boardOwner;
        this.board = [];
        this.map = this.generateMap();
        this.started = false;
        this.shipsLeft = {};
        //for AI to check if tile has been shot before
        this.shots = [];
    }
    
    allShipSunk(){
        //iterating through Object keys
        if(Object.keys(this.shipsLeft).length==0){
            return true
        } else {
            return false
        }
    }

    //A check to remove ships out of ships left
    shipMarker(pos){
        for (const ship in this.shipsLeft){
            if (this.shipsLeft[ship].positions.includes(pos)){
                this.shipsLeft[ship].hit.push(pos)
            }
            if (this.shipsLeft[ship].isSunk()){
                delete this.shipsLeft[ship]
            }
        }
    }

    generateMap(){
        for (let i = 0; i < 100; i++){
            this.board.push({ship:false})
        }
    }

    generateShip(){
        this.shipsLeft = {}
        for (let i = 1; i <= 5; i++){
            let vertOrhorz = Math.floor(Math.random()*2)
            let start = Math.round(Math.random()*99)
            if (vertOrhorz==0){
                if(start-(i*10)>0){
                    let newShip = new Ship(i, start, 'v', 'u')
                    this.shipsLeft[i]=newShip
                } else {
                    let newShip = new Ship(i, start, 'v', 'd')
                    this.shipsLeft[i]=newShip
                }
            } else {
                if(Math.floor(start/10)==Math.floor((start+i)/10)){
                    let newShip = new Ship(i, start, 'h', 'f')
                    this.shipsLeft[i]=newShip
                } else {
                    let newShip = new Ship(i, start, 'h', 'b')
                    this.shipsLeft[i]=newShip
                }
            }
        }
        if (this.owner == 'user'){
        placeShip(this)
        } else {
            AIplaceShip(this)
        }
    }
}

function placeShip(x){
    for (let pos of x.board){
        pos.ship = false
    }
    for (let i of document.querySelectorAll('.active')){
        i.classList.remove('active')
    }
    for (let i = 1; i <= 5; i++){
        for (let position of x.shipsLeft[i].positions){
            x.board[position].ship = true
            document.querySelector(`.uBoard>[id='${position}']`).classList.add('active')
        }
    }
}

function AIplaceShip(x){
    for (let pos of x.board){
        pos.ship = false
    }
    for (let i of document.querySelectorAll('.aiactive')){
        i.classList.remove('aiactive')
    }
    for (let i = 1; i <= 5; i++){
        for (let position of x.shipsLeft[i].positions){
            x.board[position].ship = true
            document.querySelector(`.aiBoard>[id='${position}']`).classList.add('aiactive')
        }
    }
}


export {Gameboard, placeShip}
