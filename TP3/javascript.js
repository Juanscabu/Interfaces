let pagina = document.querySelector(".pagina");
let parallax = document.querySelector(".parallax");
setInterval(function(){
  console.log("entro");
  pagina.classList.remove("hidden");
  parallax.classList.add("hidden");
}, 3000);




let sub =  document.querySelector(".subZeroMove");
let scor =  document.querySelector(".scorpionMove");
    window.addEventListener("scroll", function(){
        if (document.documentElement.scrollTop > 1300 && document.documentElement.scrollTop< 1694) {
            scor.classList.remove("hidden");
            sub.style.left = window.pageYOffset - 1700 +"px";
            scor.style.left = -window.pageYOffset + 2550 +"px";
        } 
    });


let acordeon = document.getElementsByClassName("acordeon");
let i;

for (i = 0; i < acordeon.length; i++) {
  acordeon[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}






