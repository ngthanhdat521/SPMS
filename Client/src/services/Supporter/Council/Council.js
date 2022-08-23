import { axios } from "../../HttpClient/HttpClient";

async function createCouncil(council) {
    let { ok, status } = await axios({
        url: "/api/defense/createDefense",
        method: "post",
        data: council,
    });
    let isCreateSuccess = ok && status === 200;
    return { isCreateSuccess };
}

async function load() {
    let { data, ok, status } = await axios({
        url: "/api/defense/getAllDefense",
        method: "get",
    });

    let isSucess = ok && status === 200;
    return { data, isSucess };
}

async function loadDefenseToAssign() {
    let { data, ok, status } = await axios({
        url: "/api/defense/getAllDefenseToAssign",
        method: "get",
    });
    let isSucess = ok && status === 200;
    return { data, isSucess };
}

async function assignCouncil(assignData) {
    let { data, ok, status } = await axios({
        url: "/api/defense/assignGroup",
        data: assignData,
        method: "post",
    });
    let isSucess = ok && status === 200;
    return { data, isSucess };
}

async function deleteCouncil(councilId) {
    let { data, ok, status } = await axios({
        url: `/api/defense/deleteDefense/${councilId}`,
        method: "delete",
    });
    let isSucess = ok && status === 200;
    let message = {};
    if (isSucess) message = { isOpen: true, content: "Delete sucessfully !" };
    else message = { isOpen: true, content: "Delete failed !" };
    return { data, isSucess, message };
}

async function editCouncil(council) {
    let { ok, status } = await axios({
        url: `/api/defense/updateDefense/${council.councilId}`,
        method: "put",
        data: council,
    });
    let isEditSuccess = ok && status === 200;

    return { isEditSuccess };
}

async function loadCouncilByStudent() {
    let user = JSON.parse(localStorage.getItem("user"));

    let { data, ok, status } = await axios({
        url: "/api/defense/getAllDefense",
        method: "get",
    });

    let isSucess = ok && status === 200;

    data = data.filter((council) => {
        let index = council.students.findIndex(
            (student) => student.userInfo.userId === user.userId
        );
        return index >= 0;
    });

    data = data.map((councilMember) => {
        let council = councilMember.council;
        council.title = `${council.councilName} at ${council.location}`;
        council.start = council.time;
        let end = new Date(council.time);
        end.setHours(end.getHours() + 2);
        console.log(end);
        council.end = end;
        return council;
    });

    return { data, isSucess };
}

async function loadCouncilByLecturer() {
    let info = JSON.parse(localStorage.getItem("info"));

    let { data, ok, status } = await axios({
        url: `/api/defense/getAllDefense/${info.lecturerId}`,
        method: "get",
    });

    let isSucess = ok && status === 200;

    data = data.map((councilMember) => {
        let council = councilMember.council;
        council.title = `${council.councilName} at ${council.location}`;
        council.start = council.time;
        let end = new Date(council.time);
        end.setHours(end.getHours() + 2);
        council.end = end;
        return council;
    });

    return { data, isSucess };
}

async function loadCouncilByRole() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user.roleUser.includes("student")) {
        let { data, isSucess } = await loadCouncilByStudent();
        return { data, isSucess };
    }
    if (user.roleUser.includes("mentor")) {
        let { data, isSucess } = await loadCouncilByLecturer();
        return { data, isSucess };
    }
    return { data: [], isSucess: true };
}

export default {
    createCouncil,
    load,
    loadDefenseToAssign,
    assignCouncil,
    deleteCouncil,
    editCouncil,
    loadCouncilByRole,
};
