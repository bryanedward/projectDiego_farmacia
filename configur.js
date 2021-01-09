var acceso = document.getElementById('acceso')
var pop_login = document.getElementById('meal-popup')
var close_popup = document.getElementById('close-popup')
var acceder = document.getElementById('acceder')
acceso.addEventListener('click', () => {
    pop_login.classList.remove("hidden")
})


close_popup.addEventListener('click', () => {
    pop_login.classList.add("hidden")
})

acceder.addEventListener('click', () => {
    //redireccionamiento
    var ruta = window.location;
    var ri = ruta.href.split("index.html")
    location.href = `${ri[0]}pag_admin/administrador.html`;
})