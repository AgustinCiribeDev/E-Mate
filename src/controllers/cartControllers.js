const fs = require('fs');
const path = require('path'); // ver si hace falta, pero al final
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { log } = require('console');
const db = require('../database/models'); // Base de Datos


const cartControllers = {
    cart: (req, res) => {
        res.render('products/productCart');
    },

    addToCart: (req, res) => {
        const { cantidad, id, nombre, imagen, precio } = req.body; // Asumiendo que los datos vienen en el cuerpo de la solicitud

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
        res.redirect('/products/cart'); // Redirige a la página del carrito
    },

    removeFromCart: (req, res) => {
        const id = req.params.id; // Asumiendo que el ID del producto a eliminar se pasa como parámetro en la URL
        let carrito = getCart();
        // Filtra los productos que no coincidan con el id a eliminar
        carrito = carrito.filter(item => item.id !== id);
        updateCart(carrito);
        res.redirect('/products/cart'); // Redirige a la página del carrito después de eliminar un producto
    }
};

function updateCart(carrito) {
    // Aquí deberías almacenar el carrito en tu base de datos o en otro sistema de almacenamiento adecuado
    // En este ejemplo, se asume que se guarda en el almacenamiento local del navegador
    localStorage.setItem("carrito", JSON.stringify(carrito));
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

// En este ejemplo, asumo que estás utilizando Express.js y que has configurado las rutas adecuadamente para las funciones addToCart y removeFromCart.


/* const cartControllers = {
    cart: (req, res) => {
        res.render('products/productCart');
        },

       addToCart : (req, res) => {(cantidad, id, nombre, imagen, precio) {
        let carrito = getCart();
        let productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        // Si el producto ya existe, actualiza la cantidad
        productoExistente.cantidad += cantidad;
    } else {
        // Si el producto no existe, agrégalo al carrito
        carrito.push({
            id: id,
            nombre: nombre,
            imagen: imagen,
            cantidad: cantidad,
            precio: precio
        });
    }
},
    updateCart(carrito);}

function removeFromCart(id) {
    let carrito = getCart();
    // Filtra los productos que no coincidan con el id a eliminar
    carrito = carrito.filter(item => item.id !== id);
    updateCart(carrito);
}

function updateCart(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function getCart() {
    let carrito = [];

    try {
        carrito = JSON.parse(localStorage.getItem("carrito"));
    } catch (e) {
        console.log(e);
    }

    if (!carrito) carrito = [];

    console.log(carrito);

    return carrito;
}

function agregarAlCarrito() {
    // Llama a la función AddtoCart para agregar el producto al carrito
    addToCart();

    // Redirige a la ruta deseada
    window.location.href = '/products/cart';
}
*/
module.exports = cartControllers;  