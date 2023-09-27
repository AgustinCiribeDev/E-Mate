window.addEventListener('load', function(){

    let formCreateProducts = document.querySelector('form');

    formCreateProducts.addEventListener('submit', function (evento){
        let errores = [];
        let ulErrores = document.querySelector('div.errores ul');
        ulErrores.innerHTML = '';

        let validationNombre = evento.target['nombre'].value;
        let validationCategoria = evento.target['categoria'].value;
        let validationEstado = evento.target['estado'].value;
        let validationDescripcion = evento.target['descripcion'].value;
        let validationPrecio = evento.target['precio'].value;
        let validationStock = evento.target['stock'].value;
        let validationImagen = evento.target['imagen'].value;
   
        if (validationNombre == ""){
            errores.push('Escribe nombre del producto')
        }
        if (validationCategoria == ""){
            errores.push('Selecciona la categoría del producto')
        }
        if (validationEstado == ""){
            errores.push('Selecciona si el producto esta en oferta')
        }
        if (validationDescripcion == ""){
            errores.push('Escribe la descripción del producto')
        }
        if (validationDescripcion.length <= 10){
            errores.push('La descripción del producto no puede tener menos de 10 caracteres')
        }
        if (validationPrecio == ""){
            errores.push('Escribe el precio del producto')
        }
        if (validationStock == ""){
            errores.push('Escribe el stock del producto')
        }
        if (validationImagen == ""){
            errores.push('Agrega una foto del producto')
        }

        if (errores.length > 0){
            evento.preventDefault();
            

            for(let i =0; i< errores.length; i++){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
        }
    })
})