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
var acceder = document.getElementById('acceder')
var nombre = document.getElementById('nombre')
var pass = document.getElementById('pass')
var ruta = window.location;
var ri = ruta.href.split("index.html")

acceso.addEventListener('click', () => {
    pop_login.classList.remove("hidden")
})

close_popup.addEventListener('click', () => {
    pop_login.classList.add("hidden")
})

acceder.addEventListener('click', () => {
    //acceso de sistema
    database.ref(`usuarios/${nombre.value}`).once('value', (datos) => {
        if (datos.val().rol === 'admin') {
            location.href = `${ri[0]}pag_admin/administrador.html`;
        } else {
            location.href = `${ri[0]}pag_usuario/user.html`;
        }
    }).catch(err => {
        console.log(err);
    })






})


