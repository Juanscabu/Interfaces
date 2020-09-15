function blur(){
    let imageData = copiarImagen(context, imagenOriginal);
    let matriz = [[1/9,1/9,1/9],[1/9,1/9,1/9],[1/9,1/9,1/9]];
    //let matriz = [[-1/9,1/9,1/9],[1/9,1/9,1/9],[1/9,1/9,1/9]];
    for (y=0;y<imageData.height;y++){
        for (x=0;x<imageData.width;x++){
            index=(x+y*imageData.width)*4;
            let adyacentes=getAdyacentes(imageData,x,y);
            let red=0;
            let green=0; 
            let blue=0;
            for (let i = 0; i <=2; i++) {
                for (let j = 0; j <=2; j++) {
                    red+=adyacentes[i][j].data[0]*matriz[i][j];
                    green+=adyacentes[i][j].data[1]*matriz[i][j];
                    blue+=adyacentes[i][j].data[2]*matriz[i][j];
                }
            }
            imageData.data[index]= red;
            imageData.data[index+1]= green ;
            imageData.data[index+2]= blue ;
        }
    }
    context.putImageData(imageData,0,0);
}

function detectarBordes(){
    let imageData= copiarImagen(context, imagenOriginal);
    let kernelY=[[-1,-2,-1],[0,0,0],[1,2,1]];
    let kernelX=[[-1,0,1],[-2,0,2],[-1,0,1]];
    let param=document.querySelector("#parametro").value;
    for (y=0;y<imageData.height;y++){
        for (x=0;x<imageData.width;x++){
            index=(x+y*canvas.width)*4;
            let gx=0; let gy=0;
            let vecinos=getAdyacentes(imageData,x,y);
            for (let i = 0; i <=2; i++) {
                for (let j = 0; j <=2; j++) {
                    gx+=vecinos[i][j].data[0]*kernelX[i][j];
                    gy+=vecinos[i][j].data[0]*kernelY[i][j];
                }
            }
            let G=Math.sqrt(gx*gx+gy*gy);
                r = 255;
                g = 255;
                b = 255;
                if (G>param) {
                    r = 0;
                    g = 0;
                    b = 0;
                }
            imageData.data[index+0]= r;
            imageData.data[index+1]= g;
            imageData.data[index+2]= b;
        }
    }
    context.putImageData(imageData,0,0);
}

function getBYN(){
    let imageData= copiarImagen(context, imagenOriginal);
    for (y=0;y<canvas.height;y++){
        for (x=0;x<canvas.width;x++){
            index=(x+y*imageData.width)*4;
            let promedio=(imageData.data[index+0]+imageData.data[index+1]+imageData.data[index+2])/3;
                imageData.data[index+0]=promedio;
                imageData.data[index+1]=promedio;
                imageData.data[index+2]=promedio;
        }
    }
    return imageData;
}

function getAdyacentes(imageData, x,y){
    let retorno=new Array(3);
    for (let a = 0; a < retorno.length; a++)
        retorno[a]=new Array(3);
    let pixel;
    let outofbounds={data:[0,0,0]};
    for (let i = -1; i <=1; i++) {
        for (let j = -1; j <=1; j++) {
            let index=((x+i)+(y+j)*canvas.width)*4;
            if (x+i>=0 && y+j>=0 && x+i<=imageData.width && y+j<=imageData.height)
                pixel={data:[imageData.data[index+0],imageData.data[index+1],imageData.data[index+2]]};
            else pixel=outofbounds;
            retorno[i+1][j+1]=pixel;
        }
    }
    return retorno;
}