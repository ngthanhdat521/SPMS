const { Major } = require("../db/postgresql/PostgreSQL");


class MajorService {

    //Thêm major
    addMajor = async (major) => {
        const majorData = await Major.findOrCreate({
            where: {
                majorCode: major.majorCode,
            },
            raw: true,
            defaults: major
        })
        let check = majorData.find(majorEle => {
            return typeof majorEle === 'boolean';
        })
        return check ? majorData[0] : "MAJOR DUPPLICATE";
    }

    getMajorByMajorId = async (majorId) =>{
        return await Major.findOne({
            where:{
                majorId
            },
            raw: true
        })
    }
    getAllMajor = async () =>{
        return await Major.findAll({
            raw: true
        }).then(data =>{
            console.log(data);
            return data
        })
    }
}

module.exports = new MajorService();