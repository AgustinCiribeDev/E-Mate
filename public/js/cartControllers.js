/* PONER COSAS EN EL CARRITO */
function getCart() {
    let carrito = [];

    try {
        carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    } catch (e) {
        console.log(e);
    }

    return carrito;
}

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
/* SACAR COSAS DEL CARRITO */
function updateCart(carrito) {
    // Aquí deberías almacenar el carrito en tu base de datos o en otro sistema de almacenamiento adecuado
    // En este ejemplo, se asume que se guarda en el almacenamiento local del navegador
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(carrito)
}
function removeFromCart (id) {
    let carrito = getCart();
    // Filtra los productos que no coincidan con el id a eliminar
    carrito = carrito.filter(item => item.id !== id);
    updateCart(carrito);
};

function showAddedToCartMessage() {
    const messageDiv = document.getElementById('addedToCartMessage');
    const mensaje = "Artículo agregado al carrito"; // Aquí defines tu mensaje
    // messageDiv.innerText = Agregado; // Establece el texto del mensaje

    messageDiv.style.display = 'block';

    setTimeout(function() {
        messageDiv.style.display = 'none';
    }, 2000); 
};