const getConnection = require('../getConnection');

const selectOpinionsByIdDB = async (idOpinion) => {
    let connection;
    try {
        connection = await getConnection();

        const [opinions] = await connection.query(
            `
                    SELECT T.id, T.idUser, U.email, T.text, T.createdAt
                    FROM opinions T
                    LEFT JOIN users U 
                    ON T.idUser = U.id
                    WHERE T.id = ?
                `,
            [idOpinion]
        );
        if (opinions.length === 0) {
            throw new Error(404, 'Opinion not found');
        }
        return opinions[0];
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = selectOpinionsByIdDB;
