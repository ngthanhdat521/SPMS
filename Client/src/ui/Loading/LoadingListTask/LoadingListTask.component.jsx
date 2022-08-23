import React from "react";
import styles from "./LoadingListTask.module.scss";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Skeleton from "@mui/material/Skeleton";
import LoadingTask from "../LoadingTask/LoadingTask.component";

function LoadingListTask() {
    return (
        <div className={styles["loading-list-task"] + " js-loading-list-task"}>
            <div
                className={
                    styles["loading-list-task_header"] +
                    " d-flex justify-content-between align-items-center"
                }
            >
                <div>
                    <span className={styles["loading-list-task_header_title"]}>
                        <Skeleton
                            variant="rectangular"
                            width={100}
                            height={30}
                            className={styles["loading-list-task_border"]}
                        />
                    </span>
                </div>
                <div className="d-flex align-items-center">
                    <span>
                        <Skeleton variant="circular" width={30} height={30} />
                    </span>
                    <BorderColorOutlinedIcon
                        className="mx-2 cursor-pointer"
                        sx={{ color: "#64748b", fontSize: "20px" }}
                    />
                    <DeleteOutlineOutlinedIcon
                        className="cursor-pointer"
                        sx={{ color: "#64748b", fontSize: "20px" }}
                    />
                </div>
            </div>
            <div className={styles["loading-list-task_body"]}>
                <div className="mt-2">
                    {Array(3)
                        .fill(0)
                        .map((n, index) => (
                            <div key={index} className="p-2">
                                <LoadingTask />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default LoadingListTask;
