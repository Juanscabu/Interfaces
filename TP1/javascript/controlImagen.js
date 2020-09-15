let canvas = document.querySelector('#myCanvas');
let context = canvas.getContext('2d');
let imagenOriginal;
let input = document.querySelector('#input');
input.addEventListener("change",cargarImagen,false);
let btnGuardar = document.querySelector('#btnGuardar');
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
          canvas.width = 800;
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
    canvas.width = 800;
    canvas.height = 500;
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