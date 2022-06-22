const disLikeDB = require('../../database/likes/disLikeDB');
const updateLikeDislike = require('../../utils/updateLike&Dislike');

const disLikes = async (req, res, next) => {
    try {
        const { idOpinion } = req.params;

        let value = await disLikeDB(req.idUser, idOpinion);

        if (value === true) {
            value = 'Dislike inserted';
        } else if (value === false) {
            value = 'Dislike deleted';
        } else {
            value = 'Dislike added';
        }

        await updateLikeDislike(idOpinion);

        res.send({
            status: 'Ok',
            message: value,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = disLikes;
