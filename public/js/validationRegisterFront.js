window.addEventListener('load', function(){

    let formRegister = document.querySelector('form');

    formRegister.addEventListener('submit', function (evento){
        let errores = [];
        let ulErrores = document.querySelector('div.errores ul');
        ulErrores.innerHTML = '';

        let validationName = evento.target['name'].value;
        let validationRol = evento.target['rol'].value;
        let validationLocal = evento.target['local_id'].value;
        let validationEmail = evento.target['email'].value;
        let validationPassword = evento.target['password'].value;
        let validationAvatar = evento.target['avatar'].value;
   
        if (validationName == ""){
            errores.push('Escribe tu nombre y apellido')
        }
        if (validationName.length <= 5){
            errores.push('Tu nombre y apellido no puede tener menos de 4 caracteres')
        }
        if (validationRol == ""){
            errores.push('Selecciona el Rol de tu empleado')
        }
        if (validationLocal == ""){
            errores.push('Escribe el local al cual pertenece tu empleado')
        }
        if (validationEmail == ""){
            errores.push('Escribe el email de tu empleado')
        }
        if (!validarEmail(validationEmail)){
            errores.push('Escribe un formato valido de email "ejemplo@gmail.com"')
        }
        if (validationPassword == ""){
            errores.push('Este campo no puede estar vacío')
        }
        if (validationAvatar == ""){
            errores.push('Agrega una foto de perfil de tu empleado')
        }

        function validarEmail(validationEmail) {
            var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return regex.test(validationEmail);
          }

        if (errores.length > 0){
            evento.preventDefault();
            

            for(let i =0; i< errores.length; i++){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
        }
    })




})