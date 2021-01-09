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

    let data = []
    await database.ref('citas').once('value').then(datos => {
        datos.forEach(element => {
            data.push(element)
        })
        cita(data)
    })
}

function cita(data) {
    data.forEach(element => {
        mostrarCitas(element)
    });
}

function mostrarCitas(element) {
    var citas = document.getElementById('citas')
    var tarjet = document.createElement('div')
    tarjet.innerHTML = `
    <div class="cita"> 
        <div class="detail_cita">
            <h4>Nombre: ${element.val().nombre}</h4> 
            <p>Dirrección: ${element.val().dirreccion}</p>
        </div>
        <div class="detail_opcion">
            <button class="aceptar" id="aceptar">ACEPTAR</button>
            <button class="rechazar" id="rechazar">RECHAZAR</button>
        </div>
    </div>`

    citas.appendChild(tarjet)
}