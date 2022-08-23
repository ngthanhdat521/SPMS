import React, { useState } from "react";
import styles from "./Folder.module.scss";
import DropDownFolder from "../DropDownFolder/DropDownFolder.component";
import TransparentTextbox from "../../Form/TransparentTextbox/TransparentTextbox.component";
import { useSelector } from "react-redux";

function Folder({ folderName, onOpen, onDelete, onRename }) {
    const { roleUser } = useSelector((s) => s.user);

    const [isVisible, setIsVisible] = useState(false);

    const renameFile = () => setIsVisible(true);
    const saveName = (value) => {
        onRename(folderName, value);
        setIsVisible(false);
    };

    return (
        <div className={styles["folder"] + " d-flex"}>
            {!roleUser.includes("mentor") || (
                <div className={styles["folder_dropdown"]}>
                    <DropDownFolder onRename={renameFile} onDelete={onDelete} />
                </div>
            )}

            <div onDoubleClick={onOpen} className="m-auto">
                <div className="file-item-select-bg bg-primary" />
                <div
                    className={
                        styles["folder_icon"] +
                        " w-100 far fa-folder text-secondary"
                    }
                />
                {isVisible ? (
                    <TransparentTextbox
                        onSave={saveName}
                        defaultValue={folderName}
                        isTextboxVisible={false}
                    />
                ) : (
                    <span className="file-item-name">{folderName}</span>
                )}
            </div>
        </div>
    );
}

export default Folder;
