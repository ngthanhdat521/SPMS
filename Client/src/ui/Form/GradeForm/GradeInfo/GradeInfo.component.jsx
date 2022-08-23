import React from "react";
import styles from "./GradeInfo.module.scss";
function GradeInfo({ data, user, submitType }) {
  return (
    <div className={styles["grade-info"]}>
      <table className={styles["table"]}>
        <tr className={`${styles["header-table"]} default-bg`}>
          <th>Project name</th>
          <th colSpan={3}>{data.council.councilName}</th>
        </tr>
        <tr>
          <th className={styles["label"]}>Sponsor</th>
          <th colSpan={3}>
            {data.mentors.map((item, index) => {
              return (
                <span key={index}>
                  {item.lastName + " " + item.firstName + ", "}
                </span>
              );
            })}
          </th>
        </tr>
        <tr>
          <th className={styles["label"]}>Evaluator/Mentor</th>
          {submitType === "mentor" ? (
            <th colSpan={3}>
              <span>{user.lastName + " " + user.firstName}</span>
              <span className={styles["role-name"]}> (Mentor)</span>
            </th>
          ) : submitType === "council" ? (
            <th colSpan={3}>
              <span>{user.lastName + " " + user.firstName}</span>
              <span className={styles["role-name"]}> ({user.roleName})</span>
            </th>
          ) : (
            ""
          )}
        </tr>
        {data.students.map((member, index) => {
          return (
            <tr key={index}>
              <th className={styles["label"]}>Team member {index + 1}</th>
              <th>
                {member.userInfo.lastName + " " + member.userInfo.firstName}
              </th>
              <th className={styles["label"]}>Code</th>
              <th>{member.studentInfo.stuCode}</th>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default GradeInfo;
