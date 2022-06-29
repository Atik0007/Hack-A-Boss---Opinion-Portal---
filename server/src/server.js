require('dotenv').config();

const { PORT } = process.env;

const fileUpload = require('express-fileupload');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'uploads')));

const dir = path.join(__dirname, 'uploads');

console.log(dir);

/**
 * #################
 * ## Middlewares ##
 * #################
 */
const { auth, opinionExists } = require('./middlewares');

/**
 * ####################
 * ## Endpoints User ##
 * ####################
 */

const {
    newUser,
    loginUser,
    getUser,
    getOwnUser,
    updateEmailAndPass,
} = require('./controllers/users');

// New user
app.post('/user', newUser);

// Login user
app.post('/user/login', loginUser);

// Get user
app.get('/user/:idUser', getUser);

// Get own user
app.get('/user', auth, getOwnUser);

// Update email and password
app.put('/user', auth, updateEmailAndPass);

/**
 * ########################
 * ## Endpoints Opinions ##
 * ########################
 */

const {
    newOpinion,
    updateOpinion,
    deleteOpinion,
    listOpinions,
    getOpinion,
} = require('./controllers/opinions');

// New opinion
app.post('/opinions', auth, newOpinion);

// Get all opinions
app.get('/opinions', listOpinions);

// Get opinion
app.get('/opinions/:idOpinion', opinionExists, getOpinion);

// Update opinion
app.put('/opinions/:idOpinion', auth, opinionExists, updateOpinion);

// Delete opinion
app.delete('/opinions/:idOpinion', auth, opinionExists, deleteOpinion);

/**
 * #####################
 * ## Endpoints Votes ##
 * #####################
 */

const { addLikes, disLikes } = require('./controllers/likes');

// Add like and remove like
app.post('/opinions/:idOpinion/like', auth, opinionExists, addLikes);

// Add dislike and remove dislike
app.post('/opinions/:idOpinion/dislike', auth, opinionExists, disLikes);

/**
 * ######################
 * ## Middleware Error ##
 * ######################
 */

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send({
        message: err.message,
        status: 'Error',
    });
});

/**
 * ##########################
 * ## Middleware Not Found ##
 * ##########################
 */

app.use((req, res) => {
    res.status(404).send({
        status: 404,
        message: 'Not Found',
    });
});

/**
 * ##################
 * ## Start Server ##
 * ##################
 * */

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
