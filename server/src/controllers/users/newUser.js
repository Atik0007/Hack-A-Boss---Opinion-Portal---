const insertUserDB = require('../../database/usersDB/insertUserDB');

const generateError = require('../../utils/generateError');

const newUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw generateError(400, 'Missing email or password');
        }

        const idUser = await insertUserDB(email, password);

        res.send({
            status: 'ok',
            message: `User id : ${idUser} created successfully`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newUser;
