const roleAPI = require('./api/roleAPI');
const userAPI = require('./api/userAPI');
const user_roleAPI = require('./api/user_roleAPI');
const lecturerAPI = require('./api/lecturerAPI');
const departmentAPI = require('./api/departmentAPI');
const majorAPI = require('./api/majorAPI');
const studentAPI = require('./api/studentAPI')
const fileStorageAPI = require('./api/fileStorageAPI');
const notificationAPI = require('./api/notificationAPI');
const groupAPI = require('./api/groupAPI');
const projectAPI = require('./api/projectAPI');
const sampleDocumentAPI = require('./api/sampleDocumentAPI');
const stageAPI = require('./api/stageAPI');
const listTaskAPI = require('./api/listTaskAPI');
const taskAPI = require('./api/taskAPI');
const taskAssignmentAPI = require('./api/taskAssignmentAPI');
const evaluateStageAPI = require('./api/evaluateStageAPI');
const defenseAPI = require('./api/defenseAPI');
const scoreAPI = require('./api/scoreAPI');

function router(server) {
    server.use('/api/role/', roleAPI);
    server.use('/api/user/', userAPI);
    server.use('/api/user_role/', user_roleAPI);
    server.use('/api/lecturer/', lecturerAPI);
    server.use('/api/department/', departmentAPI);
    server.use('/api/major/', majorAPI);
    server.use('/api/student/', studentAPI)
    server.use('/api/fileStorage/', fileStorageAPI);
    server.use('/api/notification/', notificationAPI);
    server.use('/api/project/', projectAPI);
    server.use('/api/sampleDocument/', sampleDocumentAPI);
    server.use('/api/group/', groupAPI);
    server.use('/api/stage/', stageAPI);
    server.use('/api/listTask/', listTaskAPI);
    server.use('/api/task/', taskAPI);
    server.use('/api/taskAssignment/', taskAssignmentAPI);
    server.use('/api/evaluateStage/', evaluateStageAPI);
    server.use('/api/defense/', defenseAPI);
    server.use('/api/score/', scoreAPI);
}


module.exports = router;