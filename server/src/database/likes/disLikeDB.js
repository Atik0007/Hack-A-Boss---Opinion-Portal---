const getConnection = require('../getConnection');

const disLikeDB = async (idUser, idOpinion) => {
    let connection;
    try {
        connection = await getConnection();

        const [dislike] = await connection.query(
            'SELECT value FROM vote WHERE idUser = ? AND idOpinion = ?',
            [idUser, idOpinion]
        );

        if (dislike.length < 1) {
            await connection.query(
                'INSERT INTO vote (idUser, idOpinion, value) VALUES (?, ?, 0)',
                [idUser, idOpinion]
            );
            return true;
        } else if (dislike[0].value === 0) {
            await connection.query(
                'DELETE FROM vote WHERE idUser = ? AND idOpinion = ?',
                [idUser, idOpinion]
            );
            return false;
        } else {
            await connection.query(
                'UPDATE vote SET value = 0 WHERE idUser = ? AND idOpinion = ?',
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

module.exports = disLikeDB;
