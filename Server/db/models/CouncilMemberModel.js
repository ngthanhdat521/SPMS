const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const { Council } = require("./CouncilModel");
const { Lecturer } = require("./LecturerModel");
const { Role } = require("./RoleModel");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);

const CouncilMember = sequelize.define("council_member", {
    councilId: {
        type: DataTypes.UUID,
        references: {
            model: Council,
            key: 'councilId'
        },
        primaryKey: true
    },
    lecturerId: {
        type: DataTypes.UUID,
        references: {
            model: Lecturer,
            key: 'lecturerId'
        },
        primaryKey: true
    },
    roleId: {
        type: DataTypes.UUID,
        references:{
            model: Role,
            key:"roleId" 
        },
    },
    workUnit: {
        type: DataTypes.STRING(50)
    }
});

Council.belongsToMany(Lecturer, {
    through: CouncilMember,
    foreignKey: 'councilId'
});

Lecturer.belongsToMany(Council,{
    through: CouncilMember,
    foreignKey:  'lecturerId'
});

Role.hasOne(CouncilMember, {foreignKey:"roleId"})

const initCouncilMember = async () => {
    return CouncilMember.sync({ alert: true })
}

module.exports = { CouncilMember, initCouncilMember }
