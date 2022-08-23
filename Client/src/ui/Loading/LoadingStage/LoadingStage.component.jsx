import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import styles from "./LoadingStage.module.scss";

export default function LoadingStage() {
    return (
        <div className={styles["loading-stage"] + " p-3 llight-bottom-border"}>
            <div className="w-100">
                <Skeleton
                    variant="circular"
                    width={55}
                    height={55}
                />
                <Skeleton
                    sx={{ borderRadius: "7px" }}
                    variant="rectangular"
                    width="50%"
                    height={30}
                    className="my-3"
                />
                <Skeleton
                    sx={{ borderRadius: "7px" }}
                    variant="rectangular"
                    width="100%"
                    height={60}
                />
                <div className={styles["loading-stage_line"]}></div>
                <Skeleton
                    sx={{ borderRadius: "7px" }}
                    variant="rectangular"
                    width="70%"
                    height={30}
                />
            </div>
        </div>
    );
}
