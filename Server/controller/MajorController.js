const majorService = require('../service/MajorService');

//api: /api/Major/
class MajorController {

    //Thêm Major
    //POST: /add
    addMajor = async (req, res, next) => {
        const major = req.body;
        await majorService.addMajor(major)
            .then(data =>{
                if(data){
                    if(data !== "MAJOR DUPPLICATE")
                        return res.status(200).json("Thêm Major thành công");
                    return res.status(400).json("Lỗi. Trùng Major");
                }
                return res.status(400).json("Lỗi thêm Major");
            })
            .catch(err=>{
                return res.status(400).json(err);
                // next(err);
            })
    }

    getMajorByMajorId = async(req, res, next) =>{
        const majorId = req.params.majorId;
        await majorService.getMajorByMajorId(majorId)
            .then(data =>{
                if(data)
                    return res.status(200).json(data)
                return res.status(400).json("Không tìm thấy major");
            })
            .catch(err =>{
                return res.status(400).json(err);
            })
    }

    getAllMajor = async(req, res, next) =>{
        await majorService.getAllMajor()
            .then(data =>{
                return res.status(200).json(data)
            })
            .catch(err =>{
                return res.status(400).json(err);
            })
    }

}

module.exports = new MajorController();