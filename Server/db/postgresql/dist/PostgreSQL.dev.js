"use strict";

var _require = require("../models/UserModel"),
    User = _require.User,
    initUser = _require.initUser;

var _require2 = require("../models/FileStorageModel"),
    FileStorage = _require2.FileStorage,
    initFileStorage = _require2.initFileStorage;

var _require3 = require("../models/MajorModel"),
    Major = _require3.Major,
    initMajor = _require3.initMajor;

var _require4 = require("../models/DepartmentModel"),
    Department = _require4.Department,
    initDepartment = _require4.initDepartment;

var _require5 = require("../models/UserRoleModel"),
    UserRole = _require5.UserRole,
    initUserRole = _require5.initUserRole;

var _require6 = require("../models/LecturerModel"),
    Lecturer = _require6.Lecturer,
    initLecturer = _require6.initLecturer;

var _require7 = require("../models/StudentModel"),
    Student = _require7.Student,
    initStudent = _require7.initStudent;

var _require8 = require("../models/TaskAssigmentModel"),
    TaskAssignment = _require8.TaskAssignment,
    initTaskAssignment = _require8.initTaskAssignment;

var _require9 = require("../models/CommentModel"),
    Comment = _require9.Comment,
    initComment = _require9.initComment;

var _require10 = require("../models/GroupModel"),
    Group = _require10.Group,
    initGroup = _require10.initGroup;

var _require11 = require("../models/TaskModel"),
    Task = _require11.Task,
    initTask = _require11.initTask;

var _require12 = require("../models/CouncilMemberModel"),
    CouncilMember = _require12.CouncilMember,
    initCouncilMember = _require12.initCouncilMember;

var _require13 = require("../models/ScoreModel"),
    Score = _require13.Score,
    initScore = _require13.initScore;

var _require14 = require("../models/StageModel"),
    Stage = _require14.Stage,
    initStage = _require14.initStage;

var _require15 = require("../models/ProjectModel"),
    Project = _require15.Project,
    initProject = _require15.initProject;

var _require16 = require("../models/CouncilModel"),
    Council = _require16.Council,
    initCouncil = _require16.initCouncil;

var _require17 = require("../models/RoleModel"),
    Role = _require17.Role,
    initRole = _require17.initRole;

var _require18 = require("../models/GroupLecturerModel"),
    GroupLecturer = _require18.GroupLecturer,
    initGroupLecturer = _require18.initGroupLecturer;

var _require19 = require("../models/ListTaskModel"),
    ListTask = _require19.ListTask,
    initListTask = _require19.initListTask;

var _require20 = require('../models/NotificationModel'),
    Notification = _require20.Notification,
    initNotification = _require20.initNotification;

var _require21 = require('../models/NotificationFileModel'),
    NotificationFile = _require21.NotificationFile,
    initNotificationFile = _require21.initNotificationFile;

var _require22 = require("../models/ProjectFileModel"),
    ProjectFile = _require22.ProjectFile,
    initProjectFile = _require22.initProjectFile;

var initAll = function initAll() {
  return regeneratorRuntime.async(function initAll$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(initDepartment().then(function _callee() {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(initMajor());

                  case 2:
                    _context.next = 4;
                    return regeneratorRuntime.awrap(initCouncil());

                  case 4:
                    _context.next = 6;
                    return regeneratorRuntime.awrap(initRole());

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }).then(function _callee2() {
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return regeneratorRuntime.awrap(initUser());

                  case 2:
                    _context2.next = 4;
                    return regeneratorRuntime.awrap(initFileStorage());

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          }).then(function _callee3() {
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return regeneratorRuntime.awrap(initNotification());

                  case 2:
                    _context3.next = 4;
                    return regeneratorRuntime.awrap(initUserRole());

                  case 4:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          }).then(function _callee4() {
            return regeneratorRuntime.async(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return regeneratorRuntime.awrap(initNotificationFile());

                  case 2:
                    _context4.next = 4;
                    return regeneratorRuntime.awrap(initLecturer());

                  case 4:
                    _context4.next = 6;
                    return regeneratorRuntime.awrap(initGroup());

                  case 6:
                    _context4.next = 8;
                    return regeneratorRuntime.awrap(initStudent());

                  case 8:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          }).then(function _callee5() {
            return regeneratorRuntime.async(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return regeneratorRuntime.awrap(initGroupLecturer());

                  case 2:
                    _context5.next = 4;
                    return regeneratorRuntime.awrap(initProject());

                  case 4:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          }).then(function _callee6() {
            return regeneratorRuntime.async(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return regeneratorRuntime.awrap(initProjectFile());

                  case 2:
                    _context6.next = 4;
                    return regeneratorRuntime.awrap(initStage());

                  case 4:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          }).then(function _callee7() {
            return regeneratorRuntime.async(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return regeneratorRuntime.awrap(initListTask());

                  case 2:
                  case "end":
                    return _context7.stop();
                }
              }
            });
          }).then(function _callee8() {
            return regeneratorRuntime.async(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return regeneratorRuntime.awrap(initTask());

                  case 2:
                  case "end":
                    return _context8.stop();
                }
              }
            });
          }).then(function _callee9() {
            return regeneratorRuntime.async(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return regeneratorRuntime.awrap(initTaskAssignment());

                  case 2:
                    _context9.next = 4;
                    return regeneratorRuntime.awrap(initComment());

                  case 4:
                    _context9.next = 6;
                    return regeneratorRuntime.awrap(initCouncilMember());

                  case 6:
                    _context9.next = 8;
                    return regeneratorRuntime.awrap(initScore());

                  case 8:
                  case "end":
                    return _context9.stop();
                }
              }
            });
          }));

        case 2:
        case "end":
          return _context10.stop();
      }
    }
  });
}; // initAll();


module.exports = {
  Department: Department,
  Major: Major,
  Council: Council,
  Role: Role,
  User: User,
  FileStorage: FileStorage,
  UserRole: UserRole,
  Lecturer: Lecturer,
  Student: Student,
  Group: Group,
  GroupLecturer: GroupLecturer,
  Project: Project,
  Stage: Stage,
  ProjectFile: ProjectFile,
  ListTask: ListTask,
  Task: Task,
  TaskAssignment: TaskAssignment,
  Comment: Comment,
  CouncilMember: CouncilMember,
  Score: Score,
  Notification: Notification,
  NotificationFile: NotificationFile
};