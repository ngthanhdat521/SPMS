const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);
const {User} = require('./UserModel');

const FileStorage = sequelize.define("file_storage", {
    fileId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    fileName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    type:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    path: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'userId'
        }
    },
});

User.hasMany(FileStorage,{
    foreignKey: 'userId'
})

const initFileStorage = async ()=>{
    return FileStorage.sync({ alter: true })
}
module.exports = {FileStorage, initFileStorage};
