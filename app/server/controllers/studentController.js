const { student, survey } = require('../models');
const jwt = require('jsonwebtoken');

async function getAllStudents(req, res) {
    try {
        const estudiantes = await student.findAll({
            attributes: ['id', 'cedula', 'correo', 'sede', 'programa', 'nombre', 'apellido', 'contraseña']
        });
        res.json(estudiantes);
    } catch (error) {
        console.error('Error al obtener los estudiantes:', error);
        res.status(500).send('Error al obtener los estudiantes');
    }
}

async function getStudentById(req, res) {
    const { id } = req.params;
    try {
        const studentData = await student.findByPk(id);
        if (!studentData) {
            return res.status(404).send('Estudiante no encontrado');
        }
        res.json(studentData);
    } catch (error) {
        console.error('Error al obtener el estudiante por ID:', error);
        res.status(500).send('Error al obtener el estudiante por ID');
    }
}

async function createStudent(req, res) {
    const { cedula, correo, sede, programa, nombre, apellido, contraseña } = req.body;
    try {
        const newStudent = await student.create({ cedula, correo, sede, programa, nombre, apellido, contraseña });
        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Error al crear el estudiante:', error);
        res.status(500).send('Error al crear el estudiante');
    }
}

async function updateStudentById(req, res) {
    const { id } = req.params;
    const newData = req.body;
    try {
        const [updatedRows] = await student.update(newData, {
            where: { id },
        });
        if (updatedRows === 0) {
            return res.status(404).send('Estudiante no encontrado');
        }
        res.json({ message: 'Estudiante actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el estudiante:', error);
        res.status(500).send('Error al actualizar el estudiante');
    }
}

async function deleteStudentById(req, res) {
    const { id } = req.params;
    try {
        const deletedRows = await student.destroy({
            where: { id },
        });
        if (deletedRows === 0) {
            return res.status(404).send('Estudiante no encontrado');
        }
        res.json({ message: 'Estudiante eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el estudiante:', error);
        res.status(500).send('Error al eliminar el estudiante');
    }
}

async function loginStudent(req, res) {
    const { correo, contraseña } = req.body;

    try {
        const foundStudent = await student.findOne({
            attributes: ['id', 'cedula', 'correo', 'sede', 'programa', 'nombre', 'apellido', 'contraseña'],
            where: {
                correo,
                contraseña
            }
        });

        if (foundStudent) {
            const token = jwt.sign({ correo }, "Stack", {
                expiresIn: '2m'
            });
            console.log('Estudiante encontrado');
            res.json({ token });
        } else {
            console.log('No se encontró ningún estudiante con las credenciales proporcionadas.');
            res.status(404).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error al buscar estudiante por correo y contraseña:', error);
        res.status(500).send('Error al buscar estudiante');
    }
}

const obtenerEncuestasAsignadas = async (req, res) => {
    const { studentId } = req.params;

    try {
        const studentData = await student.findByPk(studentId, {
            include: [{ model: survey }],
        });

        if (!studentData) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        const encuestasAsignadas = studentData.surveys;

        res.status(200).json(encuestasAsignadas);
    } catch (error) {
        console.error('Error al obtener encuestas asignadas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudentById,
    deleteStudentById,
    loginStudent,
    obtenerEncuestasAsignadas
};
