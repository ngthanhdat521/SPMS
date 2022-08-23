const ListTaskService = require("../service/ListTaskService");

class ListTaskController{

    addListTask = async (req, res, next) =>{
        req.body.stageId = req.params.stageId?req.params.stageId:null;
        await ListTaskService.addListTask(req.body)
            .then(data =>{
                if(data === "NO STAGE")
                    return res.status(400).send("Không tìm thấy stage");
                else if(!data)
                    return res.status(400).send("Thêm task list thất bại");
                else  
                    return res.status(200).send(data);
            })  
            .catch(err => res.status(500).send(err.message));
    }

    updateListTask = async (req, res, next) =>{
        await ListTaskService.updateListTask(req.params.stageId,req.params.listTaskId,req.body)
            .then(data =>{
                if(data === "NO STAGE")
                    return res.status(400).send("Không tìm thấy stage");
                else if(data === "NO LIST TASK")
                    return res.status(400).send("Không tìm thấy list task");
                else if(!data)
                    return res.status(400).send("Cập nhật task list thất bại");
                else  
                    return res.status(200).send(data);
            })  
            .catch(err => res.status(500).send(err.message));
    }

    deleteTaskList = async (req, res, next) =>{
        await ListTaskService.deleteTaskList(req.params.stageId, req.params.listTaskId)
        .then(data =>{
            if(data === "NO STAGE")
                return res.status(400).send("Không tìm thấy stage");
            else if(!data)
                return res.status(400).send("Không tìm thấy task list");
            else
                return res.status(200).send(data);
        })
        .catch(err => res.status(500).send(err.message));
    }

    getAllTaskListOfStage = async (req, res, next) =>{
        await ListTaskService.getAllTaskListOfStage(req.params.stageId)
        .then(data =>{
            if(data === "NO STAGE")
                return res.status(400).send("Không tìm thấy stage");
            return res.status(200).send(data);
        })
        .catch(err => res.status(500).send(err.message));
    }
}
module.exports = new ListTaskController();