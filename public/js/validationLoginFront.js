window.addEventListener("load", function(){

let formLogin = document.querySelector('form');

formLogin.addEventListener('submit', function (evento){
    let errores = [];

    let campoEmail = document.querySelector('#email');

    let campoPassword = document.querySelector('#password');

    if(campoEmail.value == ""){
        errores.push('El campo Email está vacío');
    }
    if(campoPassword.value == ""){
        errores.push('No escribiste tu contraseña');
    }

    if(errores.length > 0){
        evento.preventDefault();
        let ulErrores = document.querySelector('div.errores ul');

        for(let i =0; i< errores.length; i++){
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
        }
    }

})

})