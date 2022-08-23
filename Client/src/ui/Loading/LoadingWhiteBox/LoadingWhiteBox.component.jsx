import React from 'react';
import Skeleton from "@mui/material/Skeleton";
import styles from './LoadingWhiteBox.module.scss';
function LoadingWhiteBox() {
    return (
        <div className={styles["loading-white-box"]}>
            <Skeleton
                variant="rectangular"
                width="100%"
                height={70}
                className={styles["loading-item"]}
            />
            <Skeleton
                variant="rectangular"
                width="100%"
                height={70}
                className={styles["loading-item"]}
            />
            <Skeleton
                variant="rectangular"
                width="100%"
                height={70}
                className={styles["loading-item"]}
            />
            <Skeleton
                variant="rectangular"
                width="100%"
                height={70}
                className={styles["loading-item"]}
            />
            <Skeleton
                variant="rectangular"
                width="100%"
                height={70}
                className={styles["loading-item"]}
            />
            <Skeleton
                variant="rectangular"
                width="100%"
                height={70}
                className={styles["loading-item"]}
            />
            <Skeleton
                variant="rectangular"
                width="100%"
                height={70}
                className={styles["loading-item"]}
            />
            <Skeleton
                variant="rectangular"
                width="100%"
                height={70}
                className={styles["loading-item"]}
            />
        </div>
    );
}

export default LoadingWhiteBox;