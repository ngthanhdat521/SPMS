const { Lecturer} = require("../db/models/LecturerModel");
const {Project} = require("../db/models/ProjectModel");
const {FileStorage} = require("../db/models/FileStorageModel");
const {ProjectFile} = require("../db/models/ProjectFileModel");
const {User} = require("../db/models/UserModel")
const userService = require("./UserService");
const checkObject = require('../utils/checkObject');
const userRoleService = require('./UserRoleService');
const roleService = require('./RoleService');
const {
    sendEmailUser,
    LectureMail
} = require('../helper/SendEmail');
var validator = require("email-validator");
const majorService = require("./MajorService");
const departmentService = require('./DepartmentService')
const bcrypt = require('bcryptjs');
const excelJS = require("exceljs");
const database = require("../db/postgresql/PostgreSQL");
const { deleteFile } = require('../helper/handleFile');


class LecturerService {

    //Thêm lecturer[mentor]
    addLecturer = async ({
        email,
        password
    }) => {
        //validate email
        if (validator.validate(email)) {

            //Tạo user
            //mã hóa password
            let userId;
            const userData = await userService.addUser({
                    email,
                    password: bcrypt.hashSync(password, 10)
                })
                .then(data => {
                    //kiểm tra user có phải là object 
                    if (checkObject(data)) {
                        userId = data.userId;
                    }
                });

            //Lấy roleId mentor
            let roleId;
            await roleService.getRoleByRoleName("mentor")
                .then(data => {
                    if (checkObject(data))
                        roleId = data.roleId;
                })

            if (userId && roleId) {
                //Tạo role mentor cho user trong bảng userRole
                await userRoleService.addUserRole({
                    userId,
                    roleId
                })

                const lecturerData = await Lecturer.findOrCreate({
                    where: {
                        userId
                    },
                    defaults: {
                        userId: userId
                    }
                })
                let check = lecturerData.find(lecturerEle => {
                    return typeof lecturerEle === 'boolean';
                })

                if (check) {
                    //gửi mail
                    await sendEmailUser({email, password}, LectureMail);
                    return {
                        user: userData,
                        lecturer: lecturerData[0]
                    }
                }
            }
            return "USERID DUPPLICATE";
        }
        return null;
    }

    //Cập nhật lecturer và user
    /*
    dataUpdate = {
        userId,
        firstName,
        lastName,
        email,
        phone,
        majorId,
        academicLevel
    } */
    updateLecturerAndUser = async (userId, dataUpdate) => {
        if (checkObject(dataUpdate)) {
            return await userService.getUserByUserId(userId)
                .then(async (data) => {
                    if (data) {
                        const userInfor = {
                            firstName: dataUpdate.firstName,
                            lastName: dataUpdate.lastName,
                            email: dataUpdate.email,
                            phone: dataUpdate.phone,
                            majorId: dataUpdate.majorId,
                        }
                        const lecturerInfor = {
                            academicLevel: dataUpdate.academicLevel
                        }
                        //update data user table
                        const updateUserData = await userService.updateUser(userInfor, { userId })
                        //update data lecturer table
                        const updateLecturerData = await Lecturer.update(lecturerInfor, { where: { userId } })
                        return {
                            user_row_updated: updateUserData[0],
                            lecture_row_updated: updateLecturerData[0]
                        }
                    }
                    return "USER NOT FOUND";
                });
        }
        return null;
    }

    //Danh sachs Lecturer
    getAllLecturer = async () => {
        return await Lecturer.findAll({ raw: true })
            .then(async dataList => {
                return await Promise.all(dataList.map(async data => {
                    return await this.getLecturerByUserId(data.userId, data);
                }))
            })
    }

