const usersModule = require('../modules/usersModule');
const opinionsModule = require('../modules/opinionsModule');

const maim = async () => {
    try {
        await usersModule();
        await opinionsModule();
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
};

maim();
