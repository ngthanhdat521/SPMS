const taskService = require("../service/TaskService");

class TaskController{

    addTask = async (req, res, next) =>{
        const task = {
            listTaskId: req.params.listTaskId,
            taskName: req.body.taskName? req.body.taskName: null,
            taskDesc: req.body.taskDesc? req.body.taskDesc: null,
            startDate: req.body.startDate? req.body.startDate: null,
            endDate: req.body.endDate? req.body.endDate: null
        }
        // console.log(task)
        const studentIds = req.body.studentIds?req.body.studentIds:null;
        await taskService.addTask(req.params.stageId, req.params.listTaskId, task, studentIds)
            .then(data =>{
                if(data === "NO TASK LIST")
                    return res.status(400).send("Không tìm thấy taskList");
                else 
                    return res.status(200).send(data);
            })
            .catch(err => res.status(500).send(err.message));   
    }

    updateTask = async (req, res, next) =>{
        const task = {};
        // if("listTaskId" in req.body && req.body.listTaskId) 
        //     task.listTaskId = req.body.listTaskId;
        if("taskName" in req.body && req.body.taskName) 
            task.taskName = req.body.taskName;
        if("taskDesc" in req.body && req.body.taskDesc) 
            task.taskDesc = req.body.taskDesc;
        if("startDate" in req.body && req.body.startDate) 
            task.startDate = req.body.startDate;
        if("endDate" in req.body && req.body.endDate) 
            task.endDate = req.body.endDate;
        if("studentIds" in req.body && req.body.studentIds && req.body.studentIds.length > 0) 
            task.studentIds = req.body.studentIds;
        if("deleteStudentIds" in req.body && req.body.deleteStudentIds && req.body.deleteStudentIds.length > 0) 
            task.deleteStudentIds = req.body.deleteStudentIds;
        // // console.log(task)
        await taskService.updateTask(req.params.stageId, req.params.listTaskId, req.params.taskId, task)
        .then(data =>{
            if(data === "NO TASK LIST")
                return res.status(400).send("Không tìm thấy taskList");
            else 
                return res.status(200).send(data);
        })
        .catch(err => res.status(500).send(err.message));   
    }

    moveTaskToListTaskOther = async (req, res, next) =>{
        await taskService.moveTaskToListTaskOther(req.params.stageId, req.params.listTaskId, req.params.taskId, req.body.listTaskId)
            .then(data =>{
                if(data === "NO TASK LIST OR TASK")
                    return res.status(400).send("Không tìm thấy taskList hoặc task");
                else if(data === "DUPLICATE TASK LIST")
                    return res.status(400).send("Trùng id taskList cũ và mới");
                else 
                    return res.status(200).send("Di chuyển sang taskList mới thành công");
            })
        .catch(err => res.status(500).send(err.message));   
    }

    deleteTask = async (req, res, next) =>{
        await taskService.deleteTask(req.params.stageId, req.params.listTaskId, req.params.taskId)
            .then(data =>{
                if(data === "NO TASK LIST OR TASK")
                    return res.status(400).send("Không tìm thấy taskList hoặc task");
                else if(!data )
                    return res.status(400).send("Lỗi xoá task");
                else 
                    return res.status(200).send(data);
            })
        .catch(err => res.status(500).send(err.message));   
    }
    
    getAllTaskOfTaskList = async (req, res, next) =>{
        await taskService.getAllTaskOfTaskList(req.params.stageId, req.params.listTaskId)
            .then(data =>{
                if(data === "NO TASK LIST")
                    return res.status(400).send("Không tìm thấy taskList");
                return res.status(200).send(data);
            })
            .catch(err => res.status(500).send(err.message));   
    }

    getTaskDetailOfTaskList = async (req, res, next) =>{
        await taskService.getTaskDetailOfTaskList(req.params.stageId, req.params.listTaskId, req.params.taskId)
            .then(data =>{
                if(data === "NO TASK LIST")
                    return res.status(400).send("Không tìm thấy taskList");
                else if(!data)
                    return res.status(400).send("Không tìm thấy task trong task list");
                else
                    return res.status(200).send(data);
            })
        .   catch(err => res.status(500).send(err.message));   
    }
}
module.exports = new TaskController();