const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const { Student } = require("./StudentModel");
const { Task } = require("./TaskModel");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);

const TaskAssignment = sequelize.define("task_assignment", {
    stuId: {
        type: DataTypes.UUID,
        references: {
            model: Student,
            key: 'stuId'
        },
        primaryKey: true,
    },
    taskId: {
        type: DataTypes.UUID,
        references: {
            model: Task,
            key: "taskId"
        },
        primaryKey: true,
    },
    // status: DataTypes.BOOLEAN,
    // note: DataTypes.TEXT,
});

Student.belongsToMany(Task, { through: TaskAssignment, foreignKey: "stuId" })
Task.belongsToMany(Student, { through: TaskAssignment, foreignKey: "taskId" })

const initTaskAssignment = async () => {
    return TaskAssignment.sync({ alter: true });
}

module.exports = { TaskAssignment, initTaskAssignment }
