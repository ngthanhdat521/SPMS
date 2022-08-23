const fs = require('fs');
const path = require('path');

const deleteFile = (pathFile) =>{
    fs.unlink(path.join('../server', pathFile), (err) => {
        if (err)
            console.log("Không tìm thấy file: ",err);
    });
}

module.exports = {deleteFile};