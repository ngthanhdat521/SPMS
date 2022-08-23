const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const { FileStorage } = require("./FileStorageModel");
const { Project } = require("./ProjectModel");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);

const ProjectFile = sequelize.define("project_file", {
    projectId: {
        type: DataTypes.UUID,
        references:{
            model: Project,
            key: "projectId"
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

Project.hasMany(ProjectFile, {foreignKey: 'projectId'});
FileStorage.hasOne(ProjectFile,{foreignKey: 'fileId'});

const initProjectFile = async () =>{
    return ProjectFile.sync({alter: true})
}

module.exports = {ProjectFile, initProjectFile}

