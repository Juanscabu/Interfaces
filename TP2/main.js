let reiniciar = document.querySelector("#reiniciar");
let jugador = document.querySelector("#jugador");
reiniciar.addEventListener('click',reiniciarJuego);
let dimensionTablero = document.querySelector("#dimensionTablero");
dimensionTablero.addEventListener("change", cambiarDimension, false);
let fondo = document.querySelector('#fondo');

let xInicial = 0;
let yInicial = 0;
let moverFicha = false;
let fichaClickeada = null;

  canvas.addEventListener('mousedown', function(evt) {
    let x = evt.layerX
    let y = evt.layerY
    fichaClickeada = buscaFicha(x,y);
    if (fichaClickeada != null) {
    if (!fichaClickeada.estaEnTablero()) {
        moverFicha = true;
        xInicial = fichaClickeada.getX();
        yInicial = fichaClickeada.getY();
    }
    }
    }, false);
 
  canvas.addEventListener('mouseup', function(evt) {
    if (fichaClickeada != null) {
    if (!fichaClickeada.estaEnTablero()) {
    let anterior = 0;
    let actual = 0;
    let tamaño = tablero.getTamañoImagenRelleno();
    let columna = 1;
    let calculo = 0;
    let valorY = tablero.getTamañoImagenRelleno();
    moverFicha = false;
    if (fichaClickeada.getJugador() != tablero.getTurno() && fichaClickeada.getY() <= valorY) {
        while (columna < tablero.getDimension()+1 && !fichaClickeada.estaEnTablero()) {
        anterior = actual;
        actual = columna * tamaño;
        if (fichaClickeada.getX() > anterior && fichaClickeada.getX() < actual ) { 
          calculo = tablero.addFicha(columna-1,fichaClickeada.getJugador()) + 1;
            fichaClickeada.setX(anterior + tamaño/2);
            fichaClickeada.setY((calculo * tamaño) - tamaño/2);
            actualiza();
            fichaClickeada.setEnTablero();
            cambiarJugador();
        }
        columna++;
    }
    }
      if (calculo == 0) { 
        fichaClickeada.setX(xInicial);
        fichaClickeada.setY(yInicial);
        actualiza();
    }
  }}}, false);

canvas.addEventListener("mousemove", function(evt) {
  if (tablero.tieneGanador()){
    alert("Ganador Jugador: " + tablero.getTurno());
    reiniciarJuego();
  }
    if (fichaClickeada != null && moverFicha) {
      fichaClickeada.setX(evt.layerX);
      fichaClickeada.setY(evt.layerY);
      actualiza();
    } 
  }, false);


function buscaFicha (x,y) {
    for (let i = 0; i < fichas.length; i++) {
         if (fichas[i].contienePunto(x,y))
            return fichas[i];
    }
    return null;
}

function actualiza() {
  limpiaCanvas();
  ctx.drawImage(fondo, 0, 0 , 800 , 800); 
    for (let i = 0; i < fichas.length; i++) {
        fichas[i].dibujarse();
      }
      tablero.draw();
     
}

function reiniciarJuego() {
  jugador.innerHTML = "Turno jugador: ";
  fichas = [];
  cargafichas();
  tablero.reiniciarLogica();
  tablero.setGanador(false);
  tablero.setTurno(0);
  actualiza();
}

function cargafichas () {
  cantFichas = tablero.getDimension() * tablero.getDimension();
  let distribucionXAzules = 600
  let distribucionXRojas = 600
  let distribucionYAzules = 100;
  let distribucionYRojas = 300;
  for (let index = 0; index < cantFichas; index++) {
    
    if(index < cantFichas/2) {
      distribucionXAzules = distribucionXAzules + 10;
      if (distribucionXAzules > 700) {
        distribucionXAzules = 600;
        distribucionYAzules = distribucionYAzules + 50;
      } 
     let ficha = new Ficha(distribucionXAzules,distribucionYAzules,1);
     fichas.push(ficha);
    }
     else {
     distribucionXRojas = distribucionXRojas + 10;
     if (distribucionXRojas > 700) {
      distribucionXRojas = 600;
      distribucionYRojas = distribucionYRojas + 50;
    } 
     let ficha = new Ficha(distribucionXRojas,distribucionYRojas,2);
     fichas.push(ficha);
     }  
}
}

function cambiarJugador() {
  if (tablero.getTurno() == 2) 
  jugador.innerHTML = "Turno jugador: Azul";
    else 
      jugador.innerHTML ="Turno jugador: Rojo";
}

function cambiarDimension () {
  let dimension = parseInt(dimensionTablero.value, 10);
  tablero = new Tablero(ctx,dimension);
  reiniciarJuego();
}

let tablero = new Tablero(ctx,6);
let fichas = [];


cargafichas();
actualiza();