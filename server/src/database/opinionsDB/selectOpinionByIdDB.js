const getConnection = require('../getConnection');

const selectOpinionsByIdDB = async (idOpinion) => {
    let connection;
    try {
        connection = await getConnection();

        const [opinions] = await connection.query(
            `
                    SELECT T.id, T.idUser, U.email,U.image, U.name, U.lastName, T.text,T.title, T.likes, T.dislikes, T.createdAt
                    FROM opinions T
                    LEFT JOIN users U 
                    ON T.idUser = U.id
                    WHERE T.id = ?
                `,
            [idOpinion]
        );

        return opinions[0];
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = selectOpinionsByIdDB;
