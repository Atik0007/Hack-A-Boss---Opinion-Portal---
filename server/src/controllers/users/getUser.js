const selectUserByIdDB = require('../../database/usersDB/selectUserByIdDB');

const getUser = async (req, res, next) => {
    try {
        const { idUser } = req.params;

        const user = await selectUserByIdDB(idUser);

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

module.exports = getUser;
