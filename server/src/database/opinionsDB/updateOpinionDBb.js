const generateError = require('../../utils/generateError');
const getConnection = require('../getConnection');

const updateOpinionDB = async (idUser, idOpinion, opinion) => {
    let connection;
    try {
        connection = await getConnection();

        await connection.query(
            'SELECT idUser  FROM opinions WHERE idUser = ?',
            [idUser]
        );

        const [id] = await connection.query(
            'SELECT id FROM opinions WHERE id = ?',
            [idOpinion]
        );

        if (id.length === 0) {
            throw generateError(404, 'Opinion not exists');
        }

        await connection.query('UPDATE opinions SET text = ? WHERE id = ?', [
            opinion,
            idOpinion,
        ]);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = updateOpinionDB;
