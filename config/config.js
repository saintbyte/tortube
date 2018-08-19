module.exports = {
    development: {
        username: 'tortube',
        password: 'tor123',
        database: 'tortube',
        host: '127.0.0.1',
        port: '5432',
        dialect: 'postgres',
    },
    test: {
        username: 'tortube',
        password: 'tor123',
        database: 'tortube_test',
        host: '127.0.0.1',
        port: 5432,
        dialect: 'postgres',
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: 'postgres',
        port: 5432,
    }
};
