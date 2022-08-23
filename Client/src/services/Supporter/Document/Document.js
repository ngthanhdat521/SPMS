import { axios } from "../../HttpClient/HttpClient";

async function add(document) {
    let { data, ok, status } = await axios({
        url: "/api/group/add",
        data: document,
        method: "post",
    });

    let statusRes = ok && status == true;

    return { data, ok: statusRes };
}

async function update(document) {
    let { data, ok, status } = await axios({
        url: `/api/group/edit/${document.groupId}`,
        data: document,
        method: "post",
    });

    let statusRes = ok && status == true;

    return { data, ok: statusRes };
}

async function remove(document) {
    let { data, ok, status } = await axios({
        url: `/api/group/delete/${document.groupId}`,
        method: "post",
    });

    let statusRes = ok && status == true;

    return { data, ok: statusRes };
}

async function load() {
    let { data, ok, status } = await axios({
        url: "/api/group/list",
        method: "get",
    });

    let statusRes = ok && status == true;

    return { data, ok: statusRes };
}

export default { add, update, remove, load };
