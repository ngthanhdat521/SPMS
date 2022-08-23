import React from "react";
import styles from "./ItemDetails.module.scss";
function ItemDetails({ type, data }) {
  const handleType = () => {
    if (type === "lecturer") {
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
          <div className={styles["members"]}>
            <span>Members: </span>
          </div>
          {data.students.map((student, index) => {
            return (
              <div>
                <span className={styles["info-label"]}>
                  {student.userInfo.lastName + " " + student.userInfo.firstName}
                </span>
                <span className={styles["code"]}> - {student.studentInfo.stuCode}</span>
              </div>
            );
          })}
        </div>
      );
    }else if (type === "council") {
      return (
        <div className={styles["item-details"]}>
          <div className={styles["members"]}>
            <span>Members: </span>
          </div>
          {data.detailMembers.map((member, index) => {
            return (
              <div className={styles["members-line"]}>
                <div className={styles["header"]}>
                <span className={styles["info-label"]}>
                  {member.lastName + " " + member.firstName}
                </span>
                <span className={styles["role"]}>{member.roleName}</span>
                </div>
                <span className={styles["note"]}>{member.workUnit}</span>
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