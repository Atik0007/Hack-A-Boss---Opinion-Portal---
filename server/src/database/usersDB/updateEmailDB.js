const getConnection = require('../getConnection');

/* const generateError = require('../../utils/generateError'); */

const updateEmailDB = async (idUser, email) => {
    let connection;
    try {
        connection = await getConnection();

        const [updatedEmail] = await connection.query(
            'UPDATE users SET email = ? WHERE id = ?',
            [email, idUser]
        );

        return updatedEmail;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = updateEmailDB;
