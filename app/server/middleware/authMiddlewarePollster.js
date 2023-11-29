const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken.js');
const { pollster } = require('../models');

async function authMiddlewarePollster(req, res, next) {
    const { email, password } = req.body;

    try {
        const foundPollster = await pollster.findOne({
            attributes: ['id', 'cedula', 'correo', 'sede', 'nombre', 'apellido', 'contraseña'],
            where: {
                correo: email,
                contraseña: password
            },
        });

        if (foundPollster) {
            const existingToken = req.headers.authorization;
            if (existingToken) {
               
                jwt.verify(existingToken, 'SecretKey', (err, decoded) => {
                    if (err) {
                        console.error('Token inválido:', err);
                        res.status(403).json({ message: 'Token inválido' });
                    } else {
                        console.log('Token válido');
                        next();
                    }
                });
            } else {
                const token = jwt.sign({ email, password }, 'SecretKey', { expiresIn: '1m' });
                console.log('Encuestador encontrado');
                res.json({ token });
            }
        } else {
            console.log('No se encontró ningún pollster con las credenciales proporcionadas.');
            res.status(404).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error al buscar pollster por correo:', error);
        res.status(500).json({ message: 'Error al buscar pollster' });
    }
}


module.exports = authMiddlewarePollster;