const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const { ListTask } = require("./ListTaskModel");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);

const Task = sequelize.define("task", {
    taskId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    listTaskId: {
        type: DataTypes.UUID,
        references: {
            model: ListTask,
            key: "listTaskId"
        }
    },
    taskName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    taskDesc: DataTypes.STRING(50),
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
});

ListTask.hasMany(Task, {
    foreignKey: "listTaskId"
})

const initTask = async () => {
    return Task.sync({ alter: true });
}
module.exports = { Task, initTask };