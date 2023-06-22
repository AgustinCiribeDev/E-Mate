const express = require ('express');
const path = require ('path');
const app = express ();
const port = process.env.PORT || 3002;

app.set("view engine", "ejs");

app.set('views',__dirname + '/views')

app.use('/css', express.static(path.resolve (__dirname, "node_modules/bootstrap/dist/css")))

app.use('/js', express.static(path.resolve (__dirname, "node_modules/bootstrap/dist/js")))

app.use('/icons', express.static(path.resolve (__dirname, "node_modules/bootstrap-icons/font")))

app.use (express.static (path.resolve (__dirname, './public')));

app.get('/',(req, res) => { 
    res.render('index')
    
});

app.get ('/header', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/header'));
});

app.get ('/footer', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/footer'));
});

app.get ('/register', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/register.html'));
});

app.get ('/login', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/login.html'));
});

app.get ('/producto', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/productDetail.html'));
});

app.get ('/carrito', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/productCart.html'));
});


app.listen (port, function () {
    console.log ("Servidor corriendo en puerto " + port);
});




