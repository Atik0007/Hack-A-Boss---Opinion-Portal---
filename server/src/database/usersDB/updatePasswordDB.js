const bcrypt = require('bcrypt');

const getConnection = require('../getConnection');

/* const generateError = require('../../utils/generateError'); */

const updatePasswordDB = async (idUser, password) => {
    let connection;
    try {
        connection = await getConnection();

        const hashedPassword = await bcrypt.hash(password, 10);

        const [updatedPassword] = await connection.query(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, idUser]
        );

        return updatedPassword.insertId;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = updatePasswordDB;
