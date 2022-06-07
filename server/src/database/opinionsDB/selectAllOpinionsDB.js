const getConnection = require('../getConnection');

const selectAllOpinionsDB = async (keyword) => {
    let connection;
    try {
        connection = await getConnection();

        let opinions;

        if (keyword) {
            [opinions] = await connection.query(
                `
                    SELECT T.id, T.idUser, U.email, U.name, U.lastName, T.text, T.likes, T.dislikes, T.createdAt
                    FROM opinions T
                    LEFT JOIN users U 
                    ON T.idUser = U.id
                    WHERE T.text LIKE ?
                    ORDER BY T.likes DESC
                `,
                [`%${keyword}%`]
            );
        } else {
            [opinions] = await connection.query(
                `
                    SELECT T.id, T.idUser, U.email, U.name, U.lastName, T.text,T.likes, T.dislikes, T.createdAt
                    FROM opinions T
                    LEFT JOIN users U 
                    ON T.idUser = U.id
                    ORDER BY T.likes DESC
                `
            );
        }

        return opinions;
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = selectAllOpinionsDB;
