const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);
const { User } = require('./UserModel');

const Lecturer = sequelize.define("lecturer", {
    lecturerId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        unique: true,
        references: {
            model: User,
            key: "userId",
        },
    },
    academicLevel: DataTypes.STRING(50),
});

User.hasOne(Lecturer, {
    foreignKey: 'userId'
});


const initLecturer = async  () => {
    return Lecturer.sync({ alter: true })
}

module.exports = { Lecturer, initLecturer }
