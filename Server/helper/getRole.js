const database = require("../db/postgresql/PostgreSQL");

module.exports = async (useId)=>{
    const roles = await database.UserRole.findAll({
        where: {
          userId: useId
        }
      });
      const roleUser = await Promise.all(roles.map(async element => {
        return await database.Role.findOne({
          where: {
            roleId: element.roleId
          }
        }).then(rl => {
          return rl.roleName;
        });
      }));
      console.log(roleUser);
      return roleUser;
}