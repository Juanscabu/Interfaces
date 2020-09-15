function blur(){
    let imageData = copiarImagen(context, imagenOriginal);
    let matriz = [[1/9,1/9,1/9],[1/9,1/9,1/9],[1/9,1/9,1/9]];
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