require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const publicacionesRoutes = require('./src/routes/publicaciones.routes');
require('./src/config/db'); // Import the database connection

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/usuarios', usuariosRoutes);
app.use('/publicaciones', publicacionesRoutes);


app.get('/', (req, res) => {
    console.log('Received request for /');
    res.send('Bienvenido a la API de la biblioteca');

});
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});