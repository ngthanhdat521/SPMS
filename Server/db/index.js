const { Sequelize } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("./config/dbconfig");

const connect = async () => {
    try {
        const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);
        console.log("Connected Database Successfull!!!");
        return sequelize;
    } catch (error) {
        console.log("Connected FAILURE!!!");
        return error;
    }
};

module.exports = { connect };
