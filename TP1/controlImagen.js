//Ver si tengo que meterlas de vuelta a la function canvas
let canvas = document.querySelector('#myCanvas');
let input = document.querySelector('#input');
let context = canvas.getContext('2d');
let btnG = document.querySelector('#boton');
//btnG.addEventListener("click",escalaGrises());

function cargarImagen() {
input.onchange = e => {
    limpiaCanvas();
    let file = e.target.files[0];
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
            context.putImageData(imageData, 0, 0);
        }
    }
}
}

function escalaGrises() {
    imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    for(let j = 0; j < imageData.height; j++){
        for(let i = 0; i < imageData.width; i++){
            let index = (j * 4) * imageData.width + i * 4;
            let avg = (imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
            imageData.data[index] = avg; 
            imageData.data[index + 1] = avg; 
            imageData.data[index + 2] = avg;
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

limpiaCanvas();
cargarImagen();

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