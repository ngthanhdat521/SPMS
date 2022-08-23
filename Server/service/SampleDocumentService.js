let fs = require("fs");
const { dirname } = require("path");

class SampleDocumentService {
    baseDir;

    constructor() {
        this.baseDir = dirname(__dirname);
    }

    //Thêm folder vào server
    addFolder = (pathName, folderName) => {
        let fullPath = `${this.baseDir}/upload/sample-document${pathName}/${folderName}`;
        let hasExisted = fs.existsSync(fullPath);

        if (hasExisted) return "Folder has been already !";
        else {
            fs.mkdirSync(fullPath);
            return "Sucessfully create folder !";
        }
    };

    //Thêm folder tu server
    downloadFileFromPath = (pathName) => {
        let fullPath = `${this.baseDir}/upload/sample-document${pathName}`;
        return fullPath;
    };

    //Xoa file tu server
    remove = (pathName, name) => {
        let fullPath = `${this.baseDir}/upload/sample-document${pathName}/${name}`;
        let isDirectory = fs.lstatSync(fullPath).isDirectory();

        if (isDirectory) fs.rmSync(fullPath, { recursive: true });
        else fs.unlinkSync(fullPath);
    };

    async getFilesFromPath(pathName, arr) {
        let isExisted = await fs.existsSync(pathName);
        if (isExisted) {
            let files = await fs.readdirSync(pathName);
            for (let i in files) {
                let file = files[i];

                let isDir = file.indexOf(".") < 0;

                if (isDir) {
                    arr[file] = {};
                    await this.getFilesFromPath(
                        pathName + "/" + file,
                        arr[file]
                    );
                } else {
                    if (arr.files === undefined) arr.files = [];
                    const { size, atime } = fs.statSync(pathName + "/" + file);

                    arr.files.push({
                        name: file,
                        size: size,
                        createdAt: atime,
                    });
                }
            }
        }
    }

    async getFiles() {
        let arr = { root: {} };

        await this.getFilesFromPath(
            this.baseDir + "/upload/sample-document",
            arr.root
        );

        return arr;
    }

    rename = (pathName, newName, oldName) => {
        let newPath = `${this.baseDir}/upload/sample-document${pathName}/${newName}`;
        let oldPath = `${this.baseDir}/upload/sample-document${pathName}/${oldName}`;

        fs.renameSync(oldPath, newPath);
    };
}

module.exports = new SampleDocumentService();
