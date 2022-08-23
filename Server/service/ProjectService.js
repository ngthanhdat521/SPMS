const { GroupLecturer } = require("../db/models/GroupLecturerModel");
const { Group } = require("../db/models/GroupModel");
const { Project } = require("../db/models/ProjectModel");
const { Student } = require("../db/models/StudentModel");
const { User } = require("../db/models/UserModel");
const lecturerService = require("./LecturerService");
const exceljs = require("exceljs");
const groupService = require("./GroupService");
const MajorService = require("./MajorService");
const DepartmentService = require("./DepartmentService");
const { FileStorage } = require("../db/models/FileStorageModel");
const { Op } = require("sequelize");
const { ProjectFile } = require("../db/models/ProjectFileModel");
const LecturerService = require("./LecturerService");
const FileStorageService = require("./FileStorageService");
const StageService = require("./StageService");
const EvaluateStageService = require("./EvaluateStageService");
const defineExcel = require("../helper/defineExcel");

class ProjectService {
    //cập nhật topic lúc chưa bắt đầu
    //Topic chưa bắt đầu thực hiện có 2 TH:
    //TH1: Topic chưa approved thì update vẫn bt.
    //TH2: Topic đã được approved nhưng update lại thì phải được approved lại. => isApproved = pending
    //VD TH2: nếu như topic khó tốt đã được approved. Bây giờ cập nhật lại topic dễ hơn nhưng vẫn approved thì không chính xác.
    updateProjectNoStart = async (projectId, project) => {
        project.isApproved = "pending";
        return await Project.findOne({ where: { projectId }, raw: true }).then(
            async (data) => {
                if (data) {
                    return await Project.update(project, {
                        where: {
                            projectId,
                        },
                    });
                }
                return false;
            }
        );
    };

    //chặn không cho cập nhật projectName, projectDesc,
    //isApproved = approved
    updateProjectStart = async (projectId, project) => {
        //kiểm tra có trường projectName hany projectDesc trong project object không
        //Nếu có. không cho phép cập nhật.
        //Nếu không. Cho phép cập nhật
        let checkHasFieldProjectNameOrProjectDesc = false;
        checkHasFieldProjectNameOrProjectDesc = Object.keys(project).find(
            (key) => {
                return ["projectName", "projectDesc"].includes(key);
            }
        )
            ? true
            : false;
        if (!checkHasFieldProjectNameOrProjectDesc) {
            // // trường hợp người ta thay đổi thì nên set mặc định
            // project.isApproved = "approved";
            return await Project.findOne({
                where: { projectId },
                raw: true,
            }).then(async (data) => {
                if (data) {
                    //kiểm tra thử project đã được approved chưa
                    if (data.isApproved === "approved")
                        return await Project.update(project, {
                            where: {
                                projectId,
                            },
                        });
                    return "NO APPROVED";
                }
                return false;
            });
        }
        return "NOT ALLOWED";
    };

