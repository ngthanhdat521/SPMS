const userService = require('../service/UserService');

//api: /api/user/
class UserController {

    //Thêm user (Test)
    //POST: /add
    addUser = async (req, res, next) => {
        const user = req.body;
        await userService.addUser(user)
            .then(data => {
                if (data) {
                    if (data !== "EMAIL DUPPLICATE")
                        return res.status(200).json(data);
                    return res.status(400).json("Lỗi. Trùng email đăng nhập");
                }
                return res.status(400).json("Lỗi thêm user");
            })
            .catch(err => {
                return res.status(400).json(err);
                // next(err);s
            })
    }

    //UpdateUser (Test)
    //POST: /update/:userId
    updateUser = async (req, res, next) => {
        const user = req.body;
        const conditionObj = {
            userId: req.params.userId
        }
        await userService.updateUser(user, conditionObj)
            .then(data => {
                if (data)
                    return res.status(200).send("Cập nhật user thành công.")
                return res.status(400).send("Không tìm thấy dữ liệu cần cập nhật.");
            })
            .catch(err => {
                return res.status(400).json(err);
            })
    }

    //Xóa user(account) 
    //POST: /delete/:userId
    removeUserById = async (req, res, next) => {
        const userId = req.params.userId
        await userService.removeUserById(userId)
            .then(data => {
                if (data)
                    return res.status(200).json(`Xóa ${data} thành công!`)
                return res.status(400).send("Không tìm thấy dữ liệu cần cập nhật.");
            })
            .catch(err => {
                return res.status(400).json(err);
            })
    }

    signin = async (req,res)=>{
        return await userService.signin(req.body)
        .then( data=>{
            data === "Invalid Password!"|| data ==="account Not found"?res.status(400).send("login fail"):res.status(200).send(data);
        }).catch(err=>{
            res.status(400).send(err)
        })
    }

    getAllUser = async (req, res)=>{
        return await userService.getAllUser()
        .then(data=>{
            if(data){
                res.status(200).send(data);
            }else res.status(400).send([]);
        }).catch(err=>{
            res.status(500).send(err.message);
        })
    }
}

module.exports = new UserController();