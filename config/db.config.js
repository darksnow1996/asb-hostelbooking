module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "gunsmoke97",
    DB: "asb",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};