    //cho student
    getAllProjectByTypeCapstone = async (typeCapstone) => {
        return await Group.findAll({
            where: { typeCapstone },
            raw: true,
            order: [["groupName", "ASC"]],
        }).then(async (arr) => {
            if (arr) {
                return await Promise.all(
                    arr.map(async (group) => {
                        delete group.createdAt;
                        delete group.updatedAt;
                        const project = await Project.findOne({
                            where: {
                                groupId: group.groupId,
                                lecturerId: null,
                            },
                            raw: true,
                        });
                        if (project) {
                            delete project.groupId;
                            delete project.startDate;
                            delete project.endDate;

                            const leaderData = await Student.findOne({
                                where: {
                                    stuId: project.leaderId,
                                },
                                attributes: [
                                    "stuId",
                                    "stuCode",
                                    "gpa",
                                    "note",
                                    "typeCapstone",
                                    "class",
                                    "userId",
                                ],
                                raw: true,
                            }).then(async (data) => {
                                const userLeader = await User.findOne({
                                    where: {
                                        userId: data.userId,
                                    },
                                    raw: true,
                                    attributes: [
                                        "userId",
                                        "firstName",
                                        "lastName",
                                        "email",
                                        "phone",
                                    ],
                                });
                                return { ...data, ...userLeader };
                            });
                            let members = await Student.findAll({
                                where: { groupId: group.groupId },
                                order: [["gpa", "DESC"]],
                                attributes: [
                                    "stuId",
                                    "stuCode",
                                    "gpa",
                                    "note",
                                    "typeCapstone",
                                    "class",
                                    "userId",
                                ],
                                raw: true,
                            });
                            members = members.filter(
                                (stu) => stu.stuCode != leaderData.stuCode
                            );
                            const membersData = await Promise.all(
                                members.map(async (member) => {
                                    const memberData = await User.findOne({
                                        where: {
                                            userId: member.userId,
                                        },
                                        raw: true,
                                        attributes: [
                                            "userId",
                                            "firstName",
                                            "lastName",
                                            "email",
                                            "phone",
                                        ],
                                    });
                                    return { ...member, ...memberData };
                                })
                            );
                            delete project.leaderId;
                            project.leader = leaderData;
                            project.members = membersData;
                        }
                        const mentorsGroup = await GroupLecturer.findAll({
                            where: {
                                groupId: group.groupId,
                            },
                            attributes: ["lecturerId"],
                            raw: true,
                        });
                        const mentorsData = await Promise.all(
                            mentorsGroup.map(async (mentor) => {
                                return await lecturerService.getLecturerByLectureId(
                                    mentor.lecturerId
                                );
                            })
                        );
                        group.mentor = mentorsData;
                        group.project = project;
                        return group;
                    })
                );
            }
            return arr;
        });
    };

    rejectTopic = async (projectId) => {
        return await Project.findOne({
            where: {
                projectId,
            },
            raw: true,
        }).then(async (data) => {
            if (data) {
                await Project.update(
                    { isApproved: "reject" },
                    {
                        where: {
                            projectId,
                        },
                    }
                );
                return true;
            }
            return false;
        });
    };

    approvedTopic = async (projectId) => {
        return await Project.findOne({
            where: {
                projectId,
            },
            raw: true,
        }).then(async (data) => {
            if (data) {
                await Project.update(
                    { isApproved: "approved" },
                    {
                        where: {
                            projectId,
                        },
                    }
                );
                return true;
            }
            return false;
        });
    };

    cancelTopic = async (projectId) => {
        return await Project.findOne({
            where: {
                projectId,
            },
            raw: true,
        }).then(async (data) => {
            if (data) {
                await Project.update(
                    { isApproved: "pending" },
                    {
                        where: {
                            projectId,
                        },
                    }
                );
                return true;
            }
            return false;
        });
    };

    deleteTopic = async (projectId) => {
        return await Project.findOne({
            where: {
                projectId,
            },
            raw: true,
        }).then(async (data) => {
            if (data) {
                const countDelete = await Project.destroy({
                    where: {
                        projectId,
                    },
                });
                if (countDelete > 0) return true;
            }
            return false;
        });
    };

