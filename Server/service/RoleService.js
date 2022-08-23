const {Role} = require("../db/postgresql/PostgreSQL");
const {Op} = require("sequelize")

class RoleService {

    //Thêm role
    addRole = async (roleName) => {
        const roleMentor = await Role.create({roleName: roleName.trim()})
        return roleMentor;
    }

    //Lấy thông tin role theo rolName
    getRoleByRoleName = async (roleName) =>{
        const role = await Role.findOne({
            where:{
                roleName
            }, raw: true
        })
        // console.log(role);
        return role;
    }

    getAllRoleCouncil = async () =>{
        return await Role.findAll({
            where:{
                roleName: {
                    [Op.in]:   ["reviewer", "president", "assistant"]
                }
            },
            attributes:[
                "roleId",
                "roleName"
            ]
            , raw: true
        }).then(data =>  data);
    }

    getLecturerRoleInCouncilDetail = async (roleId) =>{
        return await Role.findOne({
            where:{
                roleId
            }, 
            raw: true,
        }).then(data => data);
    }
}

module.exports = new RoleService();