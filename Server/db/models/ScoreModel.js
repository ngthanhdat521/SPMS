const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const { Council } = require("./CouncilModel");
const { Lecturer } = require("./LecturerModel");
const { Student } = require("./StudentModel");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);

const Score = sequelize.define("score", {
    scoreId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    councilId: {
        type: DataTypes.UUID,
        references: {
            model: Council,
            key: 'councilId',
        },
        allowNull: true
    },
    stuId: {
        type: DataTypes.UUID,
        references: {
            model: Student,
            key: 'stuId',
        },
    },
    lecturerId: {
        type: DataTypes.UUID,
        references: {
            model: Lecturer,
            key:'lecturerId'
        }, 
        allowNull: true
    },
    mentorScore: DataTypes.FLOAT(1, 2),
    presidentScore: DataTypes.FLOAT(1, 2),
    assistantScore: DataTypes.FLOAT(1, 2),
    reviewerScore: DataTypes.FLOAT(1, 2),
});

Student.hasOne(Score,{
    foreignKey: 'stuId'
})

Lecturer.hasMany(Score,{
    foreignKey: 'lecturerId'
})

Council.hasMany(Score,{
    foreignKey: 'councilId'
})

const initScore = async () => {
    return Score.sync({ alert: true });
}

module.exports = { Score, initScore };