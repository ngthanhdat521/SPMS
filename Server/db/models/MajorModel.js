const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);
const { Department } = require('./DepartmentModel');

const Major = sequelize.define("major", {
    majorId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    majorCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    majorName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    majorDesc: {
        type: DataTypes.TEXT,
    },
    depId: {
        type: DataTypes.UUID,
        references: {
            model: Department,
            key: 'depId'
        }
    },
});

Department.hasMany(Major, {
    foreignKey: 'depId'
})


const initMajor = async () => {
    return  Major.sync({ alter: true })
}
module.exports = { Major, initMajor }
