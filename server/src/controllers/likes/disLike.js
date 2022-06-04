const disLikeDB = require('../../database/likes/disLikeDB');

const disLikes = async (req, res, next) => {
    try {
        const { idOpinion } = req.params;

        await disLikeDB(req.idUser, idOpinion);

        res.send({
            status: 'Ok',
            message: `Dislike user id : ${req.idUser} added to opinion id : ${idOpinion}`,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = disLikes;
