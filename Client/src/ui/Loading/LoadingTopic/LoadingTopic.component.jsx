import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import styles from "./LoadingTopic.module.scss";

export default function LoadingTopic() {
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
                height={20}
                className={styles["loading-topic_border"] + " my-3"}
            />
            <Skeleton
                variant="rectangular"
                width="100%"
                height={70}
                className={styles["loading-topic_border"]}
            />
            <div className="d-flex my-3">
                <Skeleton
                    variant="rectangular"
                    width="50%"
                    height={15}
                    className={styles["loading-topic_border"] + " mr-3"}
                />
                <Skeleton
                    variant="rectangular"
                    width="50%"
                    height={15}
                    className={styles["loading-topic_border"]}
                />
            </div>
            <div className="d-flex">
                <Skeleton
                    variant="rectangular"
                    width={90}
                    height={35}
                    className={styles["loading-topic_border"] + " ml-auto"}
                />
            </div>
        </div>
    );
}
