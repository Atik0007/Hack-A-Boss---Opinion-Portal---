const getConnection = require('../getConnection');

const addLikeDB = async (idUser, idOpinion) => {
    let connection;
    try {
        connection = await getConnection();

        const [like] = await connection.query(
            'SELECT value FROM vote WHERE idUser = ? AND idOpinion = ?',
            [idUser, idOpinion]
        );

        if (like.length < 1) {
            await connection.query(
                'INSERT INTO vote (idUser, idOpinion, value) VALUES (?, ?, 1)',
                [idUser, idOpinion]
            );
            return true;
        } else if (like[0].value === 1) {
            await connection.query(
                'DELETE FROM vote WHERE idUser = ? AND idOpinion = ?',
                [idUser, idOpinion]
            );
            return false;
        } else {
            await connection.query(
                'UPDATE vote SET value = 1 WHERE idUser = ? AND idOpinion = ?',
                [idUser, idOpinion]
            );
            return null;
        }
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = addLikeDB;
