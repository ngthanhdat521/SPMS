// const { Sequelize, DataTypes } = require("sequelize");
// const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
// const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);
// const { Student } = require('./StudentModel');
// const { Group } = require('./GroupModel')

// const GroupStudent = sequelize.define("group_student", {
//     groupId: {
//         type: DataTypes.UUID,
//         references: {
//             model: Group,
//             key: 'groupId'
//         }
//     },
//     stuId: {
//         type: DataTypes.UUID,
//         references: {
//             model: Student,
//             key: 'stuId'
//         }
//     }
// });

// Student.belongsToMany(Group,{through: GroupStudent, foreignKey: 'stuId' })
// Group.belongsToMany(Student,{through: GroupStudent, foreignKey: 'groupId' })

// const initGroupStudent = async ( ) =>{
//     return GroupStudent.sync({alert: true});
// } 
// module.exports = { GroupStudent, initGroupStudent }