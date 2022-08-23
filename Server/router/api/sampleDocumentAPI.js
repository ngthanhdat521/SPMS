const express = require("express");
const fs = require("fs");
const router = express.Router();
const sampleDocumentController = require("../../controller/SampleDocumentController");
const { dirname } = require("path");

const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(
            null,
            `${dirname(__dirname).replace(
                "\\router",
                ""
            )}/upload/sample-document${req.body.pathName}`
        );
    },
    filename: async function (req, file, cb) {
        let pathName = `${dirname(__dirname).replace(
            "\\router",
            ""
        )}/upload/sample-document${req.body.pathName}`;

        let isExisted = await fs.existsSync(pathName);

        let count = 0;
        if (isExisted) {
            let files = await fs.readdirSync(pathName);
            for (let i in files) {
                console.log(files[i]);
                if (files[i].indexOf(file.originalname) >= 0) count++;
            }
        }

        let name = file.originalname;

        if (count > 0) name = name.replace(".", `(${count}).`);

        cb(null, name);
    },
});

const upload = multer({ storage: storage });

router.get("/get", sampleDocumentController.get);
router.post(
    "/addFiles",
    upload.array("sampleDocuments"),
    sampleDocumentController.addFiles
);
router.post("/addFolder", sampleDocumentController.addFolder);
router.get("/download", sampleDocumentController.download);
router.post("/delete", sampleDocumentController.remove);
router.post("/rename", sampleDocumentController.rename);

module.exports = router;
