const jwt = require('jsonwebtoken');

const generateError = require('../utils/generateError');

const auth = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw generateError(401, 'You must be logged in');
        }

        let token;

        try {
            token = jwt.verify(authorization, process.env.SECRET);
        } catch {
            throw generateError(401, 'Invalid token');
        }

        req.user = token.id;
    } catch (err) {
        next(err);
    }
};

module.exports = auth;