    //Lấy thông tin một lecturer bằng userId
    //lecturer: biến phụ có thể có hoặc không
    getLecturerByUserId = async (userId, lecturer) => {
        const user = await userService.getUserByUserId(userId)
            .then(async userData => {
                let lecturerData;
                if (!lecturer)
                    lecturerData = await Lecturer.findOne({
                        where: {
                            userId
                        },
                        raw: true
                    })
                else
                    lecturerData = lecturer;
                return {
                    ...userData,
                    ...lecturerData,
                }
            }).then(async userData => {
                if (userData.majorId) {
                    return await majorService.getMajorByMajorId(userData.majorId)
                        .then(async major => {
                            delete userData.majorId;
                            delete major.createdAt;
                            delete major.updatedAt;
                            return {
                                ...userData,
                                // major
                                ...major
                            }
                        })
                        .then(async userData => {
                            if (userData.depId) {
                                const department = await departmentService.getDepartmentByDepId(userData.depId);
                                delete userData.depId;
                                delete department.createdAt;
                                delete department.updatedAt;
                                return {
                                    ...userData,
                                    // major: {
                                    //     ...userData.major,
                                    //     department
                                    // }
                                    ...department
                                }
                            }
                            return userData;
                        })
                }
                return userData;
            })
        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;
        return user;
    }

