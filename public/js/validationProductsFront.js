window.addEventListener('load', function(){

    let formCreateProducts = document.querySelector('form');

    formCreateProducts.addEventListener('submit', function (evento){
        let errores = [];

        let validationNombre = document.querySelector('#nombre');
        let validationCategoria = document.querySelector('#categoria');
        let validationEstado = document.querySelector('#estado');
        let validationDescripcion = document.querySelector('#descripcion');
        let validationPrecio = document.querySelector('#precio');
        let validationStock = document.querySelector('#stock');
        let validationImagen = document.querySelector('#imagen');
   
        if (validationNombre.value == ""){
            errores.push('Escribe nombre del producto')
        }
        if (validationCategoria.value == ""){
            errores.push('Selecciona la categoría del producto')
        }
        if (validationEstado.value == ""){
            errores.push('Selecciona si el producto esta en oferta')
        }
        if (validationDescripcion.value == ""){
            errores.push('Escribe la descripción del producto')
        }
        if (validationDescripcion.value.length <= 10){
            errores.push('La descripción del producto no puede tener menos de 10 caracteres')
        }
        if (validationPrecio.value == ""){
            errores.push('Escribe el precio del producto')
        }
        if (validationStock.value == ""){
            errores.push('Escribe el stock del producto')
        }
        if (validationImagen.value == ""){
            errores.push('Agrega una foto del producto')
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