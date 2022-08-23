const TaskAssignmentService = require("../service/TaskAssignmentService");

class TaskAssignmentController{
    //TEST
    assignMembers = async (req, res, next) =>{
        await TaskAssignmentService.assignMembers(req.params.listTaskId, req.params.taskId, req.body.studentIds)
        .then(data => {
            if(data ==="NO TASK")
                return res.status(400).send("Không tìm thấy task để gán member")
            else if(data ==="NO MEMBERS")
                return res.status(400).send("Không có member để gán")
            else if(!data)
                return res.status(400).send("Lỗi gán member")
            return res.status(200).send(data);
        })
        .catch(err => res.status(500).send(err.message))
    }
    
}
module.exports = new TaskAssignmentController();