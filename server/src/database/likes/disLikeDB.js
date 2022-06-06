const generateError = require('../../utils/generateError');
const getConnection = require('../getConnection');

const disLikeDB = async (idUser, idOpinion) => {
    let connection;
    try {
        connection = await getConnection();

        // check if opinion exists
        const [id] = await connection.query(
            'SELECT id FROM opinions WHERE id = ?',
            [idOpinion]
        );
        if (id.length === 0) {
            throw generateError(404, 'Opinion not exists');
        }

        // change like to false
        await connection.query(
            'UPDATE likes SET likes = false WHERE idUser = ? AND idOpinion = ?',
            [idUser, idOpinion]
        );

        //check if user already disliked this opinion if he did then delete the dislike
        const [dislike] = await connection.query(
            'SELECT idUser FROM likes WHERE idUser = ? AND idOpinion = ? AND dislike = 1',
            [idUser, idOpinion]
        );

        // if user already disliked this opinion then delete the dislike else add a dislike
        if (dislike.length > 0) {
            await connection.query(
                'DELETE FROM likes WHERE idUser = ? AND idOpinion = ? AND dislike = 1',
                [idUser, idOpinion]
            );
            // count all dislikes
            const [dislikes] = await connection.query(
                'SELECT COUNT(*) AS dislikes FROM likes WHERE idOpinion = ? AND dislike = 1',
                [idOpinion]
            );

            // count all likes
            const [likes] = await connection.query(
                'SELECT COUNT(*) AS likes FROM likes WHERE idOpinion = ? AND likes = 1',
                [idOpinion]
            );

            // update opinion likes and dislikes
            await connection.query(
                'UPDATE opinions SET dislikes = ? , likes = ? WHERE id = ? ',
                [dislikes[0].dislikes, likes[0].likes, idOpinion]
            );
            throw generateError(403, 'Dislike Deleted');
        } else {
            // add new dislike
            await connection.query(
                'INSERT INTO likes (dislike, idUser, idOpinion) VALUES (true, ?, ?)',
                [idUser, idOpinion]
            );
            // count all dislikes
            const [dislikes] = await connection.query(
                'SELECT COUNT(*) AS dislikes FROM likes WHERE idOpinion = ? AND dislike = 1',
                [idOpinion]
            );

            // count all likes
            const [likes] = await connection.query(
                'SELECT COUNT(*) AS likes FROM likes WHERE idOpinion = ? AND likes = 1',
                [idOpinion]
            );

            // update opinion likes and dislikes
            await connection.query(
                'UPDATE opinions SET dislikes = ? , likes = ? WHERE id = ? ',
                [dislikes[0].dislikes, likes[0].likes, idOpinion]
            );
        }
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = disLikeDB;
