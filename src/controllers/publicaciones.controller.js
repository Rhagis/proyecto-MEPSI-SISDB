const { añadirPubicacionABD, obtenerPublicaciones, borrarPublicacionABD, obtenerPublicacionPorId } = require('../models/publicaciones.models');

const añadirPublicacion = async (req, res) => {
    try {
        const { titulo, contenido } = req.body;
        const user = req.usuario.id
        await añadirPubicacionABD(titulo, contenido, user);
        res.status(201).json({ message: 'Publicación añadida correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al añadir la publicación' });
    }
};

const mostrarPublicaciones = async (req, res) => {
    try {
        const publicaciones = await obtenerPublicaciones();
        res.status(200).json(publicaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las publicaciones' });
    }
};

const eliminarPublicacion = async (req, res) => {
    try {
        const user = req.usuario.id;
        const {id} = req.params
        const post = await obtenerPublicacionPorId(id)
        if (user !== post.autor_id){
            return res.status(401).json({message: 'No tienes permiso para borrar la publicacion'});
        }
        await borrarPublicacionABD(id);
        res.status(200).json({ message: 'Publicación eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la publicación' });
    }
};

module.exports = {
    añadirPublicacion,
    mostrarPublicaciones,
    eliminarPublicacion
};