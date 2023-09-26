window.addEventListener("load", function(){

let formLogin = document.querySelector('form');

formLogin.addEventListener('submit', function (evento){
    let errores = [];
    let ulErrores = document.querySelector('div.errores ul');
    ulErrores.innerHTML = '';
    
    let campoEmail  = evento.target['email'].value;
    let campoPassword = document.querySelector('#password');

    if(campoEmail == ""){
        errores.push('El campo Email está vacío');
    }
    if(!validarEmail(campoEmail)){
        errores.push('Escribe un formato valido de email "ejemplo@gmail.com"')
    }
    if(campoPassword.value == ""){
        errores.push('No escribiste tu contraseña');
    }
    function validarEmail(campoEmail) {
        var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(campoEmail);
      }

    if(errores.length > 0){
        evento.preventDefault();
       for(let i =0; i< errores.length; i++){
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
        }
    }

})

})