const generateError = require('../../utils/generateError');
const getConnection = require('../getConnection');

const updateOpinionDB = async (idUser, idOpinion, text, title) => {
    let connection;
    try {
        connection = await getConnection();

        const [validUser] = await connection.query(
            'SELECT id  FROM opinions WHERE idUser = ? AND id = ?',
            [idUser, idOpinion]
        );

        // Checking if the user is the owner of the opinion.
        if (!validUser[0]) {
            throw generateError(403, 'You are not the owner of this opinion');
        }

        // Updating the opinion.
        await connection.query(
            'UPDATE opinions SET text = ?, title = ?  WHERE id = ?',
            [text, title, idOpinion]
        );
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = updateOpinionDB;
