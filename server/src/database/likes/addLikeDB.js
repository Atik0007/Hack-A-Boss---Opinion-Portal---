const generateError = require('../../utils/generateError');
const getConnection = require('../getConnection');

const addLikeDB = async (idUser, idOpinion) => {
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

        // change dislike to false
        await connection.query(
            'UPDATE likes SET dislike = false WHERE idUser = ? AND idOpinion = ?',
            [idUser, idOpinion]
        );

        //check if user already liked this opinion if he did then delete the like
        const [like] = await connection.query(
            'SELECT idUser FROM likes WHERE idUser = ? AND idOpinion = ? AND likes = 1',
            [idUser, idOpinion]
        );
        if (like.length > 0) {
            await connection.query(
                'DELETE FROM likes WHERE idUser = ? AND idOpinion = ? AND likes = 1',
                [idUser, idOpinion]
            );
        }

        // add new like
        await connection.query(
            'INSERT INTO likes (likes, idUser, idOpinion) VALUES (true, ?, ?)',
            [idUser, idOpinion]
        );

        // count all likes
        const [likes] = await connection.query(
            'SELECT COUNT(*) AS likes FROM likes WHERE idOpinion = ? AND likes = 1',
            [idOpinion]
        );

        // count all dislikes
        const [dislikes] = await connection.query(
            'SELECT COUNT(*) AS dislikes FROM likes WHERE idOpinion = ? AND dislike = 1',
            [idOpinion]
        );

        // update opinion likes and dislikes
        await connection.query(
            'UPDATE opinions SET likes = ? , dislikes = ?  WHERE id = ?',
            [likes[0].likes, dislikes[0].dislikes, idOpinion]
        );
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = addLikeDB;
