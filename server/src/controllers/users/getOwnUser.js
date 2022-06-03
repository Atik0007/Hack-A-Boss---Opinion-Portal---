const selectUserByIdDB = require('../../database/usersDB/selectUserByIdDB');

const getOwnUser = async (req, res, next) => {
    try {
        const user = await selectUserByIdDB(req.idUser);

        res.send({
            status: 'Ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getOwnUser;
