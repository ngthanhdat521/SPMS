import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import styles from "./LoadingTopicTemplate.module.scss";

export default function LoadingTopicTemplate() {
    return (
        <div className={styles["loading-topic"] + " p-3 default-box-shadow"}>
            <Skeleton
                variant="rectangular"
                width="100%"
                height={30}
                className={styles["loading-topic_border"]}
            />
            <Skeleton
                variant="rectangular"
                width="100%"
                height={70}
                className={styles["loading-topic_border"] + " my-3"}
            />
            <div className="d-flex justify-content-between">
                <Skeleton
                    variant="rectangular"
                    width={200}
                    height={25}
                    className={styles["loading-topic_border"] + " mr-3"}
                />
                <Skeleton
                    variant="rectangular"
                    width={150}
                    height={25}
                    className={styles["loading-topic_border"]}
                />
            </div>
        </div>
    );
}
