
const { User } = require("../db/postgresql/PostgreSQL");
const database = require("../db/postgresql/PostgreSQL");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
var bcrypt = require("bcryptjs");

class UserService {

    //Thêm user
    addUser = async (user) => {
        const userdata = await User.findOrCreate({
            where: { email: user.email },
            defaults: user,
            raw: true
        })
        let check = userdata.find(userEle => {
            return typeof userEle === 'boolean';
        })
        return check ? userdata[0] : "EMAIL DUPPLICATE";
    }

    //Cập nhật user
    //- update email, passwword
    //- update thông tin bảng user
    updateUser = async (user, conditionObj) => {
        return await User.update(user, { where: conditionObj })
    }

    //Lấy user theo userId
    getUserByUserId = async (userId) => {
        return await User.findOne({ where: { userId: userId }, raw: true });
    }

    //getAllUser

    getAllUser = async ()=>{
      return await User.findAll({raw: true})
      .then(async datas=>{
        return await Promise.all(datas.map(async student=>{
            const roles = await database.UserRole.findAll({
                where: {userId: student.userId}
            });
            const roleUser =await Promise.all(roles.map(async element => {
                return await database.Role.findOne({
                    where: {roleId: element.roleId}
                }).then( rl=>{
                  return  rl.roleName;
                });
            }));
            const department = await database.Major.findOne({
                where: {majorId: student.majorId},
            }).then(async major=>{
                console.log(major.depId);
                let dep = await database.Department.findOne({
                    where: {depId: major.depId}
                });
                return dep.depName;
            } );
            delete student.password;
            return {...student, department, roleUser};
        }))
      })
    }

    //Xóa user theo user Id
    removeUserById = async (userId) => {
        return await User.destroy({ where: { userId: userId } })
            .then(data => {
                return data;
            });
    }

    signin = async (account) => {
        return database.User.findOne({
            where: {
              email: account.email
            }
          })
          .then( async (user) => {
            if (!user) {
              return "account Not found"
            }
            var passwordIsValid = bcrypt.compareSync(
                account.password,
              user.password
            );
            console.log(passwordIsValid);


            // var passwordIsValid = account.password === user.password?true:false;
            if (!passwordIsValid) {
                return "Invalid Password!"
            }
            const token = jwt.sign({
              id: user.userId
            }, process.env.jwtsecret, {
              expiresIn: config.jwtExpiration // 24 hours
            });
            const roles = await database.UserRole.findAll({
                where: {userId: user.userId}
            });
            const roleUser =await Promise.all(roles.map(async element => {
                return await database.Role.findOne({
                    where: {roleId: element.roleId}
                }).then( rl=>{
                  return  rl.roleName;
                });
            }));
            return {...user.toJSON(), token, roleUser};
          });
      };
}

module.exports = new UserService();