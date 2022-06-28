const getConnection = require('../getConnection');

const generateError = require('../../utils/generateError');

const selectUserByEmailDB = async (email) => {
    let connection;
    try {
        connection = await getConnection();

        const [user] = await connection.query(
            'SELECT id, password, name, lastName, gender, userName, image FROM users WHERE email = ?',
            [email]
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

module.exports = selectUserByEmailDB;
