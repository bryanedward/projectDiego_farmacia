firebase.initializeApp({
    apiKey: "AIzaSyDLonQHnWKnOBS9_HMgdkaLuCCbVtYpVRI",
    authDomain: "base-de-datos-de-farmacia.firebaseapp.com",
    projectId: "base-de-datos-de-farmacia",
    storageBucket: "base-de-datos-de-farmacia.appspot.com",
    messagingSenderId: "709757137418",
    appId: "1:709757137418:web:805be84006c40df651e5f3"
})
var database = firebase.database();
var acceso = document.getElementById('acceso')
var pop_login = document.getElementById('meal-popup')
var close_popup = document.getElementById('close-popup')
var registro = document.getElementById('registro')
var registrocontainer = document.getElementById('registrocontainer')
var acceso = document.getElementById('acceso')
var accesocontainer = document.getElementById('accesocontainer')
var acceder = document.getElementById('acceder')
var regresar_login = document.getElementById('regresar_login')
var nombre = document.getElementById('nombre')
var pass = document.getElementById('pass')
var registrar = document.getElementById('registrar')


var ruta = window.location;
var ri = ruta.href.split("index.html")

acceso.addEventListener('click', () => {
    pop_login.classList.remove("hidden")
})

close_popup.addEventListener('click', () => {
    pop_login.classList.add("hidden")
})


registro.addEventListener('click', () => {
    accesocontainer.classList.add('hidden')
    registrocontainer.classList.remove("hidden")
})

regresar_login.addEventListener('click', () => {
    accesocontainer.classList.remove('hidden')
    registrocontainer.classList.add('hidden')
})

localStorage.clear();

acceder.addEventListener('click', () => {

    //acceso de sistema
    database.ref(`usuarios/${nombre.value}`).once('value', (datos) => {

        var dat = new Object()
        dat.cedula = datos.key
        dat.nombre = datos.val().nombre
        dat.rol = datos.val().rol
        dat.direccion = datos.val().dirreccion
        localStorage.setItem("usuario", JSON.stringify(dat))

        if (dat.rol === undefined) {

        } else {
            if (datos.val().rol === 'admin') {
                location.href = `${ri[0]}pag_admin/administrador.html`;
            } else {
                location.href = `${ri[0]}pag_usuario/user.html`;
            }


        }


    }).catch(err => {
        alert('sin acceso')
    })
})

registrar.addEventListener('click', () => {
    var cedulaR = document.getElementById('cedulaR')
    var nombreR = document.getElementById('nombreR')
    var dirreccionR = document.getElementById('direccionR')

    database.ref(`usuarios/${cedulaR.value}`).set({
        nombre: nombreR.value,
        cedula: cedulaR.value,
        dirreccion: dirreccionR.value,
        rol: "cliente"
    })
    nombreR.value = ""
    cedulaR.value = ""
    dirreccionR.value = ""
    alert('registrado')
})
