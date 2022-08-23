const roleService = require('../service/RoleService');

//api: /api/role/
class RoleController {

    //Thêm role
    //POST: /add
    addRole = async (req, res, next) => {
        const roleName = req.body.roleName.toLowerCase();
        await roleService.addRole(roleName)
            .then(data =>{
                if(data)
                    return res.status(200).json(data);
                return res.status(400).json("Lỗi thêm role");
            })
            .catch(err=>{
                return res.status(400).json(err);
                // next(err);
            })
    }

    //Lấy thông tin role theo roleName
    //GET: /:roleName/get
    getRoleByRoleName = async (req, res, next) => {
        const roleName = req.params.roleName;
        await roleService.getRoleByRoleName(roleName)
            .then(data =>{
                // if(data)
                //     return res.status(200).json(data);
                // return res.status(404).json("Không tìm thấy role");
                return res.status(200).json(data);
            })
            .catch(err=>{
                return res.status(400).json(err);
                // next(err);
            })
    }

    getAllRoleCouncil = async (req, res, next) =>{
        await roleService.getAllRoleCouncil()
            .then(data =>{
                return res.status(200).json(data);
            })
            .catch(err => res.status(500).json(err))
    }
}

module.exports = new RoleController();