const GroupService = require("../service/GroupService");
const StudentService = require("../service/StudentService");


class GroupController {
    createGroup = async (req,res)=>{
        await GroupService.createGroup(req.body).then(data=>{
            if(data){
                return res.status(200).send("create group is success");
            }
            return res.status(400).send("something went wrong"); 
        }).catch(error=>{
            return res.status(500).send(error.message);
        })   
    }

    assignMentor = async (req,res)=>{
        await GroupService.assignMentor(req.body).then (data=>{
            if(data){
                return res.status(200).send("assign  group is success");
            }
            return res.status(400).send("something went wrong");
        }).catch(error=>{
            return res.status(500).send(error.message);
        }) 
    }

    getAllGroup = async (req,res)=>{
        await GroupService.getAllGroup().then (data=>{
            if(data){
                return res.status(200).send(data);
            }
            return res.status(400).send("something went wrong");
        }).catch(error=>{
            return res.status(500).send(error.message);
        }) 
    }

    getGroupByStudId = async (req,res)=>{
        await GroupService.getGroupByStudId(req.params.studId)
        .then(data=>{
            if(data){
                return res.status(200).send(data);
            }
            return  res.status(400).send("something went wrong");
        }).catch(error=>{
            return res.status(500).send(error.message);
        }) 
    }

    getGroupByLecturerId = async (req,res)=>{
        await GroupService.getGroupByLecturerId(req.params.lecturerId)
        .then(data=>{
            if(data){
                return res.status(200).send(data);
            }
            return  res.status(400).send("something went wrong");
        }).catch(error=>{
            return res.status(500).send(error.message);
        }) 
    }

    deleteGroup = async(req,res)=>{
        await GroupService.deleteGroup(req.params.groupId)
        .then(isDeleteGroup=>{
            if(isDeleteGroup){
                return res.status(200).send("Delete success");
            }
            return res.status(400).send("Somthing went wrong!");
        }).catch(err=>{
            return res.status(500).send(err.message);
        })
    }

    updateGroup = async(req,res)=>{
        console.log(req.body);
        await GroupService.updateGroup(req.body,req.params.groupId)
        .then(data=>{
            if(data){
                return res.status(200).send("update success");
            }
            return res.status(400).send("Somthing went wrong!");
        }).catch(err=>{
            return res.status(500).send(err.message);
        })
    }
}

module.exports = new GroupController;
