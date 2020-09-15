let dibujar = false;
inputColor = document.querySelector("#inputColores");
inputColor.addEventListener("input", setColor, false);
selectPincel = document.querySelector("#selectPincel");
selectPincel.addEventListener("change", setPincel, false);
btnBorrar = document.querySelector("#btnBorrar");
btnBorrar.addEventListener("click", setBorrar, false);

canvas.addEventListener('mousedown', function(evt) {
  dibujar = true;
  context.beginPath();
}, false);

canvas.addEventListener('mouseup', function(evt) {
  dibujar = false;
}, false);

canvas.addEventListener("mouseout", function(evt) {
  dibujar = false;
}, false);

canvas.addEventListener("mousemove", function(evt) {
  if (dibujar) {
    let m = onMousePos(canvas, evt);
    context.lineTo(m.x, m.y);
    context.stroke();
  }
}, false);

function onMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return {
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}

function setColor (event) {
  context.strokeStyle = event.target.value;
}

function setPincel (event) {
  context.lineWidth = event.target.value;
}

function setBorrar() {
  context.fillStyle = "#E8E8E8";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "#E8E8E8";
}