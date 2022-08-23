import { Skeleton } from "@mui/material";
import React from "react";
import styles from "./LoadingFile.module.scss";

function LoadingFile() {
    return (
        <div className={styles["loading-file"]}>
            <div className="w-100 h-100 d-flex">
                <div className="w-100 my-auto">
                    <div className="d-flex">
                        <Skeleton
                            sx={{ borderRadius: "7px" }}
                            variant="rectangular"
                            width={60}
                            height={70}
                            className="mb-3 mx-auto"
                        />
                    </div>
                    <div className="w-100 px-4">
                        <Skeleton
                            sx={{ borderRadius: "7px" }}
                            variant="rectangular"
                            width="100%"
                            height={20}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingFile;
