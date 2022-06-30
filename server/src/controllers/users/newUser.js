const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const { createPathIfNotExists } = require('../../utils/createPath');

const insertUserDB = require('../../database/usersDB/insertUserDB');

const generateError = require('../../utils/generateError');

const newUser = async (req, res, next) => {
    try {
        const { userName, email, password, name, lastName, gender } = req.body;

        // This is a validation to check if the user has sent the email and password. If not, it will  throw an error.
        if (!userName || !email || !password || !name || !lastName || !gender) {
            throw generateError(400, 'Missing parameters');
        }

        let imgName;

        if (req.files && req.files.image) {
            const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

            await createPathIfNotExists(uploadsDir);

            const sharpImg = sharp(req.files.image.data);

            sharpImg.resize(500);

            imgName = `${nanoid(24)}.jpg`;

            const imgPath = path.join(uploadsDir, imgName);

            await sharpImg.toFile(imgPath);
        }

        const idUser = await insertUserDB(
            userName,
            email,
            password,
            name,
            lastName,
            gender,
            imgName
        );

        res.send({
            status: 'ok',
            message: `User id : ${idUser} created successfully`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newUser;
