const jwt = require('jsonwebtoken');

function extractPollsterId(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token de autorización no proporcionado' });
    }

    jwt.verify(token, 'SecretKey', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.pollsterId = decoded.id;
        next();
    });
}

module.exports = extractPollsterId;