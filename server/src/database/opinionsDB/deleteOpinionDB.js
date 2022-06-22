const getConnection = require('../getConnection');

const generateError = require('../../utils/generateError');

const deleteOpinionDB = async (idUser, idOpinion) => {
    let connection;
    try {
        connection = await getConnection();

        const [validUser] = await connection.query(
            'SELECT id  FROM opinions WHERE idUser = ? AND id = ?',
            [idUser, idOpinion]
        );

        if (!validUser[0]) {
            throw generateError(403, 'You are not the owner of this opinion');
        }

        await connection.query('DELETE FROM opinions WHERE id = ?', [
            idOpinion,
        ]);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = deleteOpinionDB;
