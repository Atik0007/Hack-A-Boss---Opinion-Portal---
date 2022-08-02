const selectAllOpinionsDB = require('../../database/opinionsDB/selectAllOpinionsDB');

const listOpinions = async (req, res, next) => {
    try {
        const { keyword } = req.query;
        const opinions = await selectAllOpinionsDB(keyword);

        res.send({
            status: 'Ok',
            data: {
                opinions,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listOpinions;
