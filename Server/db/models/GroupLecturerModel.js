const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);
const { Lecturer } = require('./LecturerModel')
const { Group } = require('./GroupModel')

const GroupLecturer = sequelize.define("group_lecturer", {
    groupId: {
        type: DataTypes.UUID,
        references: {
            model: Group,
            key: 'groupId'
        }
    },
    lecturerId: {
        type: DataTypes.UUID,
        references: {
            model: Lecturer,
            key: 'lecturerId'
        }
    }
});

Lecturer.belongsToMany(Group, { through: GroupLecturer, foreignKey: 'lecturerId' })
Group.belongsToMany(Lecturer, { through: GroupLecturer, foreignKey: 'groupId' })

const initGroupLecturer = async () => {
    return GroupLecturer.sync({ alert: true });
}
module.exports = { GroupLecturer, initGroupLecturer }