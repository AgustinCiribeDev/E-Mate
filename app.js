const express = require ('express');
const path = require ('path');
const app = express ();
const mainRoutes =  require ('./src/routes/mainRoutes')
const port = process.env.PORT || 3002;

app.use('/css', express.static(path.resolve (__dirname, "node_modules/bootstrap/dist/css"))); 

app.use('/js', express.static(path.resolve (__dirname, "node_modules/bootstrap/dist/js"))); 

app.use('/icons', express.static(path.resolve (__dirname, "node_modules/bootstrap-icons/font"))); 

app.use (express.static (path.resolve (__dirname, './public')));

app.set("view engine", "ejs");

app.use('/', mainRoutes);

app.use('*', function(req, res) {
    res.send("Error de acceso, esta ruta no existe en el sitio")
});

app.listen (port, function () {
    console.log ("Servidor corriendo en puerto " + port);
});