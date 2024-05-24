const jwt = require('jsonwebtoken');

const SECRET_KEY = 'jamboard';

exports.generateToken = (userId) => {
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '24h' });
    return token;
};

exports.verifyToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, );
        return decodedToken;
    } catch (error) {
        throw new Error('Invalid token');
    }
};
SECRET_KEY