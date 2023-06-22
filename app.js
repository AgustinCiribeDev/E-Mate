const express = require ('express');
const path = require ('path');
const app = express ();
const port = process.env.PORT || 3002;

app.set("view engine", "ejs");

// app.set('views',__dirname + '/views') // Se comenta código porque es posible que no sea necesario

app.use('/css', express.static(path.resolve (__dirname, "node_modules/bootstrap/dist/css"))); // Este va

app.use('/js', express.static(path.resolve (__dirname, "node_modules/bootstrap/dist/js"))); // Este va

app.use('/icons', express.static(path.resolve (__dirname, "node_modules/bootstrap-icons/font"))); // Este va

app.use (express.static (path.resolve (__dirname, './public'))); // Este va

app.get('/',(req, res) => { 
    res.render('index')
    
}); // Este a routes y controllers

app.get ('/header', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/header'));
}); // Este se va y se incluye con include en la sección que se necesite

app.get ('/footer', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/footer'));
}); // Este se va y se incluye con include en la sección que se necesite

app.get ('/register', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/register.html'));
}); // Este a routes y controllers

app.get ('/login', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/login.html'));
});  // Este a routes y controllers

app.get ('/producto', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/productDetail.html'));
}); // Este a routes y controllers

app.get ('/carrito', (req, res) => {
    res.sendFile (path.resolve (__dirname, './views/productCart.html'));
}); // Este a routes y controllers


app.listen (port, function () {
    console.log ("Servidor corriendo en puerto " + port);
}); // Este va





