//Ver si tengo que meterlas de vuelta a la function canvas
let canvas = document.querySelector('#myCanvas');
let input = document.querySelector('#input');
let context = canvas.getContext('2d');
let btnGuardar = document.querySelector('#btnGuardar');
let imagenOriginal;
input.addEventListener("change",cargarImagen,false);
btnGuardar.addEventListener("click",guardarImagen);
let btnLimpiar = document.querySelector('#btnLimpiar');
btnLimpiar.addEventListener("click",limpiaCanvas);


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
          canvas.width = 500;
          canvas.height = 500;
          let imageAspectRatio = (1.0 * this.height) / this.width;
          let imageScaledWidth = canvas.width;
          let imageScaledHeight = canvas.width * imageAspectRatio;

          if (this.width > canvas.width) {
              imageAspectRatio = (1.0 * canvas.width) / this.width;
              imageScaledWidth = canvas.width;
              imageScaledHeight = this.height * imageAspectRatio;
          }
          if (this.height > canvas.height) {
              imageAspectRatio = (1.0 * canvas.height) / this.height;
              imageScaledWidth = this.width * imageAspectRatio;
              imageScaledHeight = canvas.height;
          }
          canvas.width = imageScaledWidth;
          canvas.height = imageScaledHeight;
          context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);
          imagenOriginal = context.getImageData(0, 0, canvas.width, canvas.height);
        }
    }
}


function limpiaCanvas() {
    context.fillStyle = "#E8E8E8";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 8;
    context.lineJoin = "bevel";
    imagenOriginal =  context.getImageData(0, 0, canvas.width, canvas.height);
}

 function guardarImagen () {
    let link = window.document.createElement( 'a' ),
        url = canvas.toDataURL(),
        filename = 'canvas.jpg';
    link.setAttribute( 'href', url );
    link.setAttribute( 'download', filename );
    link.style.visibility = 'hidden';
    window.document.body.appendChild( link );
    link.click();
    window.document.body.removeChild( link );
}

function copiarImagen(context, imagenOriginal) {
  let copia = context.createImageData(imagenOriginal.width, imagenOriginal.height);
  copia.data.set(imagenOriginal.data);
  return copia;
}

limpiaCanvas();






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

//HACER BOTON DE DESHACER 
//guardar cambios en un array de instancias