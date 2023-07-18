const express = require ('express');
const path = require ('path');
const app = express ();
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE



app.use('/css', express.static(path.resolve (__dirname, "node_modules/bootstrap/dist/css"))); 

app.use('/js', express.static(path.resolve (__dirname, "node_modules/bootstrap/dist/js"))); 

app.use('/icons', express.static(path.resolve (__dirname, "node_modules/bootstrap-icons/font"))); 

app.use (express.static (path.resolve (__dirname, './public')));

//Configuración Middlewares 

app.use(express.urlencoded({ extended: false })); //para poder usar POST
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

// ************ Template Engine - (don't touch) ************
app.set("view engine", "ejs");


//configuracion rutas

const mainRoutes =  require ('./src/routes/mainRoutes')
const productsRoutes =  require ('./src/routes/productsRoutes')
const usersRoutes =  require ('./src/routes/usersRoutes')

app.use('/', mainRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes); 

app.use('*', function(req, res) {
    res.send("Error de acceso, esta ruta no existe en el sitio")
});

//Puerto Servidor
const port = process.env.PORT || 3002;
app.listen (port, function () {
    console.log ("Servidor corriendo en puerto " + port);
});