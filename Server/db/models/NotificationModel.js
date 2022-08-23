const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const { User } = require("./UserModel");
const {FileStorage} =require("./FileStorageModel");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);

const Notification = sequelize.define("notification", {
    notificationId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    content: {
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
    fileId1: {
        type: DataTypes.UUID,
        references:{
            model: FileStorage,
            key: "fileId"
        },
    },
    fileId2: {
        type: DataTypes.UUID,
        references:{
            model: FileStorage,
            key: "fileId"
        },
    },
    fileId3: {
        type: DataTypes.UUID,
        references:{
            model: FileStorage,
            key: "fileId"
        },
    },
    fileId4: {
        type: DataTypes.UUID,
        references:{
            model: FileStorage,
            key: "fileId"
        },
    },
})

User.hasMany(Notification, { foreignKey: 'userId' });
FileStorage.hasOne(Notification, {foreignKey: 'fileId1'});
FileStorage.hasOne(Notification, {foreignKey: 'fileId2'});
FileStorage.hasOne(Notification, {foreignKey: 'fileId3'});
FileStorage.hasOne(Notification, {foreignKey: 'fileId4'});

const initNotification = async () => {
    return Notification.sync({ alter: true })
}

module.exports = { Notification, initNotification }

