const getConnection = require('../getConnection');

const generateError = require('../../utils/generateError');

const deleteOpinionDB = async (idUser, idOpinion) => {
    let connection;
    try {
        connection = await getConnection();
        const [id] = await connection.query(
            'SELECT id FROM opinions WHERE id = ?',
            [idOpinion]
        );

        if (id.length === 0) {
            throw generateError(404, 'Opinion not exists');
        }

        const [validUser] = await connection.query(
            'SELECT id  FROM opinions WHERE idUser = ? AND id = ?',
            [idUser, id[0].id]
        );

        if (!validUser[0]) {
            throw generateError(403, 'You are not the owner of this opinion');
        }

        // Deleting the like of the opinion.
        await connection.query('DELETE FROM likes WHERE idOpinion = ?', [
            idOpinion,
        ]);

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
