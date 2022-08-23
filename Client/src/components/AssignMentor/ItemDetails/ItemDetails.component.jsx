import React from "react";
import styles from "./ItemDetails.module.scss";
function ItemDetails({ type, data }) {
  const handleType = () => {
    if (type === "mentor") {
      return (
        <div className={styles["item-details"]}>
          <div className={styles["info"]}>
            <div className={styles["label-container"]}>
                <span className={styles["info-label"]}>Major: </span>{" "}
            </div>
            <div>
                <span>{data.majorName}</span>
            </div>
          </div>
          <div className={styles["info"]}>
            <div className={styles["label-container"]}>
                <span className={styles["info-label"]}>Phone: </span>{" "}
            </div>
            <div>
                <span>{data.phone}</span>
            </div>
          </div>
          <div className={styles["info"]}>
            <div className={styles["label-container"]}>
                <span className={styles["info-label"]}>Email: </span>{" "}
            </div>
            <div>
                <span>{data.email}</span>
            </div>
          </div>
         </div>
      );
    } else if (type === "group") {
      return (
        <div className={styles["item-details"]}>
          <span className={styles["info-label"]}>Members: </span>
          {data.students.map((student, index) => {
            return (
              <div>
                <span>
                  {student.userInfo.lastName + " " + student.userInfo.firstName}{" "}
                  -{" "}
                </span>
                <span>{student.studentInfo.stuCode}</span>
              </div>
            );
          })}
        </div>
      );
    }
  };
  return handleType();
}

export default ItemDetails;
