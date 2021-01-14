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
    database.ref('citas').once('value').then(datosF => {
        datosF.forEach(element => {
            if (element.val().cedula === datos.cedula) {
                data.push(element)
            }
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
    var farmacia = []

    params.val().farmacia.forEach(element => {
        farmacia.push(element)
    });

    if (params.val().validar === true) {
        divCita.innerHTML = `
        <div class="container_aprobado">
            <div class="details_aprobado">
                <p class="titl_aprobado">nombre de la Farmacia</p>
                <p>${farmacia[0].nombre}</p>
            </div>
            <div class="details_aprobado">
                <p class="titl_aprobado">Dirección de la Farmacia</p>
                <p>${farmacia[0].dirreccion}</p>
            </div>
            <div class="details_aprobado">
                <p class="titl_aprobado">telefono de la Farmacia</p>
                <p>${farmacia[0].telefono}</p>
            </div> 
            <div class="details_aprobado">
                <p class="titl_aprobado">Su cita sera </p>
                <p>${params.val().dia} A LAS "${params.val().hora}"</p>
            </div>
            <p>Aprobado</p>
        </div>`

        cita.appendChild(divCita)
    } else {
        divCitaE.innerHTML = `
        <div class="container_aprobadoE">
            <div class="details_aprobadoR">
                <p class="titl_aprobadoR">nombre de la Farmacia</p>
                <p>${farmacia[0].nombre}</p>
            </div>
            <div class="details_aprobadoR">
                <p class="titl_aprobadoR">Dirección de la Farmacia</p>
                <p>${farmacia[0].dirreccion}</p>
            </div>
            <div class="details_aprobadoR">
                <p class="titl_aprobadoR">telefono de la Farmacia</p>
                <p>${farmacia[0].telefono}</p>
            </div> 
            <p>En Espera</p>
        </div>`
        citaE.appendChild(divCitaE)
    }


}