const getConnection = require('../getConnection');

const newOpinionDB = async (idUser, text, title) => {
    let connection;
    try {
        connection = await getConnection();
        await connection.query(
            'INSERT INTO opinions (idUser, text,title) VALUES (?, ?, ?)',
            [idUser, text, title]
        );
    } finally {
        connection.release();
    }
};

module.exports = newOpinionDB;
