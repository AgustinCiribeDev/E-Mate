window.addEventListener('load', function(){

    let formRegister = document.querySelector('.editar');

    formRegister.addEventListener('submit', function (evento){
         
        let errores = [];
        let ulErrores = document.querySelector('div.errores ul');
        ulErrores.innerHTML = '';

        let validationName = evento.target['name'].value;
        let validationRol = evento.target['rol'].value;
        let validationLocal = evento.target['local_id'].value;
        let validationEmail = evento.target['email'].value;
        let validationPassword = evento.target['password'].value;
   
        if (validationName == ""){
            errores.push('Escribe tu nombre y apellido')
        }
        if (validationName.length <= 2){
            errores.push('Tu nombre y apellido no puede tener menos de 2 caractéres')
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
        if (validationPassword == ""){
            errores.push('Agrega una contraseña valida')
        }

        if (errores.length > 0){
            evento.preventDefault();
            for(let i =0; i< errores.length; i++){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
        }
    })
});