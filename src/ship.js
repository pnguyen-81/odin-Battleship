class Ship{
    constructor(length, start, vertOrhorz, UForDB){
    this.name = name
    this.length = length
    this.positions = this.positions(start, vertOrhorz, UForDB)
    this.hit = []
    }

    isSunk(){
        if(this.hit.length == this.length){
            return true
        } else {
            return false
        }
    }

    hit(pos){
        this.hit.push(pos)
    }

    positions(start, vertOrhorz, UForDB){
        let positions = []
        if (vertOrhorz == 'v'){
            if(UForDB=='u'){
                for (let i = 0; i < this.length; i++){
                    let position = parseInt(start)-(i*10)
                    positions.push(position)
                }
            } else {
                for (let i = 0; i < this.length; i++){
                    let position = parseInt(start)+(i*10)
                    positions.push(position)
                }
            }
        } else {
            if(UForDB=='f'){
                for (let i = 0; i < this.length; i++){
                    let position = parseInt(start)+(i)
                    positions.push(position)
                }
            } else {
                for (let i = 0; i < this.length; i++){
                    let position = parseInt(start)-(i)
                    positions.push(position)
                }
            }
        }
        return positions
    }
}

export {Ship}