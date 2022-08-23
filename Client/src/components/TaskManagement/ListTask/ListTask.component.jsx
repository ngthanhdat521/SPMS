import React, { useState } from "react";
import styles from "./ListTask.module.scss";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Task from "../Task/Task.component";
import ItemButton from "../ItemButton/ItemButton.component";
import OptionalDialog from "../../../ui/DialogMessage/OptionalDialog/OptionalDialog.component";
import TransparentTextbox from "../../../ui/Form/TransparentTextbox/TransparentTextbox.component";

function ListTask({
    listTaskId,
    title,
    tasks,
    openTaskDetail,
    addTask,
    listIndex,
    moveTask,
    removeList,
    editList,
}) {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    const [isVisible, setIsVisible] = useState(true);
    const [activeIndex, setActiveIndex] = useState(-1);

    const savePosition = (event,index) => {
        let { clientX, clientY } = event;

        setPosition({
            x: clientX,
            y: clientY,
        });

        setActiveIndex(index);
    };

    const removePosition = (event) => {
        setActiveIndex(-1);
    };

    const openTask = (event, task, listIndex, taskIndex) => {
        let { clientX, clientY } = event;
        if (clientX === position.x && clientY === position.y)
            openTaskDetail(task, listIndex, taskIndex);
    };

    const closeEditForm = () => setIsVisible(false);

    const saveList = (value) => {
        editList(listIndex, { listTaskId, title: value });
        setIsVisible(true);
    };

    const agree = () => {
        removeList(listTaskId, listIndex);
    };

    return (
        <div className={styles["list-task"] + " js-list-task"}>
            <div
                className={
                    styles["list-task_header"] +
                    " d-flex justify-content-between align-items-center"
                }
            >
                <div>
                    <span className={styles["list-task_header_title"]}>
                        <TransparentTextbox
                            className="w-75"
                            regex={/^.{2,}$/}
                            defaultValue={title}
                            isTextboxVisible={isVisible}
                            onSave={saveList}
                        />
                    </span>
                </div>
                <div className="d-flex align-items-center">
                    <span className={styles["list-task_header_number"]}>
                        {tasks.length}
                    </span>
                    <BorderColorOutlinedIcon
                        className="mx-2 cursor-pointer"
                        sx={{ color: "#64748b", fontSize: "20px" }}
                        onClick={closeEditForm}
                    />
                    <OptionalDialog
                        title="Message"
                        content="Are you sure that you want to delete this list ?"
                        onAgree={agree}
                    >
                        <DeleteOutlineOutlinedIcon
                            className="cursor-pointer"
                            sx={{ color: "#64748b", fontSize: "20px" }}
                        />
                    </OptionalDialog>
                </div>
            </div>
            <div className={styles["list-task_body"]}>
                {tasks.map((task, taskIndex) => (
                    <div
                        onMouseDown={(event) => savePosition(event,taskIndex)}
                        onMouseUp={removePosition}
                        onClick={(event) =>
                            openTask(event, task, listIndex, taskIndex)
                        }
                        key={taskIndex}
                        className={taskIndex > 0 ? "mt-3" : ""}
                    >
                        <Task
                            taskIndex={taskIndex}
                            listIndex={listIndex}
                            moveTask={moveTask}
                            position={position}
                            activeIndex={activeIndex}
                            {...task}
                        />
                    </div>
                ))}
                <div className="mt-2">
                    <ItemButton
                        addItem={(title) => addTask(title, listIndex)}
                        text="Add another card"
                    />
                </div>
            </div>
        </div>
    );
}

export default ListTask;
