const getConnection = require('../getConnection');

const generateError = require('../../utils/generateError');

const selectUserByIdDB = async (idUser) => {
    let connection;
    try {
        connection = await getConnection();
        const [user] = await connection.query(
            'SELECT id, email, name, lastName FROM users WHERE id = ?',
            [idUser]
        );

        if (user.length < 1) {
            throw generateError(404, 'User not found');
        }

        return user[0];
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = selectUserByIdDB;
