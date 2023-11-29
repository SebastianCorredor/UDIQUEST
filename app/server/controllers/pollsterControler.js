const { pollster, survey } = require('../models');
const jwt = require('jsonwebtoken');

async function getAllPollsters(req, res) {
    try {
        const encuestadores = await pollster.findAll({
            attributes: ['id', 'cedula', 'nombre', 'apellido', 'correo', 'sede']
        });
        res.json(encuestadores);
    } catch (error) {
        console.error('Error al obtener los encuestadores:', error);
        res.status(500).send('Error al obtener los encuestadores');
    }
}

async function getPollsterById(req, res) {
    const { id } = req.params;
    try {
        const pollsterData = await pollster.findByPk(id);
        if (!pollsterData) {
            return res.status(404).send('Encuestador no encontrado');
        }
        res.json(pollsterData);
    } catch (error) {
        console.error('Error al obtener el encuestador por ID:', error);
        res.status(500).send('Error al obtener el encuestador por ID');
    }
}

async function createPollster(req, res) {
    const { cedula, nombre, apellido, correo, contraseña, sede } = req.body;
    try {
        const newPollster = await pollster.create({ cedula, nombre, apellido, correo, contraseña, sede });
        res.status(201).json(newPollster);
    } catch (error) {
        console.error('Error al crear el encuestador:', error);
        res.status(500).send('Error al crear el encuestador');
    }
}

async function updatePollsterById(req, res) {
    const { id } = req.params;
    const newData = req.body;
    try {
        const [updatedRows] = await pollster.update(newData, {
            where: { id },
        });
        if (updatedRows === 0) {
            return res.status(404).send('Encuestador no encontrado');
        }
        res.json({ message: 'Encuestador actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el encuestador:', error);
        res.status(500).send('Error al actualizar el encuestador');
    }
}

async function deletePollsterById(req, res) {
    const { id } = req.params;
    try {
        const deletedRows = await pollster.destroy({
            where: { id },
        });
        if (deletedRows === 0) {
            return res.status(404).send('Encuestador no encontrado');
        }
        res.json({ message: 'Encuestador eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el encuestador:', error);
        res.status(500).send('Error al eliminar el encuestador');
    }
}

async function loginPollster(req, res) {
    const { correo, contraseña } = req.body;

    try {
        const foundPollster = await pollster.findOne({
            attributes: ['id', 'cedula', 'nombre', 'apellido', 'correo', 'sede', 'contraseña'],
            where: {
                correo,
                contraseña
            }
        });

        if (foundPollster) {
            const token = jwt.sign({ correo }, "Stack", {
                expiresIn: '2m'
            });
            console.log('Encuestador encontrado');
            res.json({ token });
        } else {
            console.log('No se encontró ningún encuestador con las credenciales proporcionadas.');
            res.status(404).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error al buscar encuestador por correo y contraseña:', error);
        res.status(500).send('Error al buscar encuestador');
    }
}

const obtenerEncuestasAsignadas = async (req, res) => {
    const { pollsterId } = req.params;

    try {
        const pollsterData = await pollster.findByPk(pollsterId, {
            include: [{ model: survey }],
        });

        if (!pollsterData) {
            return res.status(404).json({ error: 'Encuestador no encontrado' });
        }

        const encuestasAsignadas = pollsterData.surveys;

        res.status(200).json(encuestasAsignadas);
    } catch (error) {
        console.error('Error al obtener encuestas asignadas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllPollsters,
    getPollsterById,
    createPollster,
    updatePollsterById,
    deletePollsterById,
    loginPollster,
    obtenerEncuestasAsignadas
};