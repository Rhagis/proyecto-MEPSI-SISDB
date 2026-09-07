const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios.controller');
const { validarToken, verificarCantidadCaracteresPass } = require('../middlewares/validaciones.middlewares');


router.get('/usuario', validarToken, usuarioController.obtenerUsuarioPorToken);
router.post('/registrar', verificarCantidadCaracteresPass, usuarioController.registrar);
router.post('/login', usuarioController.login);
router.put('/eliminar', validarToken, usuarioController.eliminarUsuario);

module.exports = router;