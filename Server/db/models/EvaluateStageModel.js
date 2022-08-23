const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);
const { Stage } = require("./StageModel");
const { Student } = require("./StudentModel");

const EvaluateStage = sequelize.define("evaluate_stage", {
    stageId: {
        type: DataTypes.UUID,
        references:{
            model: Stage,
            key: "stageId"
        },
        primaryKey: true,
        allowNull: false,
    },
    stuId: {
        type: DataTypes.UUID,
        references:{
            model: Student,
            key: "stuId"
        },
        primaryKey: true,
        allowNull: false,
    },
    percentage: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    comment: DataTypes.TEXT
})

Stage.hasMany(EvaluateStage,{foreignKey: "stageId"});
Student.hasMany(EvaluateStage, {foreignKey: "stuId"});

const initEvaluateStage = async () =>{
    return EvaluateStage.sync({alter: true})
}

module.exports = {EvaluateStage, initEvaluateStage}

