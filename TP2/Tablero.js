let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');

class Tablero { 
    
    constructor(context,dimensionTablero) {
        this.context = context;
        this.dimensionTablero = dimensionTablero;
        this.logica = [];
        this.tamañoImagenRelleno = 70;
        this.cargarLogica(this.dimensionTablero);
        this.turno = 0;
        this.ganador = false;
        }

    draw() {
        let d = this.dimensionTablero;
        let fondo = document.querySelector('#fondo');
        let  relleno = document.querySelector('#relleno');
          //  ctx.drawImage(fondo,0,0);
        for (let i = 0; i < d; i++) {
            let  y = i *  this.tamañoImagenRelleno;
            for (let j = 0; j < d; j++) {
                let  x = j *  this.tamañoImagenRelleno;
                ctx.drawImage(relleno, x, y ,  this.tamañoImagenRelleno , this.tamañoImagenRelleno);       
            }
        }
    }

    cargarLogica(dimensionTablero) {
        for (let i = 0; i < dimensionTablero; i++) {
            this.logica[i] = [];
            for (let j = 0; j < dimensionTablero; j++) {
                this.logica[i][j] = 0;
                
        }            
        }
    }

    addFicha(columna,jugador) {
        let fila = 0;
        let ubico = false;
        if (this.logica[fila][columna] == 0) {
            while (fila<this.logica.length-1 && !ubico) {
                if (this.logica[fila+1][columna] == 0) 
                    fila++; 
                else {
                    this.logica[fila][columna] = jugador;
                    this.turno = fichaClickeada.getJugador();
                    ubico = true;
                    if(this.verificaGanador(fila,columna,jugador))
                    this.ganador = true;  
                }
            }
            if (fila == this.logica.length-1) {
                this.logica[fila][columna] = jugador;
                this.turno = fichaClickeada.getJugador();
                ubico = true;
                if(this.verificaGanador(fila,columna,jugador))
                    this.ganador = true;   
            }
        }
        return fila;
    }

    getTamañoImagenRelleno() {
        return this.tamañoImagenRelleno;
    }

    getDimension() {
        return this.dimensionTablero;
    }

    getTurno() {
        return this.turno;
    }

    tieneGanador() {
        return this.ganador;
    }

    setGanador(ganador) {
        this.ganador = ganador;
    }
 
    reiniciarLogica() {
        this.cargarLogica(this.dimensionTablero);
    }


    verificaGanador(fila,columna,jugador) {
        if (this.verificarGanadorVertical(fila,columna,jugador) || this.verificarGanadorHorizontal(fila,columna,jugador)
        || this.verificarGanadorDiagonalIzqDer(fila,columna,jugador) || this.verificarGanadorDiagonalDerIqz(fila,columna,jugador))
            return true;
        return false;
    }

    verificarGanadorHorizontal(fila,columna,jugador) {
        let i = columna;
        let total = 0;
        while(i >= 0 && this.logica[fila][i] == jugador) {          
            i--
        }
        i++  
        while(i < this.logica.length && this.logica[fila][i] == jugador) {
            i++
            total++
            if (total == 4) {
                return true;
            }
        }
        return false;
    }

    
    verificarGanadorVertical(fila,columna,jugador) {
        let i = fila;
        let total = 0;
        while(i < this.logica.length && this.logica[i][columna] == jugador) {
            i++
            total++
            if (total == 4) {
                return true;
            }
        }
        return false;
    }

    verificarGanadorDiagonalIzqDer(fila,columna,jugador) {
        let i = fila;
        let j = columna;
        let total = 0;
        while(i >= 0 && j>= 0 && this.logica[i][j] == jugador) {        
            i--
            j--
        }
        i++ 
        j++
        while(i < this.logica.length && j < this.logica.length && this.logica[i][j] == jugador) {
            i++
            j++
            total++
            if (total == 4) {
                return true;
            }
        }
        return false;
    }

    verificarGanadorDiagonalDerIqz(fila,columna,jugador) {
        let i = fila;
        let j = columna;
        let total = 0;
        while(i >= 0 && j < this.logica.length && this.logica[i][j] == jugador) {        
            i--
            j++
        }
        i++ 
        j--
        while(i < this.logica.length && j>= 0 && this.logica[i][j] == jugador) {
            i++
            j--
            total++
            if (total == 4) {
                return true;
            }
        }
        return false;
    }



}

function limpiaCanvas() {
    ctx.fillStyle = "#E8E8E8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
