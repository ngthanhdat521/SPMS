import React, { useState } from "react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import NotificationForm from "../NotificationForm/NotificationForm.component";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useSelector } from "react-redux";
import styles from "./Sidebar.module.scss";

function Sidebar({ children, addNotification, uploadFile }) {
    let { roleUser } = useSelector((s) => s.user);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={
                styles["sidebar"] +
                " llight-right-border activity-notification_sidebar"
            }
        >
            <div
                className={
                    styles["sidebar_header"] +
                    " d-flex light-bg llight-bottom-border"
                }
            >
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Notification</h5>
                    <div className="d-flex align-items-center">
                        <MoreVertOutlinedIcon />
                        {!roleUser.includes("moderator") || (
                            <AddBoxOutlinedIcon
                                onClick={() => setIsOpen(true)}
                                className="cursor-pointer"
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className={styles["sidebar_body"]}>{children[0]}</div>
            <div
                className={
                    styles["sidebar_footer"] +
                    " d-flex light-bg llight-top-border"
                }
            >
                {children[1]}
            </div>
            {!isOpen || (
                <NotificationForm
                    uploadFile={uploadFile}
                    onClose={() => setIsOpen(false)}
                    onSubmit={addNotification}
                />
            )}
        </div>
    );
}

export default Sidebar;
