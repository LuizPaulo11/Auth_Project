const jwt = require('jsonwebtoken');

function Auth(req, res, next) {
    const Header = req.headers.authorization;

    if (!Header || !Header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não fornecido ou inválido' });
    }

    const token = Header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido ou expirado' });
    }
}

module.exports = Auth;