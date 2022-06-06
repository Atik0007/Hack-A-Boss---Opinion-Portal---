const getConnection = require('../getConnection');

/* const generateError = require('../../utils/generateError'); */

const newOpinionDB = async (idUser, text) => {
    let connection;
    try {
        connection = await getConnection();
        await connection.query(
            'INSERT INTO opinions (idUser, text) VALUES (?, ?)',
            [idUser, text]
        );
    } finally {
        connection.release();
    }
};

module.exports = newOpinionDB;