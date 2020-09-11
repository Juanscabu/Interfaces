//Ver si tengo que meterlas de vuelta a la function canvas
let canvas = document.querySelector('#myCanvas');
let input = document.querySelector('#input');
let context = canvas.getContext('2d');
let btnGuardar = document.querySelector('#btnGuardar');
let imagenOriginal;
input.addEventListener("change",cargarImagen,false);
btnGuardar.addEventListener("click",save);


function cargarImagen() {
    limpiaCanvas();
    let file = this.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file); 

    reader.onload = readerEvent => {
        let content = readerEvent.target.result;
        let image = new Image();
        image.src = content;

        image.onload = function () {
            let imageAspectRatio = (1.0 * this.height) / this.width;
            let imageScaledWidth = canvas.width;
            let imageScaledHeight = canvas.width * imageAspectRatio;
            context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);
            let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
            imagenOriginal = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
            context.putImageData(imageData, 0, 0);
        }
    }
}


function limpiaCanvas() {
    context.fillStyle = "#E8E8E8";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#6F0000";
    context.lineWidth = 10;
    context.lineJoin = "bevel";
    context.strokeRect(0,0,canvas.width,canvas.height);
}

 function guardarImagen () {
    let link = window.document.createElement( 'a' ),
        url = canvas.toDataURL(),
        filename = 'screenshot.jpg';
    link.setAttribute( 'href', url );
    link.setAttribute( 'download', filename );
    link.style.visibility = 'hidden';
    window.document.body.appendChild( link );
    link.click();
    window.document.body.removeChild( link );
}

limpiaCanvas();


//On drag
//OnMousedown y onMouseUp

//Tenemos un par de formas de borrar el lienzo. 
//Una es con cnv2.clearRect(0,0,W,H) siendo W y H el ancho y ancho del elemento canvas

//escalar imagen 
/*
function borrarCnv5(){
    cnv5.clearRect(0,0,canvas5.width,canvas5.height);
}
function escalarMas(){
    borrarCnv5();
    cnv5.scale(3/2,3/2);
    trazarCnv5();
}
function escalarMenos(){
    borrarCnv5();
    cnv5.scale(2/3,2/3);
    trazarCnv5();
}
function rotarMas(){
    borrarCnv5();
    cnv5.rotate(Math.PI/32);
    trazarCnv5();
}
function rotarMenos(){
    borrarCnv5();
    cnv5.rotate(-Math.PI/32);
    trazarCnv5();
}
function trasladarMas(){
    borrarCnv5();
    cnv5.translate(5,5);
    trazarCnv5();
}
function trasladarMenos(){
    borrarCnv5();
    cnv5.translate(-5,-5);
    trazarCnv5();

    */

//Trazado 
/*
function IniciarDibujo(){
    // Creamos la pizarra 
    pizarraCanvas.style.cursor=estiloDelCursor;
    contexto=pizarraCanvas.getContext('2d');
    contexto.fillStyle=colorDeFondo;
    contexto.fillRect(0,0,anchoCanvas,altoCanvas);
    contexto.strokeStyle=colorDelTrazo;
    contexto.lineWidth=grosorDelTrazo;
    contexto.lineJoin='round';
    contexto.lineCap='round';
  // Capturamos los diferentes eventos
    pizarraCanvas.addEventListener('mousedown',MouseDown,false);// Click pc
    pizarraCanvas.addEventListener('mouseup',MouseUp,false);// fin click pc
    pizarraCanvas.addEventListener('mousemove',MouseMove,false);// arrastrar pc
  }
  function MouseDown(e){
    flag=true;
    contexto.beginPath();
    valX=e.pageX-posicionX(pizarraCanvas); valY=e.pageY-posicionY(pizarraCanvas);
    contexto.moveTo(valX,valY);
  }
  function MouseUp(e){
    contexto.closePath();
    flag=false;
  }
  function MouseMove(e){
    if(flag){
      contexto.beginPath();
      contexto.moveTo(valX,valY);
      valX=e.pageX-posicionX(pizarraCanvas); valY=e.pageY-posicionY(pizarraCanvas);
      contexto.lineTo(valX,valY);
      contexto.closePath();
      contexto.stroke();
    }
  }
 
  }
  function posicionY(obj) {
    var valor = obj.offsetTop;
    if (obj.offsetParent) valor += posicionY(obj.offsetParent);
    return valor;
  }
  function posicionX(obj) {
    var valor = obj.offsetLeft;
    if (obj.offsetParent) valor += posicionX(obj.offsetParent);
    return valor;
  }
  //Limpiar pizarra
  function LimpiarTrazado(){
    contexto=document.getElementById(idCanvas).getContext('2d');
    contexto.fillStyle=colorDeFondo;
    contexto.fillRect(0,0,anchoCanvas,altoCanvas);
  }
  // Enviar el trazado 
  function GuardarTrazado(){
    imagen.value=document.getElementById(idCanvas).toDataURL('image/png');
    document.forms[idForm].submit();
  }
  */

