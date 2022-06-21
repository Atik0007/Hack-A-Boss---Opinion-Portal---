const generateError = require('../../utils/generateError');
const getConnection = require('../getConnection');

const disLikeDB = async (idUser, idOpinion) => {
    let connection;
    try {
        connection = await getConnection();

        // Check if opinion exists
        const [id] = await connection.query(
            'SELECT id FROM opinions WHERE id = ?',
            [idOpinion]
        );

        if (id.length === 0) {
            throw generateError(404, 'Opinion not exists');
        }

        // Check if the opinion is owned by the user
        const [user] = await connection.query(
            'SELECT id FROM users WHERE id = ?',
            [idUser]
        );
        const [userId] = await connection.query(
            'SELECT idUser FROM opinions WHERE id = ?',
            [idOpinion]
        );

        // If the user is the owner of the opinion, it will throw an error
        if (user[0].id === userId[0].idUser) {
            throw generateError(400, 'You can not dislike your own opinion');
        }

        // Change like to false
        await connection.query(
            'UPDATE likes SET likes = false WHERE idUser = ? AND idOpinion = ?',
            [idUser, idOpinion]
        );

        //Check if user already disliked this opinion if he did then delete the dislike
        const [dislike] = await connection.query(
            'SELECT idUser FROM likes WHERE idUser = ? AND idOpinion = ? AND dislike = 1',
            [idUser, idOpinion]
        );

        // If user already disliked this opinion then delete the dislike else add a dislike
        if (dislike.length > 0) {
            await connection.query(
                'DELETE FROM likes WHERE idUser = ? AND idOpinion = ? AND dislike = 1',
                [idUser, idOpinion]
            );
            // Count all dislikes
            const [dislikes] = await connection.query(
                'SELECT COUNT(*) AS dislikes FROM likes WHERE idOpinion = ? AND dislike = 1',
                [idOpinion]
            );

            // Count all likes
            const [likes] = await connection.query(
                'SELECT COUNT(*) AS likes FROM likes WHERE idOpinion = ? AND likes = 1',
                [idOpinion]
            );

            // Update opinion likes and dislikes
            await connection.query(
                'UPDATE opinions SET dislikes = ? , likes = ? WHERE id = ? ',
                [dislikes[0].dislikes, likes[0].likes, idOpinion]
            );
            throw generateError(403, 'Dislike Deleted');
        } else {
            // Add new dislike
            await connection.query(
                'INSERT INTO likes (dislike, idUser, idOpinion) VALUES (true, ?, ?)',
                [idUser, idOpinion]
            );
            // Count all dislikes
            const [dislikes] = await connection.query(
                'SELECT COUNT(*) AS dislikes FROM likes WHERE idOpinion = ? AND dislike = 1',
                [idOpinion]
            );

            // Count all likes
            const [likes] = await connection.query(
                'SELECT COUNT(*) AS likes FROM likes WHERE idOpinion = ? AND likes = 1',
                [idOpinion]
            );

            // Update opinion likes and dislikes
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
