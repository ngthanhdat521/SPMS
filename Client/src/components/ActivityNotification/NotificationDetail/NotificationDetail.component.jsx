import React from "react";
import styles from "./NotificationDetail.module.scss";
import ItemImage from "../../../ui/Avatar/ItemImage/ItemImage.component";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DateConverter from "../../../services/Converter/DateConverter";
import OptionalDialog from "../../../ui/DialogMessage/OptionalDialog/OptionalDialog.component";
import { useSelector } from "react-redux";
import { HOST_NAME } from "../../../config/HOST";

function NotificationDetail({
    title,
    content,
    createdAt,
    files,
    onClose,
    onUpdate,
    onDelete,
}) {
    const { roleUser } = useSelector((s) => s.user);

    const countFiles = () => {
        let count = 0;
        files.map((file) => {
            if (file) count++;
        });
        return count;
    };

    console.log(files);

    return (
        <div
            className={
                styles["notification-detail"] +
                (window.pageXOffset < 550 ? " light-bg" : "")
            }
        >
            <div
                className={
                    styles["notification-detail_header"] +
                    " d-flex justify-content-between align-items-center light-bg px-4 llight-bottom-border"
                }
            >
                <div>
                    <h5 className="hlight-text mb-0">Notification Detail</h5>
                </div>
                <div className="d-flex align-items-center">
                    {roleUser.indexOf("moderator") < 0 || (
                        <>
                            <LocalOfferOutlinedIcon className="hlight-text" />
                            <BorderColorOutlinedIcon
                                onClick={onUpdate}
                                className="hlight-text"
                            />
                            <OptionalDialog
                                title="Message"
                                content="Are you sure that you want to delete this notification ?"
                                onAgree={onDelete}
                                onDisagree={() => {}}
                            >
                                <DeleteOutlineOutlinedIcon className="hlight-text" />
                            </OptionalDialog>
                        </>
                    )}

                    <ClearOutlinedIcon
                        onClick={onClose}
                        className="hlight-text"
                    />
                </div>
            </div>
            <div className={styles["notification-detail_body"] + ""}>
                <div>
                    <h5 className="mb-1"> {title}</h5>
                    <p style={{ fontSize: "13px", color: "#777" }}>
                        {DateConverter.parseShortDateTime(createdAt)}
                    </p>
                </div>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
            <div className={styles["notification-detail_footer"] + " mt-4"}>
                <div>
                    <div className="d-flex align-items-center mb-3">
                        <AttachFileOutlinedIcon
                            style={{ fontSize: "18px" }}
                            className="light-text mr-2"
                        />
                        <h5 className="mb-0" style={{ fontSize: "14px" }}>
                            {countFiles()} Attachments
                        </h5>
                    </div>
                    <div style={{ flexFlow: "wrap" }} className="d-flex">
                        {files.map((file, index) => {
                            if (file) {
                                return (
                                    <div className="mr-3">
                                        <a
                                            download
                                            href={`${HOST_NAME}/api/fileStorage/download/${file.fileId}`}
                                        >
                                            <ItemImage
                                                key={index}
                                                src={file.path}
                                                title={file.fileName.substring(file.fileName.indexOf("-")+1,file.fileName.length)}
                                                content="15.05 KB"
                                            />
                                        </a>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationDetail;
