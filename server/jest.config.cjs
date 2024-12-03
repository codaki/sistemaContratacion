module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.js$': 'babel-jest',  // Esto transforma tus archivos JS para que Jest los entienda
    },
};