    exportFile = async () => {

        const workbook = new excelJS.Workbook(); // Create a new workbook
        const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
        const path = "./files"; // Path to download excel
        // Column for data in excel. key must match data key
        worksheet.columns = [{
                header: "S no.",
                key: "s_no",
                width: 10
            },
            {
                header: "First Name",
                key: "firstName",
                width: 10
            },
            {
                header: "Last Name",
                key: "lastName",
                width: 10
            },
            {
                header: "Email",
                key: "email",
                width: 10
            },
            {
                header: "Phone Number",
                key: "phone",
                width: 10
            },
            {
                header: "Academic Level",
                key: "academicLevel",
                width: 10
            },
            {
                header: "Department Code",
                key: "depCode",
                width: 10
            },
            {
                header: "Department",
                key: "depName",
                width: 10
            },
        ];
        let counter = 1;
        const lectures = await this.getAllLecturer();
        lectures.forEach((user) => {
            user.s_no = counter;
            worksheet.addRow(user); // Add data in worksheet
            counter++;
        });
        // Making first line in excel bold
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = {
                bold: true
            };
        });
        try {
            let url = `${path}/users.xlsx`;
            let fileName = "users.xlsx";
            let type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            database.FileStorage.create({
                fileName: fileName,
                type:type,
                path: url
            });
            let data = await workbook.xlsx.writeFile(`${path}/users.xlsx`);
            return data;
        } catch (err) {
            return "ERROR EXPORT FILE"
        }
    }

    getLecturerByLectureId = async(lecturerId) =>{
        return await Lecturer.findOne({
            where: {lecturerId},
            raw: true,
            attributes:[
                "lecturerId",
                "userId",
                "academicLevel"
            ]
        }).then( async data =>{
            if(data)
                data = {
                    ...data,
                    ...await User.findOne({
                    where:{
                        userId: data.userId,
                    },
                    raw: true,
                    attributes:[
                        "firstName",
                        "lastName",
                        "dateOfBirth",
                        "email",
                        "phone",
                        "majorId"
                    ]
                })}
            return data
        })
    }

    addTopicTemplate = async (topicTemplate) =>{
        return await Project.create({
            projectName: topicTemplate.projectName,
            projectDesc: topicTemplate.projectDesc,
            isApproved: "approved",
            lecturerId: topicTemplate.lecturerId,
            note: topicTemplate.note,
            leaderId:  null,
            startDate: null,
            endDate: null,
            groupId: null
        },{
            raw: true
        })
        .then(async data =>{
            if(data){
                data = data.get({plain: true});
                let fileIds = [];
                if(topicTemplate.files.length > 0){
                    console.log(data); 
                    const lecture = await Lecturer.findOne({
                        where: {lecturerId: data.lecturerId},
                        raw: true
                    })
                    
                    const fileMap = topicTemplate.files.map(file => {
                        return {
                            fileName: file.filename,
                            type: file.mimetype,
                            path: file.path,
                            userId: lecture.userId
                        }
                    })

                    // console.log(fileMap);
                    //lưu file vào file-store
                    fileIds = await FileStorage.bulkCreate(fileMap,{
                        raw: true,
                    }).then(fileStorageList =>{
                        return fileStorageList.map(fileStorage => {
                            fileStorage = fileStorage.get({plain: true})
                            return fileStorage.fileId;
                        })
                    }).then(async fileIds =>{
                        //lưu vào ProjectFile
                        if(fileIds){
                            const projectFileData = fileIds.map(fileId =>{
                                return{
                                    fileId,
                                    projectId: data.projectId
                                }
                            })
                            await ProjectFile.bulkCreate(projectFileData)
                                .then(data =>{
                                    console.log(data)
                                });
                        }
                        return fileIds;
                    })
                }
                data.fileIds = fileIds;
            }
            return data;
        })
    }

    //cập nhật topic template
    //kiểm tra topic template có tồn tại không
    //topicTemplate:{
    //      projectName:
    //      projectDesc:
    //      deleteFileIds:[mảng fileId],
    //      newFiles:[mảng file] 
    // }
    updateTopicTemplate = async (topicTemplate) =>{
        console.log(topicTemplate);
        //kiểm tra topic template của người dùng đó có tồn tại không 
        return await Project.findOne({
            where:{
                projectId: topicTemplate.projectId,
                lecturerId: topicTemplate.lecturerId
            },
            raw: true
        })
        .then(async project =>{
            if(project){
                //cập nhật project
                await Project.update({
                    projectName: topicTemplate.projectName,
                    projectDesc: topicTemplate.projectDesc,
                    isApproved: "approved",
                    lecturerId: topicTemplate.lecturerId,
                    note: topicTemplate.note,
                    leaderId:  null,
                    startDate: null,
                    endDate: null,
                    groupId: null
                },{
                    where: {
                        projectId: topicTemplate.projectId,
                        lecturerId: topicTemplate.lecturerId
                    },
                    raw: true
                })


                const userId = await Lecturer.findOne({
                    where: {
                        lecturerId: project.lecturerId
                    },
                    raw: true
                })
                .then(data => {
                    console.log(data)
                    return data?data.userId:null
                });
                
                if(userId){
                    //XOÁ FILE
                    // lọc file cần xoá (topicTemplate.deleteFiles)
                    if(topicTemplate.deleteFileIds && topicTemplate.deleteFileIds.length > 0){
                        //Tìm file bằng fileId và userId
                        ////Lấy userId của lectuerId
                        //tìm kiếm file
                        await FileStorage.findAll({
                            where:{
                                fileId: topicTemplate.deleteFileIds,
                                userId
                            }, raw: true
                        }).then(async filesData =>{
                            if(filesData){
                                //xoá dữ liệu file
                                await FileStorage.destroy({
                                    where:{
                                        fileId: topicTemplate.deleteFileIds,
                                        userId,
                                    }
                                }).then(count =>{
                                    //xoá file gôc
                                    console.log("count",count)
                                    if(count > 0){
                                        console.log("filesData",filesData);
                                        filesData.forEach(file =>{
                                            deleteFile(file.path)
                                        })
                                    }
                                })
                            }
                        })
                    }
                    // console.log("chay1");
                    //THÊM FILE
                    if(topicTemplate.newFiles && topicTemplate.newFiles.length > 0){
                        const fileMap = topicTemplate.newFiles.map(file => {
                            return {
                                fileName: file.filename,
                                type: file.mimetype,
                                path: file.path,
                                userId
                            }
                        })
                        // console.log(fileMap);
                        //lưu file vào file-storage
                        await FileStorage.bulkCreate(fileMap,{
                            raw: true,
                        }).then(fileStorageList =>{
                            return fileStorageList.map(fileStorage => {
                                fileStorage = fileStorage.get({plain: true})
                                return fileStorage.fileId;
                            })
                        }).then(async fileIds =>{
                            //lưu vào ProjectFile
                            if(fileIds && fileIds.length > 0){
                                const projectFileData = fileIds.map(fileId =>{
                                    return{
                                        fileId,
                                        projectId: project.projectId
                                    }
                                })
                                await ProjectFile.bulkCreate(projectFileData);
                            }
                            return fileIds;
                        })
                    }
                    // console.log("chay1");
                    return true;
                }
                return "NO USER-DATA";
            }
            return "NO PROJECT";
        })
    }
}

module.exports = new LecturerService();