    exportProjectListExcelFile = async () => {
        const megerCellsArray = ['F', 'G', 'H','I'];
        const cellsArray = ['A','B','C','D','E','F','G','H',"I"];
        const workbook = new exceljs.Workbook();
        const capstone1_worksheet = workbook.addWorksheet("Capstone 1");
        const capstone2_worksheet = workbook.addWorksheet("Capstone 2");
        const path = "./files";

        const columnsWorksheet = [
            {
                header: "No.",
                key: "count",
                width: 5,
                style: defineExcel.styleColums,
            },
            {
                header: "Student Code",
                key: "stuCode",
                width: 15,
                style: defineExcel.styleColums,
            },
            {
                header: "First name",
                key: "firstName",
                width: 20,
                style: defineExcel.styleColums,
            },
            {
                header: "Last name",
                key: "lastName",
                width: 15,
                style: defineExcel.styleColums,
            },
            {
                header: "Class",
                key: "class",
                width: 15,
                style: defineExcel.styleColums,
            },
            {
                header: "Group",
                key: "groupName",
                width: 10,
                style: defineExcel.styleColums,
            },
            {
                header: "Mentor",
                key: "mentor",
                width: 30,
                style: defineExcel.styleColums,
            },
            {
                header: "Topic",
                key: "projectName",
                width: 50,
                style: defineExcel.styleColums,
            },
            {
                header: "Description",
                key: "projectDesc",
                width: 75,
                style: defineExcel.styleColums,
            },
        ];

        capstone1_worksheet.columns = columnsWorksheet;
        capstone2_worksheet.columns = columnsWorksheet;
        for (const col of cellsArray) {
            capstone1_worksheet.getCell(`${col}1`).font= defineExcel.header.font;
            capstone1_worksheet.getCell(`${col}1`).border= defineExcel.header.border;
            capstone1_worksheet.getCell(`${col}1`).alignment= defineExcel.header.alignment;
            
            capstone2_worksheet.getCell(`${col}1`).font= defineExcel.header.font;
            capstone2_worksheet.getCell(`${col}1`).border= defineExcel.header.border;
            capstone2_worksheet.getCell(`${col}1`).alignment= defineExcel.header.alignment;
        }

        //add row capstone1
        let counter = 1;
        await this.getAllProjectByTypeCapstone(1)
            .then(async (getAllProjectByTypeCapstone1) => {
                // let rowDataCapstone1 = [];
                for (const projectByType1 of getAllProjectByTypeCapstone1) {
                    //lặp qua từng row sinh vien trong group
                    await groupService
                        .getMembersGroup(projectByType1.groupId)
                        .then(async (membersGroup) => {
                            //lặp qua từng member để add voà mang rowDataCapstone1
                            //đếm row để merge
                            let countRowMerge = 0;
                            for (const member of membersGroup) {
                                countRowMerge++;
                                const major =
                                    await MajorService.getMajorByMajorId(
                                        member.majorId
                                    );
                                const department =
                                    await DepartmentService.getDepartmentByDepId(
                                        major.depId
                                    );
                                const merge = {
                                    count: counter,
                                    stuCode: member.stuCode,
                                    firstName: member.firstName,
                                    lastName: member.lastName,
                                    class: `${department.depCode}-${major.majorCode}`,
                                    groupName: projectByType1.groupName,
                                    mentor: projectByType1.mentor.map(obj =>{
                                        return `${obj.firstName} ${obj.lastName}`
                                    }).toString(),
                                    projectName: projectByType1.project
                                        ? projectByType1.project.projectName
                                        : " ",
                                    projectDesc: projectByType1.project
                                        ? projectByType1.project.projectDesc
                                        : " ",
                                }
                                // rowDataCapstone1.push(merge);
                                counter++;

                                //đổi style từng ô
                                capstone1_worksheet.addRow(merge);
                                for (const col of cellsArray) {
                                    capstone1_worksheet.getCell(`${col}${counter}`).border= defineExcel.header.border;
                                }
                            }
                            //merge nhiều ô thành 1 ô
                            if(countRowMerge > 1){
                                for (const col of megerCellsArray) {
                                    capstone1_worksheet.mergeCells(`${col}${counter - countRowMerge + 1}`, `${col}${counter}`);
                                    capstone1_worksheet.getCell(`${col}${counter - countRowMerge + 1}:${col}${counter}`).alignment={
                                        horizontal: 'left',
                                        vertical:'middle',
                                        wrapText: true
                                    }
                                }
                            }
                        });
                }
                // return rowDataCapstone1;
                counter = 1;
            })
            // .then((data) => {
            //     counter = 1;
            //     // capstone1_worksheet.addRows(data);
            // });

        //add row capstone2
        await this.getAllProjectByTypeCapstone(2)
            .then(async (getAllProjectByTypeCapstone2) => {
                console.log(counter);
                // let rowDataCapstone2 = [];
                for (const projectByType2 of getAllProjectByTypeCapstone2) {
                    //lặp qua từng row sinh vien trong group
                    await groupService
                        .getMembersGroup(projectByType2.groupId)
                        .then(async (membersGroup) => {
                            //lặp qua từng member để add voà mang rowDataCapstone2
                            let countRowMerge = 0;
                            for (const member of membersGroup) {
                                countRowMerge++;
                                const major =
                                    await MajorService.getMajorByMajorId(
                                        member.majorId
                                    );
                                const department =
                                    await DepartmentService.getDepartmentByDepId(
                                        major.depId
                                    );
                                const merge = {
                                    count: counter,
                                    stuCode: member.stuCode,
                                    firstName: member.firstName,
                                    lastName: member.lastName,
                                    class: `${department.depCode}-${major.majorCode}`,
                                    groupName: projectByType2.groupName,
                                    mentor: projectByType2.mentor.map(obj =>{
                                        return `${obj.firstName} ${obj.lastName}`
                                    }).toString(),
                                    projectName: projectByType2.project
                                        ? projectByType2.project.projectName
                                        : " ",
                                    projectDesc: projectByType2.project
                                        ? projectByType2.project.projectDesc
                                        : " ",
                                };
                                // rowDataCapstone2.push(merge);
                                counter++;

                                //đổi style từng ô
                                capstone2_worksheet.addRow(merge);
                                for (const col of cellsArray) {
                                    capstone2_worksheet.getCell(`${col}${counter}`).border= defineExcel.header.border;
                                }
                            }
                            //merge nhiều ô thành 1 ô
                            if(countRowMerge > 1){
                                for (const col of megerCellsArray) {
                                    capstone2_worksheet.mergeCells(`${col}${counter - countRowMerge + 1}`, `${col}${counter}`);
                                    capstone2_worksheet.getCell(`${col}${counter - countRowMerge + 1}:${col}${counter}`).alignment={
                                        horizontal: 'left',
                                        vertical:'middle',
                                        wrapText: true
                                    }
                                }
                            }
                        });
                }
                counter = 1;
                // return rowDataCapstone2;
            })
            // .then((data) => {
            //     counter = 1;
            //     // capstone2_worksheet.addRows(data);
            // });

        try {
            let url = `${path}/Danh_sach_de_tai_cac_nhom.xlsx`;
            let fileName = "Danh_sach_de_tai_cac_nhom.xlsx";
            let type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            const fileId = await FileStorage.findOrCreate({
                where:{
                    fileName: fileName,
                    type:type,
                    path: url
                },
                defaults: {
                    fileName: fileName,
                    type:type,
                    path: url
                }
            })
            .then(data =>{  
                data = data[0].get({plain: true})
                return data.fileId;
            });
            let data = await workbook.xlsx.writeFile(`${path}/Danh_sach_de_tai_cac_nhom.xlsx`);
            return fileId;
        } catch (err) {
            return "ERROR EXPORT FILE";
        }
    };

