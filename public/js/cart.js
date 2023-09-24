
function getCart() {
    let carrito = [];

    try {
        carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    } catch (e) {
        console.log(e);
    }

    return carrito;
}

function addToCart(cantidad, id, nombre, imagen, precio) {
    let carrito = getCart();
    let productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad += parseInt(cantidad);
    } else {
        carrito.push({
            id: id,
            nombre: nombre,
            imagen: imagen,
            cantidad: parseInt(cantidad),
            precio: parseFloat(precio)
        });
    }

    updateCart(carrito); console.log(carrito);
}

function removeFromCart(id) {
    alert('Eliminado del tu carrito!');
    let carrito = getCart();
    carrito = carrito.filter(item => item.id !== id);
    updateCart(carrito);
}

function updateCart(carrito) {

    localStorage.setItem("carrito", JSON.stringify(carrito));
    let carritoContainer = document.getElementById('carritoDeCompras');
    carritoContainer.innerHTML = ''; 

    carrito.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td class="table__Productos">
                <h6 class="title">${item.nombre}</h6>
            </td>
            <td class="table__Precio"><p>$ ${item.precio.toFixed(2)}</p></td>
            <td class="table__Cantidad">
                <input type="number" min="1" value="${item.cantidad}">
                <button class="delete btn btn-danger" onclick="removeFromCart('${item.id}')">x</button>
            </td>
        `;
        carritoContainer.appendChild(row);
    });

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const totalElement = document.querySelector('.ItemCartTotal');
    totalElement.textContent = `Total: $ ${total.toFixed(2)}`;
}

function showAddedToCartMessage() {
    const messageDiv = document.getElementById('addedToCartMessage');
    const mensaje = "Artículo agregado al carrito"; // Aquí defines tu mensaje
    // messageDiv.innerText = Agregado; // Establece el texto del mensaje

    messageDiv.style.display = 'block';

    setTimeout(function() {
        messageDiv.style.display = 'none';
    }, 2000); 
};

const carritoDeCompras = getCart();
updateCart(carritoDeCompras);


