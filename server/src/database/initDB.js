const usersModule = require('../modules/usersModule');
const opinionsModule = require('../modules/opinionsModule');
const likesModule = require('../modules/likesModule');

const maim = async () => {
    try {
        await usersModule();
        await opinionsModule();
        await likesModule();
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
};

maim();