    getTopicTemplateDetail = async (projectId) => {
        return await Project.findOne({
            where: {
                projectId,
                lecturerId: {
                    [Op.not]: null,
                },
            },
            raw: true,
            attributes: [
                "projectId",
                "projectName",
                "projectDesc",
                "note",
                "lecturerId",
                "createdAt",
                "updatedAt",
            ],
        }).then(async (data) => {
            if (data) {
                const lecturerData =
                    await LecturerService.getLecturerByLectureId(
                        data.lecturerId
                    );
                const files = await ProjectFile.findAll({
                    where: {
                        projectId,
                    },
                    raw: true,
                }).then(async (datas) => {
                    if (datas.length > 0) {
                        datas = await Promise.all(
                            datas.map(async (file) => {
                                return await FileStorage.findOne({
                                    where: {
                                        fileId: file.fileId,
                                    },
                                    raw: true,
                                });
                            })
                        );
                    }
                    return datas;
                });
                delete data.lecturerId;
                data.lecturer = lecturerData;
                data.files = files;
            }
            return data;
        });
    };

    getAllTopicTemplate = async () => {
        return await Project.findAll({
            where: {
                lecturerId: {
                    [Op.not]: null,
                },
            },
        }).then(async (datas) => {
            if (datas.length > 0) {
                datas = await Promise.all(
                    datas.map(async (data) => {
                        return this.getTopicTemplateDetail(data.projectId);
                    })
                );
            }
            return datas;
        });
    };

