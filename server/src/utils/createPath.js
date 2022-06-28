const fs = require('fs/promises');

const createPathIfNotExists = async (path) => {
    try {
        // Intentamos acceder al directorio.
        await fs.access(path);
    } catch {
        // Si no es posible acceder al directorio en el "try" se
        // lanzaría un error. Si es así creamos el directorio.
        await fs.mkdir(path);
    }
};

module.exports = { createPathIfNotExists };
