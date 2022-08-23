import React, { useState } from "react";
import DropDownFile from "../DropDownFile/DropDownFile.component";
import FileIcon from "../FileIcon/FileIcon.component";
import DateConverter from "../../../services/Converter/DateConverter";
import styles from "./File.module.scss";
import TransparentTextbox from "../../Form/TransparentTextbox/TransparentTextbox.component";

function File({ fileName, size, createdAt, onDelete, onDownload,onRename }) {
    const [isVisible, setIsVisible] = useState(false);

    const downloadFile = () => onDownload(fileName);
    const renameFile = () => setIsVisible(true);
    const saveName = (value) => {
        onRename(fileName,value);
        setIsVisible(false);
    };

    return (
        <div className={styles["file"] + " d-flex"}>
            <div className={styles["file_dropdown"]}>
                <DropDownFile
                    onRename={renameFile}
                    onDownload={downloadFile}
                    onDelete={onDelete}
                />
            </div>

            <div className="m-auto">
                <div className="d-flex justify-content-center">
                    <div className="m-auto" style={{ width: "50px" }}>
                        <FileIcon extension={fileName.split(".").pop()} />
                    </div>
                </div>

                {isVisible ? (
                    <TransparentTextbox
                        onSave={saveName}
                        defaultValue={fileName}
                        isTextboxVisible={false}
                    />
                ) : (
                    <span className="">{fileName}</span>
                )}
                <div className={styles["file_sub"] + " light-text file_sub"}>
                    {`${DateConverter.parseShortDateTime(createdAt)} ${(
                        (size / 1024) *
                        2
                    ).toFixed(2)}mb`}
                </div>
            </div>
        </div>
    );
}

export default File;
