const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const { FileStorage } = require("./FileStorageModel");
const { Notification } = require("./NotificationModel");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);

const NotificationFile = sequelize.define("notification_file", {
    notificationId: {
        type: DataTypes.UUID,
        references:{
            model: Notification,
            key: "notificationId"
        },
        primaryKey: true,
        allowNull: false,
    },
    fileId: {
        type: DataTypes.UUID,
        references:{
            model: FileStorage,
            key: "fileId"
        },
        primaryKey: true,
        allowNull: false,
    },
})

// Notification.belongsToMany(FileStorage, {through: NotificationFile, foreignKey: 'notificationId'});
// FileStorage.belongsToMany(Notification, {through: NotificationFile, foreignKey: 'fileId'});

const initNotificationFile = async () =>{
    return NotificationFile.sync({alter: true})
}

module.exports = {NotificationFile, initNotificationFile}

