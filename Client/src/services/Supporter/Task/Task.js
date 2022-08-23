import { axios } from "../../HttpClient/HttpClient";

async function add(stageId, listTaskId, task) {
    let { data, ok, status } = await axios({
        url: `/api/task/add/${stageId}/${listTaskId}`,
        data: task,
        method: "post",
    });

    let isSucess = ok && status === 200;
    let message = {};

    if (isSucess)
        message = { isOpen: true, content: "Add this task successfully !" };
    else message = { isOpen: true, content: "Fail to add this task !" };

    return { data, isSucess, message };
}

async function edit(stageId, listTaskId, task) {
    task.studentIds = task.checkedMembers.filter((member) => member.isChecked);
    task.studentIds = task.studentIds.map((member) => member.stuId);
    task.deleteStudentIds = task.checkedMembers.filter(
        (member) => !member.isChecked
    );
    task.deleteStudentIds = task.deleteStudentIds.map((member) => member.stuId);

    let { data, ok, status } = await axios({
        url: `/api/task/update/${stageId}/${listTaskId}/${task.taskId}`,
        data: task,
        method: "post",
    });

    let isSucess = ok && status === 200;
    let message = {};

    if (isSucess)
        message = { isOpen: true, content: "Edit this task successfully !" };
    else message = { isOpen: true, content: "Fail to edit this task !" };

    return { data, isSucess, message };
}

async function remove(stageId, listTaskId, taskId) {
    let { data, ok, status } = await axios({
        url: `/api/task/delete/${stageId}/${listTaskId}/${taskId}`,
        method: "post",
    });

    let isSucess = ok && status === 200;
    let message = {};

    if (isSucess)
        message = { isOpen: true, content: "Add this list successfully !" };
    else message = { isOpen: true, content: "Fail to add this list !" };

    return { data, isSucess, message };
}

async function move(stageId, listTaskId, taskId, newListTaskId) {
    let { data, ok, status } = await axios({
        url: `/api/task/move/${stageId}/${listTaskId}/${taskId}`,
        data: { listTaskId: newListTaskId },
        method: "post",
    });

    let isSucess = ok && status === 200;

    return { data, isSucess };
}

async function load(stageId, listTaskId) {
    let { data, ok, status } = await axios({
        url: `/api/task/list/${stageId}/${listTaskId}`,
        method: "get",
    });

    let isSucess = ok && status == 200;

    return { data, isSucess };
}

export default { add, edit, remove, load, move };
