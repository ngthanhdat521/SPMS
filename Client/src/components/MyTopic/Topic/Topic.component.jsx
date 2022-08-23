import React from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { orange, green as grey, red, indigo } from "@mui/material/colors";
import styles from "./Topic.module.scss";
import DateConverter from "../../../services/Converter/DateConverter";
import OptionalDialog from "../../../ui/DialogMessage/OptionalDialog/OptionalDialog.component";
import TopicForm from "../TopicForm/TopicForm.component";
import Button from "@mui/material/Button";

function Topic({
    title,
    desc,
    groupName,
    type,
    createdAt,
    isApproved,
    groupId,
    leaderId,
    leaderName,
    onDelete,
    onEdit,
}) {
    return (
        <div className={styles["topic"]}>
            <div
                className={
                    styles["topic_header"] +
                    " d-flex align-items-center justify-content-between"
                }
            >
                <div>
                    <h3 className="mb-0">{title}</h3>
                </div>
                <div className="d-flex align-items-center">
                    <div className="p-1">
                        <TopicForm
                            title={title}
                            desc={desc}
                            groupId={groupId}
                            type={type}
                            createdAt={createdAt}
                            leaderId={leaderId}
                            text="Edit Topic"
                            onSubmit={onEdit}
                        >
                            <div className="d-flex align-items-center">
                                <BorderColorOutlinedIcon
                                    htmlColor={indigo[500]}
                                    className="cursor-pointer"
                                />
                            </div>
                        </TopicForm>
                    </div>
                    <div className="p-1">
                        <OptionalDialog
                            title="Message"
                            content="Do you to delete this topic ?"
                            onAgree={onDelete}
                        >
                            <DeleteOutlineOutlinedIcon
                                htmlColor={red[500]}
                                className="cursor-pointer"
                            />
                        </OptionalDialog>
                    </div>
                </div>
            </div>
            <div
                className={
                    styles["topic_sub"] 
                }
            >
                <p className="mb-0">
                    Group {groupName} in Capstone {type}
                </p>
                <p>Leader : {leaderName}</p>
            </div>
            <p className={styles["topic_desc"]}>{desc}</p>
            <div className="w-100 d-flex justify-content-between light-text">
                <div className="d-flex align-items-center">
                    <AccessTimeOutlinedIcon className={styles["topic_icon"]} />
                    <span className={styles["topic_sub"] + " ml-2"}>
                        {DateConverter.parseShortDateTime(createdAt)}
                    </span>
                </div>
                <div className="d-flex align-items-center">
                    <div
                        className={styles["topic_status"]}
                        style={{
                            background: isApproved ? grey[700] : orange[500],
                        }}
                    >
                        {isApproved ? "Approved" : "Waiting"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topic;
