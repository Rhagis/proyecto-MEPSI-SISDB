const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarios.models');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const registrar = async (req, res) => {
    try{ 
        const { usuario, email, password } = req.body;
        if (!password || !usuario || !email) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }
        console.log('Received request to register user:', { usuario, email });

        const saltRounds = 10;
        const passwordHasheada = await bcrypt.hash(password, saltRounds);

        await usuarioModel.crearUsuario(usuario, email, passwordHasheada);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }

};

const login = async (req, res) => {
    try {
        const { usuario, password } = req.body;
        
        const usuarioEncontrado = await usuarioModel.obtenerUsuarioPorNombre(usuario);
        if (!usuarioEncontrado) {
            return res.status(404).json({ message: 'Credenciales incorrectas' });
        }
        const passwordValida = await bcrypt.compare(password, usuarioEncontrado.contrasena);
        if (!passwordValida) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const token = jwt.sign(
            { id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

const obtenerUsuarioPorToken = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const usuarioEncontrado = await usuarioModel.obtenerUsuarioPorId(usuarioId);
        if (!usuarioEncontrado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ usuario: usuarioEncontrado });
    } catch (error) {
        console.error('Error al obtener usuario por token:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const usuarioEliminado = await usuarioModel.eliminarUsuario(usuarioId);
        if (!usuarioEliminado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente', usuario: usuarioEliminado });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};

module.exports = {
    registrar,
    login,
    obtenerUsuarioPorToken,
    eliminarUsuario
};