firebase.initializeApp({
    apiKey: "AIzaSyDLonQHnWKnOBS9_HMgdkaLuCCbVtYpVRI",
    authDomain: "base-de-datos-de-farmacia.firebaseapp.com",
    projectId: "base-de-datos-de-farmacia",
    storageBucket: "base-de-datos-de-farmacia.appspot.com",
    messagingSenderId: "709757137418",
    appId: "1:709757137418:web:805be84006c40df651e5f3"
})
var database = firebase.database();
var datos = JSON.parse(localStorage.getItem("usuario"));
var ruta = window.location;
var ri = ruta.href.split("pag_usuario")
var salir = document.getElementById('salir')

if (datos === null) {
    //valida la existencia de datos en el localstorage
    location.href = `${ri[0]}index.html`;
}

salir.addEventListener('click', () => {
    //redirecciona a la pagina principal
    location.href = `${ri[0]}index.html`;
})


obtenerCitas()
async function obtenerCitas() {
    //consultar todas las citas
    let data = []
    database.ref('citas').once('value').then(datos => {
        datos.forEach(element => {
            data.push(element)
        })
        cita(data)
    })
}

function cita(params) {
    params.forEach(element => {
        mostrarCita(element)
    });
}

function mostrarCita(params) {
    var cita = document.getElementById('soli_aceptadas')
    var citaE = document.getElementById('soli_rechazadas')
    var divCita = document.createElement('div')
    var divCitaE = document.createElement('div')

    if (params.val().validar === true) {
        divCita.innerHTML = `
        <div class="container_aprobado"> 
            <p>NOMBRE: ${params.val().nombre}</p>
            <p>DIRECCIÓN: ${params.val().dirreccion}</p>
            <small>Aprobado</small>
        </div>`

        cita.appendChild(divCita)
    } else {
        divCitaE.innerHTML = `
        <div class="container_aprobadoE"> 
            <p>NOMBRE: ${params.val().nombre}</p>
            <p>DIRECCIÓN: ${params.val().dirreccion}</p>
            <small>En Espera</small>
        </div>`
        citaE.appendChild(divCitaE)
    }


}