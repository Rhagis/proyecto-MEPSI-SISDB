const express = require('express');
const router = express.Router();
const publicacionesController = require('../controllers/publicaciones.controller');
const { validarToken } = require('../middlewares/validaciones.middlewares');

router.post('/add', validarToken, publicacionesController.añadirPublicacion);
router.get('/all', validarToken, publicacionesController.mostrarPublicaciones);
router.delete('/delete/:id', validarToken, publicacionesController.eliminarPublicacion);

module.exports = router;