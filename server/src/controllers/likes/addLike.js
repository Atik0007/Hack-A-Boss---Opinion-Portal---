const addLikeDB = require('../../database/likes/addLikeDB');

const addLikes = async (req, res, next) => {
    try {
        const { idOpinion } = req.params;

        await addLikeDB(req.idUser, idOpinion);

        res.send({
            status: 'Ok',
            message: `Like user id : ${req.idUser} added to opinion id : ${idOpinion}`,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = addLikes;
