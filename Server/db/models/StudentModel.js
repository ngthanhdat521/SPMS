const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const { Group } = require("./GroupModel");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);
const { User } = require('./UserModel');

const Student = sequelize.define("student", {
    stuId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    stuCode: {
        type: DataTypes.STRING(11),
        unique: true
    },
    gpa: DataTypes.FLOAT(1, 2),
    courseCreadits: DataTypes.INTEGER,
    codeLevel: DataTypes.INTEGER,
    note: DataTypes.TEXT,
    typeCapstone: DataTypes.INTEGER,
    class: DataTypes.STRING(30),
    isApproved: DataTypes.BOOLEAN,
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'userId',
        },
        unique: true,

    },
    groupId:{
        type: DataTypes.UUID,
        references:{
            model: Group,
            key: "groupId"
        }
    }
});

User.hasOne(Student, {
    foreignKey: 'userId',
})

Group.hasMany(Student,{
    foreignKey: "groupId"
})

const initStudent = async () => {
    return Student.sync({ alter: true })
}

module.exports = { Student, initStudent };