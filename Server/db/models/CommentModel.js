const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const { Task } = require("./TaskModel");
const { User } = require("./UserModel");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);

const Comment = sequelize.define("comment", {
    commentId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'userId'
        },
        allowNull: false
    },
    taskId: {
        type: DataTypes.UUID,
        references: {
            model: Task,
            key: 'taskId'
        },
        allowNull: false
    },
});

User.belongsToMany(Task, { through: Comment, foreignKey: "userId" });
Task.belongsToMany(User, { through: Comment, foreignKey: "taskId" })

const initComment = async () => {
    return Comment.sync({ alert: true });
}
module.exports = { Comment, initComment };
