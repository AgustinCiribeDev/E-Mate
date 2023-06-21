const express = require ('express');
const path = require ('path');
const app = express ();

app.use('/css', express.static(path.resolve (__dirname, "node_modules/bootstrap/dist/css")))

app.use('/js', express.static(path.resolve (__dirname, "node_modules/bootstrap/dist/js")))

app.use('/icons', express.static(path.resolve (__dirname, "node_modules/bootstrap-icons/font")))

app.use (express.static (path.resolve (__dirname, './public')));

app.get ('/', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/index'));
});

app.get ('/register', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/register'));
});

app.get ('/login', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/login'));
});

app.get ('/producto', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/productDetail'));
});

app.get ('/carrito', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/productCart'));
});

app.get ('/home', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/home'));
});

app.listen (3002, function () {
    console.log ("Servidor corriendo en puerto 3002");
});

app.set("view engine", "ejs");


