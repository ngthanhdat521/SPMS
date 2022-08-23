const sampleDocument = require("../service/SampleDocumentService");

//api: /api/sampleDocument/
class SampleDocumentController {
    //Thêm folder
    //POST: /sampleDocument/add
    addFolder = (req, res, next) => {
        let { pathName, folderName } = req.body;

        if (folderName) {
            let message = sampleDocument.addFolder(pathName, folderName);
            res.status(200).json({ message });
        } else
            res.status(404).json({ message: "Folder or pathname is empty !" });
    };

    //Thêm file
    //POST: /sampleDocument/addFiles
    addFiles = async (req, res, next) => {
        res.status(200).json({ message: "Successfully" });
    };

    //Lấy file
    //GET: /sampleDocument/get
    get = async (req, res, next) => {
        let files = await sampleDocument.getFiles();
        res.status(200).json(files);
    };

    //Download file
    //POST: /sampleDocument/download
    download = (req, res, next) => {
        let { pathName } = req.query;

        if (pathName) {
            let fullPath = sampleDocument.downloadFileFromPath(pathName);
            res.status(200).download(fullPath);
        } else res.status(404).json({ message: "Path Name is empty !" });
    };

    //Delete file
    //POST: /sampleDocument/delete
    remove = (req, res, next) => {
        let { pathName, name } = req.body;
        console.log(req.body);
        console.log("start");

        sampleDocument.remove(pathName, name);
        res.status(200).json({ message: "Successfully delete item !" });
    };

    //Rename file
    //POST: /sampleDocument/rename
    rename = (req, res, next) => {
        let { pathName, oldName, newName } = req.body;

        sampleDocument.rename(pathName, newName, oldName);
        if (oldName && newName)
            res.status(200).json({ message: "Successfully delete item !" });
        else res.status(404).json({ message: "Fields is empty !" });
    };
}

module.exports = new SampleDocumentController();
