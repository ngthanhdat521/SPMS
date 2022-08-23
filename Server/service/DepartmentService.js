const {Department} = require("../db/postgresql/PostgreSQL");


class DepartmentService {

    //Thêm major
    addDepartment = async (department) => {
        const depData = await Department.findOrCreate({
            where: {depCode: department.depCode,
            },
            raw: true,
            defaults: department
        })
        console.log(depData)
        let check =  depData.find(departmentEle =>{
            return typeof departmentEle === 'boolean';
        })
        return check?depData[0]:"DEPARTMENT DUPPLICATE";
    }

    getDepartmentByDepId = async (depId) =>{
        return await Department.findOne({
            where:{
                depId
            },
            raw: true
        })
    }
}

module.exports = new DepartmentService();