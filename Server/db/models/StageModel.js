const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const { Project } = require("./ProjectModel");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);

const Stage = sequelize.define("stage", {
    stageId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    stageName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    stageDesc: DataTypes.TEXT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    projectId: {
        type: DataTypes.UUID,
        references:{
            model: Project,
            key: "projectId"
        }
    },
});

Project.hasMany(Stage, {
    foreignKey: "projectId",
})

const initStage = async () =>{
    return Stage.sync({alter: true});
}

module.exports = { Stage, initStage };