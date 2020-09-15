let btnNegativo = document.querySelector('#btnNegativo');
let btnSepia = document.querySelector('#btnSepia');
let btnGrises = document.querySelector('#btnGrises');
let selectFiltro = document.querySelector('#selectFiltro');
selectFiltro.addEventListener("change", seleccionaFiltro, false);

function seleccionaFiltro (event) {
switch (event.target.value) {
    case "original":
        original();
        break;
    case "escalaGrises":
      escalaGrises();
      break;
    case "sepia":
     sepia();
      break;
    case "negativo":
     negativo();
      break;
      case "binario":
     binario();
      break;
      case "blur":
     blur();
      break;
}
}

function original() {
    let imageData = copiarImagen(context, imagenOriginal);
    context.putImageData(imageData, 0, 0);
}

function escalaGrises() {
    let imageData = copiarImagen(context, imagenOriginal);
    for(let j = 0; j < imageData.height; j++){
        for(let i = 0; i < imageData.width; i++){
            let index = (j * 4) * imageData.width + i * 4;
            let avg = (imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
            imageData.data[index] = avg; 
            imageData.data[index + 1] = avg; 
            imageData.data[index + 2] = avg;
        }
    }
    context.putImageData(imageData, 0, 0);
}

function negativo() {
    let imageData = copiarImagen(context, imagenOriginal);
    for(let j = 0; j < imageData.height; j++){
        for(let i = 0; i < imageData.width; i++){
            let index = (j * 4) * imageData.width + i * 4;
            imageData.data[index] = 255 - imageData.data[index] ; 
            imageData.data[index + 1] = 255 - imageData.data[index + 1] ; 
            imageData.data[index + 2] = 255 - imageData.data[index + 2] ;
        }
    }
    context.putImageData(imageData, 0, 0);
}

function sepia() {
    let imageData = copiarImagen(context, imagenOriginal);
    for(let j = 0; j < imageData.height; j++){
        for(let i = 0; i < imageData.width; i++){
            let index = (j * 4) * imageData.width + i * 4;
            let luminosidad = .3 * imageData.data[index] + .6 * imageData.data[index + 1] + .1 * imageData.data[index + 2];
            imageData.data[index] = Math.min(luminosidad + 40, 255);
            imageData.data[index + 1] = Math.min(luminosidad + 15, 255); 
            imageData.data[index + 2] = luminosidad;	
        }
    }
    context.putImageData(imageData, 0, 0);
}

function binario() {
    let imageData = copiarImagen(context, imagenOriginal);
        for(let j = 0; j < imageData.height; j++){
            for(let i = 0; i < imageData.width; i++){
                let index = (j * 4) * imageData.width + i * 4;
                   if ( imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2] / 3 < 128) {
                    imageData.data[index] = 0;
                    imageData.data[index + 1] = 0; 
                    imageData.data[index + 2] = 0;	
                   }
                   else {
                    imageData.data[index] = 255;
                    imageData.data[index + 1] = 255; 
                    imageData.data[index + 2] = 255;	
                   }
                }
            }
            context.putImageData(imageData, 0, 0);
 }