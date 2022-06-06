const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const generateError = require('../../utils/generateError');

const selectUserByEmailDB = require('../../database/usersDB/selectUserByEmailDB');

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // This is a validation to check if the user has sent the email and password. If not, it will  throw an error.
        if (!email || !password) {
            throw generateError(400, 'Missing parameters');
        }

        const user = await selectUserByEmailDB(email);

        // Comparing the password that the user has sent with the password encrypted in the database.
        const validPassword = await bcrypt.compare(password, user.password);

        // If the password is not valid, it will throw an error.
        if (!validPassword) {
            throw generateError(401, 'Invalid password');
        }

        const payload = {
            userId: user.id,
        };

        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '30d',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = loginUser;