    deleteTopicTemplate = async (lecturerId, projectId) => {
        return await Project.findOne({
            where: {
                projectId,
                lecturerId,
            },
            raw: true,
        }).then(async (project) => {
            if (project) {
                //xoá file gốc
                await ProjectFile.findAll({
                    where: {
                        projectId: project.projectId,
                    },
                    raw: true,
                }).then(async (projectFiles) => {
                    const fileIds =
                        projectFiles.length > 0
                            ? projectFiles.map(
                                  (projectFile) => projectFile.fileId
                              )
                            : [];
                    if (fileIds.length > 0)
                        await FileStorageService.deleteFilesByFileIds(fileIds);
                });

                //xoá data project
                const countDelete = await Project.destroy({
                    where: {
                        projectId,
                        lecturerId,
                    },
                });
                return countDelete > 0 ? true : false;
            }
            return null;
        });
    };

    getProjectDetailByProjectId = async (projectId) =>{
        return await Project.findOne({
            where:{
                projectId,
                // lecturer: null,
                // groupId: {
                //     [Op.not]: null,
                // },
                // isApproved: "approved"
            },
            raw: true
        }).then(async project =>{
            
            if(project){
                const projectData = {
                    projectId: project.projectId,
                    projectName: project.projectName,
                    projectDesc: project.projectDesc,
                    starDate: project.startDate,
                    endDate: project.endDate,
                    note: project.note,
                }
                
                let leaderData =null;
                let membersData = [];
                let mentorsData = [];
                if(project.groupId){
                    //get mảng mentor
                    const mentorsGroup = await GroupLecturer.findAll({
                        where: {
                            groupId: project.groupId,
                        },
                        attributes: ["lecturerId"],
                        raw: true,
                    });
                    mentorsData = await Promise.all(
                        mentorsGroup.map(async (mentor) => {
                            return await lecturerService.getLecturerByLectureId(
                                mentor.lecturerId
                            );
                        })
                    );

                    //get leader
                    leaderData = await Student.findOne({
                        where: {
                            stuId: project.leaderId,
                        },
                        attributes: [
                            "stuId",
                            "stuCode",
                            "gpa",
                            "note",
                            "typeCapstone",
                            "class",
                            "userId",
                        ],
                        raw: true,
                    }).then(async (data) => {
                        const userLeader = await User.findOne({
                            where: {
                                userId: data.userId,
                            },
                            raw: true,
                            attributes: [
                                "userId",
                                "firstName",
                                "lastName",
                                "email",
                                "phone",
                            ],
                        });
                        return { ...data, ...userLeader };
                    });

                    //get mảng members
                    let members = await Student.findAll({
                        where: { groupId: project.groupId },
                        order: [["gpa", "DESC"]],
                        attributes: [
                            "stuId",
                            "stuCode",
                            "gpa",
                            "note",
                            "typeCapstone",
                            "class",
                            "userId",
                        ],
                        raw: true,
                    });
                    members = members.filter(
                        (stu) => stu.stuCode != leaderData.stuCode
                    );
                    membersData = await Promise.all(
                        members.map(async (member) => {
                            const memberData = await User.findOne({
                                where: {
                                    userId: member.userId,
                                },
                                raw: true,
                                attributes: [
                                    "userId",
                                    "firstName",
                                    "lastName",
                                    "email",
                                    "phone",
                                ],
                            });
                            return { ...member, ...memberData };
                        })
                    );
                }
                else{
                    mentorsData = await lecturerService.getLecturerByLectureId(project.lecturerId);
                }
                //get all stages
                const stagesData = await StageService.getAllStageOfProject(project.projectId)
                    .then(async datas =>{
                        if(datas && datas.length > 0){
                            datas = await Promise.all(datas.map(async stage =>{
                                return await EvaluateStageService.getEvaluateOfStageDetail(stage.stageId);
                            }))
                        }
                        return datas;
                    })

                projectData.mentor = mentorsData;
                projectData.leader = leaderData;
                projectData.member = membersData;
                projectData.stages = stagesData;
                project = projectData;
            }
            return project;
        })
    }
}

module.exports = new ProjectService();
