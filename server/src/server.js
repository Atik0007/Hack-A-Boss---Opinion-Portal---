require('dotenv').config();

const { PORT } = process.env;

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

/**
 * #################
 * ## Middlewares ##
 * #################
 */

const auth = require('./middlewares/auth');

/**
 * ####################
 * ## Endpoints User ##
 * ####################
 */
const { newUser, loginUser } = require('./controllers/users');

app.post('/users', newUser);

app.post('/users/login', loginUser);

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
