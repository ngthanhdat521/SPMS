const departmentService = require('../service/DepartmentService');

//api: /api/department/
class DepartmentController {

    //Thêm department
    //POST: /add
    addDepartment = async (req, res, next) => {
        const dep = req.body;
        await departmentService.addDepartment(dep)
            .then(data =>{
                if(data){
                    if(data !== "DEPARTMENT DUPPLICATE")
                        return res.status(200).json("Thêm department thành công");
                    return res.status(400).json("Lỗi. Trùng department");
                }
                return res.status(400).json("Lỗi thêm department");
            })
            .catch(err=>{
                return res.status(400).json(err);
                // next(err);
            }) 
    }


    getDepartmentByDepId = async(req, res, next) =>{
        const depId = req.params.depId;
        await departmentService.getDepartmentByDepId(depId)
            .then(data =>{
                if(data)
                    return res.status(200).json(data)
                return res.status(400).json("Không tìm thấy depaartment");
            })
            .catch(err =>{
                return res.status(400).json(err);
            })
    }

}

module.exports = new DepartmentController();