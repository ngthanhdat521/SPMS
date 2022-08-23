function upload(uploadFile) {
    let fileInp = document.createElement("input");
    fileInp.multiple = true;
    fileInp.type = "file";
    fileInp.onchange = uploadFile;
    fileInp.click();
}

export default { upload };
