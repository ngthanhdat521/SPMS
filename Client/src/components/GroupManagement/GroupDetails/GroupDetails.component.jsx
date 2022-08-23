import React from "react";
import styles from "./GroupDetails.module.scss";
function GroupDetails({type, data}) {
    console.log(data);
  const renderDetails = () => {
    if (type === "member") {
      return (
        <div>
          <p className={styles['details-label']}>GPA: {data.studentInfo.gpa}</p>
          <p>{data.userInfo.email}</p>
          <span className={styles['details-label']}>Phone: </span> <span> {data.userInfo.phone}</span>
        </div>
      );
    } else if (type === "mentor") {
      return (
        <div>
          <p>{data.majorName}</p>
          <p>{data.email}</p>
          <span className={styles['details-label']}>Phone: </span> <span>{data.phone}</span>

        </div>
      );
    }
  };

  return <div className={styles["group-details"]}>{renderDetails()}</div>;
}

export default GroupDetails;
