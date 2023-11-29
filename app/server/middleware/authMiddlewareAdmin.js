const { admin } = require('../models');
const jwt = require('jsonwebtoken');

async function authMiddlewareAdmin(req, res, next) {
    const { email, password } = req.body;

    try {
        const foundAdmin = await admin.findOne({
            attributes: ['id', 'correo', 'contraseña'],
            where: {
                correo: email,
                contraseña: password, 
            },
        });

        if (foundAdmin) {
            const token = jwt.sign({ userId: foundAdmin.id }, 'SecretKey', { expiresIn: '1m' });
            console.log('Admin encontrado y autenticado');
            res.json({ token });
        } else {
            console.log('No se encontró ningún Admin con las credenciales proporcionadas.');
            res.status(404).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error al buscar Admin por correo:', error);
        res.status(500).json({ message: 'Error al buscar Admin' });
    }
}

module.exports = authMiddlewareAdmin;