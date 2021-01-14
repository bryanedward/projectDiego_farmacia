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

var datos = JSON.parse(localStorage.getItem("usuario"));
var ruta = window.location;
var ri = ruta.href.split("pag_doctor")
var salir = document.getElementById('salir')

if (datos === null) {
    //valida la existencia de datos en el localstorage
    location.href = `${ri[0]}index.html`;
}

salir.addEventListener('click', () => {
    //redirecciona a la pagina principal
    location.href = `${ri[0]}index.html`;
})



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
    <p>Dirección : ${params.val().dirreccion}</p>
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
    <p>Direción : ${params.val().dirreccion}</p>
    <p>Telefono : ${params.val().telefono}</p>
        <div class=formulario>
            <h4>Reservar Cita</h4>
            <input class="dato" 
            id="nombre" type="text" 
            placeholder="${datos.nombre}" required disabled>
            <input class="dato2" 
            id="celular" 
            type="text" placeholder="celular" required>
            <div class="formulario_btn">
            <input type="date"
            class="date" 
            id="start" name="trip-start"
            value=""
            min="2021-01-01" max="2021-12-31" required>
            <input type="time" 
                class="time"
                id="time" name="hora" min="08:00" 
            max="17:00"  required/>
            <button id="btn" class="btn">SolicitarTurno</button>
            </div>
        </div>
    </div>`;



    farmdPopup.appendChild(info)

    var nombres = info.querySelector('.dato')
    var celulars = info.querySelector('.dato2')
    var btnENviars = info.querySelector('.btn')
    var times = info.querySelector('.time')
    var dates = info.querySelector('.date')

    var cantidad = []

    btnENviars.addEventListener('click', () => {
        database.ref('citas').once('value').then(datos => {
            //colocer la cantida de  ususarios que solocitan 
            //el serivicio
            datos.forEach(element => {
                cantidad.push(element)
            })
        }).then(() => {
            database.ref(`citas/${cantidad.length + 1}`).set({
                cedula: datos.cedula,
                nombre: nombres.placeholder,
                dirreccion: datos.direccion,
                hora: times.value,
                dia: dates.value,
                celular: celulars.value,
                validar: false,
                farmacia: [{
                    nombre: params.val().nombre,
                    dirreccion: params.val().dirreccion,
                    telefono: params.val().telefono
                }]
            })
            nombres.value = ""
            celulars.value = ""
            times.value = ""
            dates.value = ""
            console.log('enviado');
        })
    })

}