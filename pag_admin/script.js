firebase.initializeApp({
    apiKey: "AIzaSyDLonQHnWKnOBS9_HMgdkaLuCCbVtYpVRI",
    authDomain: "base-de-datos-de-farmacia.firebaseapp.com",
    projectId: "base-de-datos-de-farmacia",
    storageBucket: "base-de-datos-de-farmacia.appspot.com",
    messagingSenderId: "709757137418",
    appId: "1:709757137418:web:805be84006c40df651e5f3"
})
var database = firebase.database();
var tarjet = document.createElement('div')
var citas = document.getElementById('citas')

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
    var farmcia = []

    element.val().farmacia.forEach(element => {
        farmcia.push(element)
    });

    tarjet.innerHTML = `
    <div class="cita"> 
        <div class="detail_cita">
            <h4>Datos Personades de ${element.val().nombre}</h4> 
            <p>Dirrección: ${element.val().dirreccion}</p>
            <p>Celular: ${element.val().celular}</p>
            <p>Dia de la cita: ${element.val().dia}</p>
            <p>Hora de la cita: ${element.val().hora}</p>
            <div class="info_farmacia">
                <div class="detail_farmacia">
                    <small class="titulo">nombre farmacia:</small>
                    <small class="ssubtitulo">${farmcia[0].nombre}</small>                
                </div>
                <div class="detail_farmacia">
                    <small class="titulo">telefono :</small>
                    <small class="ssubtitulo">${farmcia[0].telefono}</small>                
                </div>
                <div class="detail_farmacia">
                    <small class="titulo">dirreccion :</small>
                    <small class="ssubtitulo">${farmcia[0].dirreccion}</small>                
                </div>    
            </div>
        </div >
    <div class="detail_opcion">
        <button class="aceptar" id="aceptar">ACEPTAR</button>
        <button class="rechazar" id="rechazar">RECHAZAR</button>
    </div>
    </div > `

    citas.appendChild(tarjet)

    var btnAceptar = tarjet.querySelector('.aceptar')
    var rechazar = tarjet.querySelector('.rechazar')

    btnAceptar.addEventListener('click', () => {
        valida = true
        validarCitas(element, farmcia, valida)
    })
    rechazar.addEventListener('click', () => {
        valida = false
        validarCitas(element, farmcia, valida)
    })
}

function validarCitas(params, farmcia, valida) {
    //validarcitas medicas
    database.ref(`citas/${params.key}`).set({
        cedula: params.val().cedula,
        celular: params.val().celular,
        dia: params.val().dia,
        dirreccion: params.val().dirreccion,
        farmacia: [{
            nombre: farmcia[0].nombre,
            telefono: farmcia[0].telefono,
            dirreccion: farmcia[0].dirreccion
        }],
        hora: params.val().hora,
        nombre: params.val().nombre,
        validar: valida
    })
    citas.innerHTML = " "
    obtenerCitas()
}