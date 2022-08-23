const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const { Group } = require("./GroupModel");
const { Lecturer } = require("./LecturerModel");
const {Student} = require("./StudentModel")
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);

const Project = sequelize.define("project", {
    projectId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    projectName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    projectDesc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    note: DataTypes.TEXT,
    lecturerId: {
        type: DataTypes.UUID, 
        references: {
            model: Lecturer,
            key: 'lecturerId'
        }
    },
    groupId: {
        type: DataTypes.UUID,
        references: {
            model: Group,
            key: "groupId",
        }
    },
    leaderId:{
        type: DataTypes.UUID,
        allowNull: true,
        references:{
            model: Student,
            key: "stuId"
        }
    },
    isApproved: DataTypes.STRING,
    // isRegisterd: DataTypes.BOOLEAN,
});

Lecturer.hasMany(Project,{
    foreignKey: 'lecturerId'
})
Group.hasOne(Project,{
    foreignKey: 'groupId'
})

Student.hasOne(Project,{
    foreignKey: "leaderId"
})

const initProject = async () => {
    return  Project.sync({alert: true})
}
module.exports = { Project, initProject };