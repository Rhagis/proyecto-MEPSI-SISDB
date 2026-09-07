const pool = require('../config/db');

const añadirPubicacionABD = async (titulo, contenido, usuarioId) => {
    const query = 'INSERT INTO publicaciones (titulo, contenido, autor_id) VALUES ($1, $2, $3)';
    const values = [titulo, contenido, usuarioId];
    await pool.query(query, values);
};

const obtenerPublicaciones = async () => {
    const query = 'SELECT titulo, contenido, usuarios.nombre AS autor_nombre FROM publicaciones INNER JOIN usuarios ON publicaciones.autor_id = usuarios.id';
    const { rows } = await pool.query(query);
    return rows;
};

const obtenerPublicacionPorId = async (id) => {
    const query = 'SELECT titulo, contenido, usuarios.nombre AS autor_nombre FROM publicaciones INNER JOIN usuarios ON publicaciones.autor_id = usuarios.id WHERE publicaciones.id = $1';
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const borrarPublicacionABD = async (id) => {
    const query = 'DELETE FROM publicaciones WHERE id = $1';
    const values = [id];
    await pool.query(query, values);
};

module.exports = {
    añadirPubicacionABD,
    obtenerPublicaciones,
    obtenerPublicacionPorId,
    borrarPublicacionABD,
    
};