import React from "react";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import Skeleton from "@mui/material/Skeleton";
import styles from "./LoadingTask.module.scss";

function LoadingTask() {
    return (
        <div className={styles["loading-task"]}>
            <div className={styles["loading-task_title"]}>
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={30}
                    className={styles["loading-task_border"]}
                />
            </div>
            <div className="d-flex py-2">
                {Array(4)
                    .fill(0)
                    .map((n, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            width={35}
                            height={35}
                            className={styles["loading-task_border"] + " mr-2"}
                        />
                    ))}
            </div>

            <div className="py-2 d-flex">
                {Array(3)
                    .fill(0)
                    .map((n, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            width={80}
                            height={30}
                            className={
                                "mr-2 light-bg " + styles["loading-task_tag"]
                            }
                        />
                    ))}
            </div>

            <Skeleton
                variant="rectangular"
                width={80}
                height={25}
                className={styles["loading-task_border"] + " mr-2"}
            />

            <div
                className={
                    styles["loading-task_count"] +
                    " d-flex align-items-center justify-content-end pt-3"
                }
            >
                <div className="mr-3 d-flex align-items-center">
                    <InsertCommentOutlinedIcon />
                    <span className="ml-1">
                        <Skeleton
                            variant="rectangular"
                            width={15}
                            height={20}
                            className={styles["loading-task_border"] + " mr-2"}
                        />
                    </span>
                </div>
                <div className="mr-3 d-flex align-items-center">
                    <RemoveRedEyeOutlinedIcon />
                    <span className="ml-1">
                        <Skeleton
                            variant="rectangular"
                            width={15}
                            height={20}
                            className={styles["loading-task_border"] + " mr-2"}
                        />
                    </span>
                </div>
                <div className="d-flex align-items-center">
                    <AttachmentOutlinedIcon />
                    <span className="ml-1">
                        <Skeleton
                            variant="rectangular"
                            width={15}
                            height={20}
                            className={styles["loading-task_border"] + " mr-2"}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default LoadingTask;
