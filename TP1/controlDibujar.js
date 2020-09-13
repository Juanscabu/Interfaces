let dibujar = false;

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