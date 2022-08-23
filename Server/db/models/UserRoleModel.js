// const UserModel = require("./UserModel");
// const RoleModel = require("./RoleModel");
// const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);

// module.exports = (sequelize, DataTypes) => {
//   return sequelize.define("user_role", {
//     // roleId: DataTypes.UUID,
//     // userId: DataTypes.UUID,
//     userId: {
//       type: DataTypes.UUID,
//       references:{
//         model: UserModel(sequelize, Sequelize),
//         key: 'userId',
//       },
//       primaryKey: true
//     },
//     roleId: {
//       type: DataTypes.UUID,
//       references:{
//         model: RoleModel(sequelize, Sequelize),
//         key: 'roleId',
//       },
//       primaryKey: true
//     }
//   });
// };

const { Sequelize, DataTypes } = require("sequelize");
const { POSTGRESQL_DEVELOPMENT_HOST } = require("../config/dbconfig");
const sequelize = new Sequelize(POSTGRESQL_DEVELOPMENT_HOST);
const { User } = require("./UserModel");
const { Role } = require("./RoleModel");

const UserRole = sequelize.define("user_role", {
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'userId',
        },
        primaryKey: true
    },
    roleId: {
        type: DataTypes.UUID,
        references: {
            model: Role,
            key: 'roleId',
        },
        primaryKey: true
    }
});
// User.hasMany(User, {as: 'user', foreignKey: 'userId'})
// UserRole.belongsTo(User);   
// Role.hasMany(Role, {as: 'role', foreignKey: 'roleId'})
// UserRole.belongsTo(Role);
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' });
User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });

const initUserRole = async () => {
    return UserRole.sync({ alter: true })
}

module.exports = { UserRole, initUserRole };
