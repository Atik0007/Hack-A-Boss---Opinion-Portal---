const addLikeDB = require('../../database/likes/addLikeDB');
const updateLikeDislike = require('../../utils/updateLike&Dislike');

const addLikes = async (req, res, next) => {
    try {
        const { idOpinion } = req.params;

        let value = await addLikeDB(req.idUser, idOpinion);

        if (value === true) {
            value = 'Like inserted';
        } else if (value === false) {
            value = 'Like removed';
        } else {
            value = 'Like added';
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

module.exports = addLikes;
