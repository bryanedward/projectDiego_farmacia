firebase.initializeApp({
    apiKey: "AIzaSyDLonQHnWKnOBS9_HMgdkaLuCCbVtYpVRI",
    authDomain: "base-de-datos-de-farmacia.firebaseapp.com",
    projectId: "base-de-datos-de-farmacia",
    storageBucket: "base-de-datos-de-farmacia.appspot.com",
    messagingSenderId: "709757137418",
    appId: "1:709757137418:web:805be84006c40df651e5f3"
})
var database = firebase.database();

var popupCloseBtn = document.getElementById("close-popup");
var farmdPopup = document.getElementById("meal-info");
var prodPopup = document.getElementById("meal-popup");
var btnSalir = document.getElementById('close-popup')

obtenerDoctores()
async function obtenerDoctores() {
    //consultar todos los doctores
    let data = []
    database.ref('doctores').once('value').then(datos => {
        datos.forEach(element => {
            data.push(element)
        })
        doctor(data)
    })
}

function doctor(data) {
    data.forEach(element => {
        mostrarDoctor(element)
    });
}

function mostrarDoctor(params) {
    //diseño las tarjeta de los doctores
    var farmacias = document.getElementById('farmacias')
    var tarjeta = document.createElement('div')
    tarjeta.innerHTML = `
    <div class="doctor">
    <img src=${params.val().foto}> 
    <p>Nombre : ${params.val().nombre} </p>
    <p>Dirreción : ${params.val().dirreccion}</p>
    <p>Telefono : ${params.val().telefono}</p>
    <button class="reservarCita" id="reservarCita">Reservar cita </button>
    </div>
    `
    const reservaCita = tarjeta.querySelector('.reservarCita')
    reservaCita.addEventListener('click', () => {
        reservarCita(params)
        prodPopup.classList.remove("hidden")
    })
    farmacias.appendChild(tarjeta)
}

btnSalir.addEventListener('click', () => {
    prodPopup.classList.add("hidden")
})

function reservarCita(params) {
    //mostrar formulario para la reserva
    farmdPopup.innerHTML = ""
    var info = document.createElement('div')
    info.innerHTML = ` <div class="FarmInfo"> 
    <h1>${params.val().nombre}</h1>
    <p>Nombre: ${params.val().nombre} </p>
    <p>Dirreción : ${params.val().dirreccion}</p>
    <p>Telefono : ${params.val().telefono}</p>
        <div class=formulario>
            <h4>Reservar Cita</h4>
            <input class="dato" type="text" placeholder="nombre">
            <input class="dato" type="text" placeholder="celular">
            <div class="formulario_btn">
            <input type="date" 
            id="start" name="trip-start"
            value=""
            min="2021-01-01" max="2021-12-31">
            <input type="time" name="hora" min="08:00" 
            max="17:00"  />
            <button id="btn">SolicitarTurno</button>
            </div>
       
        </div>
    </div>`
    farmdPopup.appendChild(info)

}