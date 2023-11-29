const jwt = require('jsonwebtoken');
const { student } = require('../models');

async function authMiddlewareEstudiantes(req, res, next) {
    const { email, password } = req.body;

    try {
        const foundStudent = await student.findOne({
            attributes: ['id', 'cedula', 'correo', 'sede', 'programa', 'nombre', 'apellido', 'contraseña'],
            where: {
                correo: email,
                contraseña: password
            },
        });

        if (foundStudent) {
            const existingToken = req.headers.authorization;
            if (!existingToken) {
                const token = jwt.sign({ email, password }, 'SecretKey', { expiresIn: '1m' });
                console.log('Estudiante encontrado');
                console.log(foundStudent.contraseña);
                return res.json({ token });
            }
            jwt.verify(existingToken, 'SecretKey', (err, decoded) => {
                if (err) {
                    console.error('Token inválido:', err);
                    return res.status(403).json({ message: 'Token inválido' });
                }
                console.log('Token válido');
                console.log(decoded);
                next();
            });
        } else {
            console.log('No se encontró ningún estudiante con las credenciales proporcionadas.');
            res.status(404).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error al buscar estudiante por correo:', error);
        res.status(500).json({ message: 'Error al buscar estudiante' });
    }
}

module.exports = authMiddlewareEstudiantes;