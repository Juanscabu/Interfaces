let btnNegativo = document.querySelector('#btnNegativo');
let btnSepia = document.querySelector('#btnSepia');
let btnGrises = document.querySelector('#btnGrises');
btnNegativo.addEventListener("click",negativo);
btnSepia.addEventListener("click",sobel);
btnGrises.addEventListener("click",escalaGrises);

function escalaGrises() {
    imageData = imagenOriginal;
    console.log(imageData);
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
    imageData = imagenOriginal;
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
    imageData = imagenOriginal;
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

function sobel() {
    let horizontal = [-1,0,1,-2,0,2,-1,0,1];
    let vertical = [-1,-2,-1,0,0,0,1,2,1];
    imageData = imagenOriginal;
    for(let x = 0; x < imageData.height; x++){
        for(let y = 0; y < imageData.width; y++){
            index=(x+y*imageData.width)*4;
            vecinos=getVecinos(imageData,x,y);
            let valorR=0; let valorG=0; let valorB=0;
            for (let i = 0; i <=2; i++) {
                for (let j = 0; j <=2; j++) {
                    valorR+=vecinos[i][j].data[0]*kernel[i][j];
                    valorG+=vecinos[i][j].data[1]*kernel[i][j];
                    valorB+=vecinos[i][j].data[2]*kernel[i][j];
                }
            }
            result.data[index]=valorR;
            result.data[index+1]=valorG;
            result.data[index+2]=valorB;
        }
    }
    ctx.putImageData(result,0,0);
}

function getVecinos (imageData,x,y) {
    console.log(imageData);
        var rowLimit = imageData.height-1;
        var columnLimit = imageData.width-1;
      
        for(let i = Math.max(0, x-1); i <= Math.min(x+1, rowLimit); i++) {
          for(let j = Math.max(0, y-1); j <= Math.min(y+1, columnLimit); j++) {
            if(i !== x || j !== y) {
              console.log(imageData[i]);
            }
          }
        }
      }