const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const validarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || req.headers.token; // Obtener el token del encabezado Authorization
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }
};

const verificarCantidadCaracteresPass = (req, res, next) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Al menos 8 caracteres, al menos una letra y un número
    const { password } = req.body;
    if (!regex.test(password)) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, al menos una letra y un número' });
    }
    next();
};

module.exports = {
    validarToken,
    verificarCantidadCaracteresPass
};