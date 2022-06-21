const getConnection = require('../getConnection');
const generateError = require('../../utils/generateError');

const selectOpinionsByIdDB = async (idOpinion) => {
    let connection;
    try {
        connection = await getConnection();

        const [opinions] = await connection.query(
            `
                    SELECT T.id, T.idUser, U.email, U.name, U.lastName, T.text,T.likes, T.dislikes, T.createdAt
                    FROM opinions T
                    LEFT JOIN users U 
                    ON T.idUser = U.id
                    WHERE T.id = ?
                `,
            [idOpinion]
        );
        if (opinions.length === 0) {
            throw generateError(404, 'Opinion not exists');
        }
        return opinions[0];
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = selectOpinionsByIdDB;
