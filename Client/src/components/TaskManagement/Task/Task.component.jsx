import React, { useState } from "react";
import styles from "./Task.module.scss";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import RoundedAvatar from "../../../ui/Avatar/RoundedAvatar/RoundedAvatar.component";
import DateConverter from "../../../services/Converter/DateConverter";
import Draggable from "react-draggable";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";

function Task({
    taskId,
    taskIndex,
    taskName,
    members,
    endDate,
    listIndex,
    moveTask,
    position,
    activeIndex,
}) {
    const [dragPosition, setDragPosition] = useState({
        x: 0,
        y: 0,
    });

    const handleDrag = (e, ui) => {
        setDragPosition({
            x: ui.x,
            y: ui.y,
        });
    };

    const getIndexFromPosition = (x, listIndex) => {
        let tempX = Math.abs(x);
        let count = 0;

        while (tempX > 250) {
            tempX -= 250;
            count++;
        }

        if (count !== 0) return Math.abs(x > 0 ? count + listIndex : count - listIndex);
        return listIndex;
    };

    const onStop = (e) => {
        if (position.x !== e.clientX || position.y !== e.clientY) {
            const { x, y } = dragPosition;
            let index = getIndexFromPosition(x, listIndex);
            moveTask(listIndex, taskIndex, index, taskId);
            setDragPosition({
                x: 0,
                y: 0,
            });
        }
    };

    const dragHandlers = { onStop: onStop };

    return (
        <Draggable
            onDrag={handleDrag}
            position={{ x: dragPosition.x, y: dragPosition.y }}
            {...dragHandlers}
        >
            <div
                className={`${styles["task"]} ${
                    activeIndex === taskIndex ? "task_active" : ""
                }`}
            >
                <div className={styles["task_title"]}>{taskName}</div>
                <div className="d-flex py-2">
                    {members.map((member, memberIndex) => (
                        <div
                            key={memberIndex}
                            className={memberIndex > 0 ? "ml-1" : ""}
                        >
                            <RoundedAvatar
                                src=""
                                name={member.firstName + " " + member.lastName}
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    fontSize: "14px",
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div className="py-2">
                    <span className={styles["task_tag"] + " light-bg"}>
                        Research
                    </span>
                </div>

                {endDate ? (
                    <div className="d-flex align-items-center pt-2">
                        <AccessTimeOutlinedIcon
                            className={styles["task_icon-time"] + " error-text"}
                        ></AccessTimeOutlinedIcon>
                        <span
                            className={styles["task_time"] + " ml-1 error-text"}
                        >
                            {DateConverter.parseShortDate(endDate)}
                        </span>
                    </div>
                ) : (
                    ""
                )}

                <div
                    className={
                        styles["task_count"] +
                        " d-flex align-items-center justify-content-end pt-3"
                    }
                >
                    <div className="mr-3 d-flex align-items-center">
                        <InsertCommentOutlinedIcon />
                        <span className="ml-1">3</span>
                    </div>
                    <div className="mr-3 d-flex align-items-center">
                        <RemoveRedEyeOutlinedIcon />
                        <span className="ml-1">3</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <AttachmentOutlinedIcon />
                        <span className="ml-1">3</span>
                    </div>
                </div>
            </div>
        </Draggable>
    );
}

export default Task;
