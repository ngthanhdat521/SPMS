import React, { useState } from "react";
import Textbox from "../../../ui/Form/Textbox/Textbox.component";
import AdvancedEditor from "../../../ui/TextareaEditor/AdvancedEditor/AdvancedEditor.component";
import Button from "@mui/material/Button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import SnackbarContent from "@mui/material/SnackbarContent";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./NotificationForm.module.scss";

function NotificationForm({
    onClose,
    onSubmit,
    text = "Notify",
    defaultNotification = { title: "", content: "", files: [] },
}) {
    const [notification, setNotification] = useState(defaultNotification);

    const uploadFile = () => {
        var fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.multiple = true;
        fileInput.onchange = (event) => {
            let uploadedFile = event.target.files;
            let newNotification = { ...notification };
            
            let arr = newNotification.files || [];
            arr = arr.filter((v) => v !== null);
            for (let i of uploadedFile) {
                arr.push(i);
            }
            newNotification.files = arr;
            setNotification(newNotification);
        };
        fileInput.click();
    };

    const deleteFile = (index) => {
        let newNotification = { ...notification };
        if (newNotification.oldFiles === undefined)
            newNotification.oldFiles = {};
        for (let i = 1; i < 5; i++) {
            if (newNotification["file" + i]) {
                if (
                    newNotification.files[index].fileId ===
                    newNotification["file" + i].fileId
                )
                    newNotification.oldFiles["file" + i] =
                        newNotification.files[index];
            }
        }
        newNotification.files.splice(index, 1);
        setNotification(newNotification);
    };

    const handleChange = (value, name) => {
        notification[name] = value;
        setNotification({ ...notification });
    };

    return (
        <div className={styles["notification-form"]}>
            <div
                className={
                    styles["notification-form_header"] +
                    " default-bg d-flex justify-content-between"
                }
            >
                <span>New Notification</span>
                <CloseOutlinedIcon
                    onClick={onClose}
                    className="cursor-pointer"
                />
            </div>
            <div className={styles["notification-form_body"]}>
                <div className="form-group">
                    <Textbox
                        onChange={(event) =>
                            handleChange(event.target.value, "title")
                        }
                        placeholder="Title"
                        regex={/^.{3,}$/}
                        defaultValue={notification.title}
                        message="Title is minimum 3 characters"
                    />
                </div>
                <AdvancedEditor
                    defaultValue={notification.content}
                    onChange={(data) => handleChange(data, "content")}
                />
                <div className="py-2">
                    {notification.files === undefined ||
                        notification.files.map(
                            (file, index) =>
                                !file || (
                                    <SnackbarContent
                                        key={index}
                                        action={
                                            <CloseIcon
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    deleteFile(index)
                                                }
                                            />
                                        }
                                        className="py-0 px-3 mb-1"
                                        message={
                                            (file.name === undefined
                                                ? file.fileName
                                                : file.name) +
                                            " (" +
                                            (file.size / 1024).toFixed(2) +
                                            " mb)"
                                        }
                                    />
                                )
                        )}
                </div>
            </div>

            <div
                className={
                    styles["notification-form_footer"] +
                    " pt-0 d-flex align-items-center"
                }
            >
                <Button
                    onClick={() => onSubmit(notification)}
                    variant="contained"
                >
                    {text}
                </Button>
                <div
                    onClick={uploadFile}
                    className="mx-2 cursor-pointer d-flex align-items-center"
                >
                    <AttachFileOutlinedIcon />
                </div>
            </div>
        </div>
    );
}

export default NotificationForm;
