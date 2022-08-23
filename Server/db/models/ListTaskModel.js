const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);
const { Stage } = require('./StageModel');

const ListTask = sequelize.define("listTask", {
    listTaskId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    stageId: {
        type: DataTypes.UUID,
        references: {
            model: Stage,
            key: "stageId",
        },
        allowNull: false,
    },
    title: {
        type:DataTypes.STRING(50),
        allowNull: false
    },
    description: DataTypes.TEXT
});

Stage.hasMany(ListTask, {
    foreignKey: 'stageId'
});


const initListTask = async  () => {
    return ListTask.sync({ alter: true })
}

module.exports = { ListTask, initListTask }
