
class Ficha { 
    constructor(x,y,jugador) {
        this.x = x;
        this.y = y;
        this.jugador = jugador;
        this.radio = 30;
        this.enTablero = false;
        }

    dibujarse() {
        let  imgFichaAzul = document.querySelector('#fichaAzul');
        let  imgFichaRoja = document.querySelector('#fichaRoja');  
        if (this.jugador == 1){
            ctx.drawImage(imgFichaAzul, this.x - this.radio, this.y - this.radio);
        } else {
            ctx.drawImage(imgFichaRoja, this.x - this.radio, this.y - this.radio);
        }
        
        ctx.fill();
        ctx.closePath()
    }

    contienePunto (x,y) {
      let  _x = this.x - x;
      let  _y = this.y - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radio;
    }

    setY (y) {
        this.y = y;
    } 

    setX (x) {
        this.x = x;
    } 

    getX () {
       return this.x;
    } 

    getY () {
        return this.y;
    } 

    getJugador() {
        return this.jugador;
    }

    estaEnTablero() {
        return this.enTablero;
    }

    setEnTablero() {
        this.enTablero = true;
    }
    
}

