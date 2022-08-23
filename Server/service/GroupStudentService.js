const {GroupStudent} = require("../db/models/GroupStudentModel");

class GroupStudentService{
    getGroupIdByStuId = async (stuId) =>{
        return await GroupStudent.findAll(
            {
                where:{stuId},
                raw: true
            })
            .then(data => data.map(d => d.groupId))
    }
}

module.exports = new GroupStudentService();