import { axios, download } from "../../HttpClient/HttpClient";

async function addFiles(files, pathName) {
    let form = new FormData();
    form.append("pathName", pathName);
    for (let file of files) form.append("sampleDocuments", file);

    let { data, ok, status } = await axios({
        url: "/api/sampleDocument/addFiles",
        data: form,
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
    });

    let isSucess = ok && status === 200;

    return { data, isSucess };
}

async function addFolder(pathName, folderName, folders) {
    let message = {};
    let hasExisted = false;
    folders.map((folder) => {
        if (folder === folderName) hasExisted = true;
    });

    if (hasExisted)
        message = { isOpen: true, content: "Folder has been already !" };
    else {
        let { data, ok, status } = await axios({
            url: "/api/sampleDocument/addFolder",
            data: {
                folderName,
                pathName,
            },
            method: "post",
        });

        console.log(data);

        let isSucess = ok && status === 200;

        if (isSucess)
            message = { isOpen: true, content: "Successfully create folder !" };
        else message = { isOpen: true, content: "Fail to create folder !" };
    }

    return { message, hasExisted };
}

function downloadFile(pathName, fileName) {
    pathName = `${pathName}/${fileName}`;

    download({ url: `/api/sampleDocument/download?pathName=${pathName}` });
}

async function remove(pathName, name) {
    //let fullPath = `${pathName}/${name}`;

    let { data, ok, status } = await axios({
        url: "/api/sampleDocument/delete",
        data: { pathName, name },
        method: "post",
    });

    let isSucess = ok && status === 200;

    return { data, isSucess };
}

async function rename(pathName, oldName, newName) {
    let { data, ok, status } = await axios({
        url: "/api/sampleDocument/rename",
        data: { pathName, oldName, newName },
        method: "post",
    });

    let isSucess = ok && status === 200;

    return { data, isSucess };
}

async function load() {
    let { data, ok, status } = await axios({
        url: "/api/sampleDocument/get",
        method: "get",
    });

    let isSucess = ok && status === 200;

    return { data, isSucess };
}

export default { addFiles, addFolder, downloadFile, remove, rename, load };
