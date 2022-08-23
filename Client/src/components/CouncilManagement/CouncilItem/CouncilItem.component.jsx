import React, { useState } from "react";
import styles from "./CouncilItem.module.scss";
import RoundedAvatar from "../../../ui/Avatar/RoundedAvatar/RoundedAvatar.component";
function CouncilItem({type, data }) {
  const handleType = () => {
    if(type==="member"){
      return(
        <div className={styles["council-line"]}>
        <div className={styles["avatar"]}>
          <RoundedAvatar
            name={data.lastName + " " + data.firstName}
          />
        </div>
        <div className={styles["info"]}>
          <div className={styles["info-header"]}>
            <p className={styles["name"]}>
              {data.lastName + " " + data.firstName}
            </p>
            <p className={styles["role"]}>{data.roleName}</p>
          </div>
          <p className={styles["work-unit"]}>{data.workUnit}</p>
        </div>
      </div>
      );
    }
    else if(type === "student"){
      return (
        <div className={styles["council-line"]}>
        <div className={styles["avatar"]}>
          <RoundedAvatar
            name={data.userInfo.lastName + " " + data.userInfo.firstName}
          />
        </div>
        <div className={styles["info"]}>
            <p className={styles["name"]}>
              {data.userInfo.lastName + " " + data.userInfo.firstName}
            </p>
          <p className={styles["work-unit"]}>{data.studentInfo.stuCode}</p>
        </div>
      </div>
      )
    }
  }
  return (
    handleType()
  );
}

export default CouncilItem;
