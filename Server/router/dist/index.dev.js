"use strict";

var roleAPI = require('./api/roleAPI');

var userAPI = require('./api/userAPI');

var user_roleAPI = require('./api/user_roleAPI');

var lecturerAPI = require('./api/lecturerAPI');

var departmentAPI = require('./api/departmentAPI');

var majorAPI = require('./api/majorAPI');

var studentAPI = require('./api/studentAPI');

var fileStorageAPI = require('./api/fileStorageAPI');

var notificationAPI = require('./api/notificationAPI');

var groupAPI = require('./api/groupAPI');

var projectAPI = require('./api/projectAPI');

var sampleDocumentAPI = require('./api/sampleDocumentAPI');

var stageAPI = require('./api/stageAPI');

var listTaskAPI = require('./api/listTaskAPI');

var taskAPI = require('./api/taskAPI');

var taskAssignmentAPI = require('./api/taskAssignmentAPI');

var defenseAPI = require('./api/defenseAPI');

function router(server) {
  server.use('/api/role/', roleAPI);
  server.use('/api/user/', userAPI);
  server.use('/api/user_role/', user_roleAPI);
  server.use('/api/lecturer/', lecturerAPI);
  server.use('/api/department/', departmentAPI);
  server.use('/api/major/', majorAPI);
  server.use('/api/student/', studentAPI);
  server.use('/api/fileStorage/', fileStorageAPI);
  server.use('/api/notification/', notificationAPI);
  server.use('/api/project/', projectAPI);
  server.use('/api/sampleDocument/', sampleDocumentAPI);
  server.use('/api/group/', groupAPI);
  server.use('/api/stage/', stageAPI);
  server.use('/api/listTask/', listTaskAPI);
  server.use('/api/task/', taskAPI);
  server.use('/api/taskAssignment/', taskAssignmentAPI);
  server.use('/api/defense/', defenseAPI);
}

module.exports = router;