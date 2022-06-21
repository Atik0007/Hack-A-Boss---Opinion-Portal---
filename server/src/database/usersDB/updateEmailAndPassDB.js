const bcrypt = require('bcrypt');

const getConnection = require('../getConnection');

const updatePasswordDB = async (idUser, email, password) => {
    let connection;
    try {
        connection = await getConnection();

        if (email === null) {
            const hashedPassword = await bcrypt.hash(password, 10);
            return await connection.query(
                'UPDATE users SET password = ? WHERE id = ?',
                [hashedPassword, idUser]
            );
        } else if (password === null) {
            return await connection.query(
                'UPDATE users SET email = ? WHERE id = ?',
                [email, idUser]
            );
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            return await connection.query(
                'UPDATE users SET password = ?, email = ? WHERE id = ?',
                [hashedPassword, email, idUser]
            );
        }
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = updatePasswordDB;
