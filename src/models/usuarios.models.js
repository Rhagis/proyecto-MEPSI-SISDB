const pool = require('../config/db');

const crearUsuario = async (nombre, email, passwordHasheada) => {
    const query = 'INSERT INTO usuarios (usuario, email, contrasena, activo) Values ($1, $2, $3, $4) RETURNING *';
    const values = [nombre, email, passwordHasheada, true];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const obtenerUsuarioPorNombre = async (nombre) => {
    const query = 'SELECT * FROM usuarios WHERE usuario = $1';
    const values = [nombre];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

const obtenerUsuarioPorId = async (id) => {
    const query = 'SELECT usuario, email, activo FROM usuarios WHERE id = $1';
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

const eliminarUsuario = async (id) => {
    const query = "UPDATE usuarios SET activo = false WHERE id = $1 RETURNING *";
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

module.exports = {
    crearUsuario,
    obtenerUsuarioPorNombre,
    obtenerUsuarioPorId,
    eliminarUsuario
};