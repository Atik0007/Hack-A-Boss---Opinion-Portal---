const bcrypt = require('bcrypt');

const getConnection = require('../getConnection');

/* const generateError = require('../../utils/generateError'); */

const updatePasswordDB = async (idUser, password, email) => {
    let connection;
    try {
        connection = await getConnection();

        const hashedPassword = await bcrypt.hash(password, 10);

        const [updatedPassword] = await connection.query(
            'UPDATE users SET password = ?,email = ?  WHERE id = ?',
            [hashedPassword, email, idUser]
        );

        return updatedPassword.insertId;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = updatePasswordDB;
