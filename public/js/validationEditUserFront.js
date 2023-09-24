window.addEventListener('load', function(){

    let formRegister = document.querySelector('form');

    formRegister.addEventListener('submit', function (evento){
        let errores = [];

        let validationName = document.querySelector('#name');
        let validationRol = document.querySelector('#rol');
        let validationLocal = document.querySelector('#local_id');
        let validationEmail = document.querySelector('#email');
        let validationPassword = document.querySelector('#password');
        let validationAvatar = document.querySelector('#avatar');
   
        if (validationName.value == ""){
            errores.push('Escribe tu nombre y apellido')
        }
        if (validationName.value.length <= 5){
            errores.push('Tu nombre y apellido no puede tener menos de 4 caracteres')
        }
        if (validationRol.value == ""){
            errores.push('Selecciona el Rol de tu empleado')
        }
        if (validationLocal.value == ""){
            errores.push('Escribe el local al cual pertenece tu empleado')
        }
        if (validationEmail.value == ""){
            errores.push('Escribe el email de tu empleado')
        }
        if (validationPassword.value == ""){
            errores.push('Este campo no puede estar vacío')
        }
        if (validationAvatar.value == ""){
            errores.push('Agrega una foto de perfil de tu empleado')
        }

        if (errores.length > 0){
            evento.preventDefault();
            let ulErrores = document.querySelector('div.errores ul');

            for(let i =0; i< errores.length; i++){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
        }
    })




})