const insertUserDB = require('../../database/usersDB/insertUserDB');

const generateError = require('../../utils/generateError');

const newUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // This is a validation to check if the user has sent the email and password. If not, it will  throw an error.
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
