let btnEnviar = document.querySelector('.btnEnviar');
btnEnviar.addEventListener("click",mover);

function mover () {
  let creador = document.querySelector('.creador');
  creador.classList.add("movimiento");
  btnEnviar.classList.add("clickeado");
  btnEnviar.innerHTML = "Enviando";
  setTimeout(cambiartexto,2000);
}

function cambiartexto () {
  btnEnviar.innerHTML = "Enviado";
}