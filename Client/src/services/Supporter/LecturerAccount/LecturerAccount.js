import { axios } from "../../HttpClient/HttpClient";


async function load() {
    let {data, status, ok} = await axios({
        url: "/api/lecturer/list",
        method: "get",
    });
    return {data, isSuccess: (ok && status===200)};
}

async function remove(userId){
    let { ok, status } = await axios({
        url: "/api/user/delete/" + userId,
        method: "post",
    });
    let resultMessage = {};
    if (ok && status === 200) {
        resultMessage = { content: "Delete successfully!", isOpen: true };
    } else {
        resultMessage = { content: "Fail to delete", isOpen: true };
    }
    return {resultMessage};
}

async function resetPassword(userId, editRowById){
    editRowById (userId, "*********", "password");
    // let { data, status, ok } = await axios({
    //     url: "/api/user/delete/" + userId,
    //     method: "post",
    // });
    // let resultMessage = {};
    // if (ok && status === 200) {
    //     resultMessage = { content: "Reset password successfully!", isOpen: true };
    // } else {
    //     resultMessage = { content: "Reset fail", isOpen: true };
    // }
    // return {data, resultMessage};
}


export default {load, remove, resetPassword};