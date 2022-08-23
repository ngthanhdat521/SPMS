const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);
const { Major } = require('./MajorModel')

const User = sequelize.define("user", {
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    lastName: DataTypes.STRING(20),
    firstName: DataTypes.STRING(15),
    dateOfBirth: DataTypes.DATE,
    email: {
        type: DataTypes.STRING(30),
        unique: true,
        // allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        // allowNull: false
    },
    phone: DataTypes.STRING(11),
    majorId: {
        type: DataTypes.UUID,
        references: {
            model: Major,
            key: 'majorId'
        },
    },
})

Major.hasMany(User, {
    foreignKey: 'majorId',
});

const initUser = async () => {
    return User.sync({ alter: true })
}
module.exports = { User, initUser };

// module.exports = (sequelize, DataTypes) => {
//   return sequelize.define("user", {
//     userId: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//       allowNull: false,
//     },
//     lastName: DataTypes.STRING(20),
//     firstName: DataTypes.STRING(15),
//     email: {
//       type: DataTypes.STRING(30),
//       unique: true,
//       allowNull: false
//     },
//     password: {
//       type: DataTypes.STRING(30),
//       allowNull: false
//     },
//     phone: DataTypes.STRING(11),
//     majorId: DataTypes.UUID,
//   });
// };

