const generateError = require('../../utils/generateError');
const getConnection = require('../getConnection');

const updateOpinionDB = async (idUser, idOpinion, opinion) => {
    let connection;
    try {
        connection = await getConnection();

        const [id] = await connection.query(
            'SELECT id FROM opinions WHERE id = ?',
            [idOpinion]
        );

        // Checking if the opinion is exists.
        if (id.length === 0) {
            throw generateError(404, 'Opinion not exists');
        }

        const [validUser] = await connection.query(
            'SELECT id  FROM opinions WHERE idUser = ? AND id = ?',
            [idUser, id[0].id]
        );
        console.log(validUser[0]);

        // Checking if the user is the owner of the opinion.
        if (!validUser[0]) {
            throw generateError(403, 'You are not the owner of this opinion');
        }

        // Updating the opinion.
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
