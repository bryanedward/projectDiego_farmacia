firebase.initializeApp({
    apiKey: "AIzaSyDLonQHnWKnOBS9_HMgdkaLuCCbVtYpVRI",
    authDomain: "base-de-datos-de-farmacia.firebaseapp.com",
    projectId: "base-de-datos-de-farmacia",
    storageBucket: "base-de-datos-de-farmacia.appspot.com",
    messagingSenderId: "709757137418",
    appId: "1:709757137418:web:805be84006c40df651e5f3"
})
var database = firebase.database();

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

    console.log(params.val().validar);

    if (params.val().validar === true) {
        divCita.innerHTML = `
        <div class="container_aprobado"> 
            <p>${params.val().nombre}</p>
            <p>${params.val().dirreccion}</p>
        </div>`

        cita.appendChild(divCita)
    } else {
        divCitaE.innerHTML = `
        <div class="container_aprobadoE"> 
            <p>${params.val().nombre}</p>
            <p>${params.val().dirreccion}</p>
        </div>`
        citaE.appendChild(divCitaE)
    }


}