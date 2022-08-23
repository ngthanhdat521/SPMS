const { User, initUser } = require("../models/UserModel");
const { FileStorage, initFileStorage } = require("../models/FileStorageModel");
const { Major, initMajor } = require("../models/MajorModel");
const { Department, initDepartment } = require("../models/DepartmentModel");
const { UserRole, initUserRole } = require("../models/UserRoleModel");
const { Lecturer, initLecturer } = require("../models/LecturerModel");
const { Student, initStudent } = require("../models/StudentModel");
const { TaskAssignment, initTaskAssignment } = require("../models/TaskAssigmentModel");
const { Comment, initComment } = require("../models/CommentModel");
const { Group, initGroup } = require("../models/GroupModel");
const { Task, initTask } = require("../models/TaskModel");
const { CouncilMember, initCouncilMember } = require("../models/CouncilMemberModel");
const { Score, initScore } = require("../models/ScoreModel");
const { Stage, initStage } = require("../models/StageModel");
const { Project, initProject } = require("../models/ProjectModel");
const { Council, initCouncil } = require("../models/CouncilModel");
const { Role, initRole } = require("../models/RoleModel");
const { GroupLecturer, initGroupLecturer } = require("../models/GroupLecturerModel");
const { ListTask, initListTask } = require("../models/ListTaskModel");
const { Notification, initNotification } = require('../models/NotificationModel');
const { NotificationFile, initNotificationFile } = require('../models/NotificationFileModel');
const { ProjectFile, initProjectFile} = require("../models/ProjectFileModel");
const { EvaluateStage, initEvaluateStage } = require("../models/EvaluateStageModel");

const initAll = async () => {
    await initDepartment()
        .then(async () => {
            await initMajor();
            await initCouncil();
            await initRole();
        }).then(async () => {
            await initUser();
            await initFileStorage();
        })
        .then(async () => {
            await initNotification();
            await initUserRole();
        })
        .then(async () => {
            await initNotificationFile();
            await initLecturer();
            await initGroup();
            await initStudent();
        }).then(async () => {
            await initGroupLecturer();
            await initProject();
        }).then(async () => {
            await initProjectFile();
            await initStage();
        }).then(async () => {
            await initListTask();
        }).then(async () => {
            await initTask();
        }).then(async () => {
            await initTaskAssignment();
            await initComment();
            await initCouncilMember();
            await initScore();
            await initEvaluateStage();
        })
}


// initAll();

module.exports = {
    Department,
    Major,
    Council,
    Role,
    User,
    FileStorage,
    UserRole,
    Lecturer,
    Student,
    Group,
    GroupLecturer,
    Project,
    Stage,
    ProjectFile,
    ListTask,
    Task,
    TaskAssignment,
    Comment,
    CouncilMember,
    Score,
    Notification,
    NotificationFile, 
    EvaluateStage
};
