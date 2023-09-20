

function addToCart (cantidad, id, nombre, imagen, precio )  {
    let carrito = getCart();
    let productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        // Si el producto ya existe, actualiza la cantidad
        productoExistente.cantidad += parseInt(cantidad); // Asegúrate de que la cantidad sea un número
    } else {
        // Si el producto no existe, agrégalo al carrito
        carrito.push({
            id: id,
            nombre: nombre,
            imagen: imagen,
            cantidad: parseInt(cantidad), // Asegúrate de que la cantidad sea un número
            precio: parseFloat(precio) // Asegúrate de que el precio sea un número decimal
        });
    }

    updateCart(carrito);
}


function removeFromCart (id) {
    let carrito = getCart();
    // Filtra los productos que no coincidan con el id a eliminar
    carrito = carrito.filter(item => item.id !== id);
    updateCart(carrito);
}

function updateCart(carrito) {
    // Aquí deberías almacenar el carrito en tu base de datos o en otro sistema de almacenamiento adecuado
    // En este ejemplo, se asume que se guarda en el almacenamiento local del navegador
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(carrito)
}

function getCart() {
    let carrito = [];

    try {
        carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    } catch (e) {
        console.log(e);
    }

    return carrito;
}

// En este ejemplo, asumo que estás utilizando Express.js y que has configurado las rutas adecuadamente para las funciones addToCart y removeFromCart.
