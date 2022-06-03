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

        await connection.query('DELETE FROM opinions WHERE id = ?', [
            idOpinion,
        ]);
    } catch (err) {
        throw generateError(err);
    }
};

module.exports = deleteOpinionDB;
