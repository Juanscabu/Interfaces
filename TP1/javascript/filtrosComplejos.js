let rangoSaturacion = document.querySelector('#saturacion');
rangoSaturacion.addEventListener("change",saturacion,false);

function blur(){
    let imageData = copiarImagen(context, imagenOriginal);
    let matriz = [[1/9,1/9,1/9],[1/9,1/9,1/9],[1/9,1/9,1/9]];
    for (y=0;y<imageData.height;y++){
        for (x=0;x<imageData.width;x++){
            index=(x+y*imageData.width)*4;
            let adyacentes=getAdyacentes(imageData,x,y);
            let r=0;
            let g=0; 
            let b=0;
            for (let i = 0; i <=2; i++) {
                for (let j = 0; j <=2; j++) {
                    r+=adyacentes[i][j].data[0]*matriz[i][j];
                    g+=adyacentes[i][j].data[1]*matriz[i][j];
                    b+=adyacentes[i][j].data[2]*matriz[i][j];
                }
            }
            imageData.data[index]= r;
            imageData.data[index+1]= g ;
            imageData.data[index+2]= b ;
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

function saturacion () {
    let imageData = copiarImagen(context, imagenOriginal);
    for (y=0;y<imageData.height;y++){
        for (x=0;x<imageData.width;x++){
            let index = (x + y * imageData.width) * 4;
            let r = imageData.data[index] 
            let g =  imageData.data[index+1] 
            let b =  imageData.data[index+2] 
            let a = rgbToHsl(r, g, b);
            a[1] = 2;
            let pixel = hslToRgb(a[0], a[1], a[2]);
            imageData.data[index + 0] = pixel[0];
            imageData.data[index + 1] = pixel[1];
            imageData.data[index + 2] = pixel[2];
        }
    }
    context.putImageData(imageData, 0, 0);
}

function rgbToHsl (r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
}

function hslToRgb (h, s, l) {
    let intensidad = document.querySelector("#saturacion").value;
    let r;
    let g;
    let b;

    if (s == 0) {
        r = g = b = l;
    } else {
        function hueTorgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;

        r = hueTorgb(p, q, h + 1 / 3);
        g = hueTorgb(p, q, h);
        b = hueTorgb(p, q, h - 1 / 3);
    }
    return [r * intensidad, g * intensidad, b * intensidad];
}