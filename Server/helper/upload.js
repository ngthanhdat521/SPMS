const path = require('path');
const fs = require('fs');
const multer = require('multer');

const createDirectory = (direc) => {
    if (!fs.existsSync(direc))
        fs.mkdirSync(direc, { recursive: true })
}

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
//         cb(null, true);
//     else
//         cb(null, false);
// }

const uploadFile = (directory) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if (file.originalname) {
                // console.log(req.body);
                let direc = directory;
                // direc += "\\" + req.data.userId;
                if (!fs.existsSync(direc))
                    fs.mkdirSync(direc)
                cb(null, direc);
            }
            else {
                cb(null, "")
            }
        },
        filename: function (req, file, cb) {
            // console.log(file);
            if (file.originalname) {
                const date = new Date();
                cb(null, date.getMonth() + 1 + '' + date.getDate() + '' + date.getFullYear() + '' + + Math.round(Math.random() * 1E9) + '-' + file.originalname);
            }
            else {
                cb(null, "");
            }
        }
    })
    // console.log("multer: ", multer)
    const upload = multer({
        storage: storage,
        limits: {
            fieldSize: 1024 * 1024 * 6
        },
        // fileFilter
    });
    return upload;
}

module.exports = { uploadFile };