import {useState} from "react";
import styles from "./GroupItem.module.scss";
import RoundedAvatar from "../../../ui/Avatar/RoundedAvatar/RoundedAvatar.component";
import GroupDetails from "../GroupDetails/GroupDetails.component";

function GroupItem({ type, data}) {
    const [isOpenGroupDetails, setIsOpenGroupDetails] = useState(false);
    const [isOpenMentorDetails, setIsOpenMentorDetails] = useState(false);
  
    const openGroupDetails = () =>{
      setIsOpenGroupDetails(!isOpenGroupDetails);
    }
    const openMentorDetails = () =>{
      setIsOpenMentorDetails(!isOpenMentorDetails);
    }
const renderList = () => {
    if (type === "group") {
      return (
        <div>
          <div
            onClick={() => openGroupDetails()}
            className={styles["member-line"]}
          >
            <div className={styles["avatar"]}>
              <RoundedAvatar
                name={data.userInfo.lastName + " " + data.userInfo.firstName}
              />
            </div>
            <div className={styles["info"]}>
              <p className={styles["name"]}>
                {data.userInfo.lastName + " " + data.userInfo.firstName}
              </p>
              <p>{data.studentInfo.stuCode}</p>
            </div>
          </div>
          <div>
            {isOpenGroupDetails ? (
              <GroupDetails type={"member"} data={data} />
            ) : (
              ""
            )}
          </div>
        </div>
      );
    } else if (type === "mentor") {
      return (
        <div>
          <div
              onClick={() => openMentorDetails()}
            className={styles["mentor-line"]}
          >
            <div className={styles["avatar"]}>
              <RoundedAvatar name={data.lastName + " " + data.firstName} />
            </div>
            <div className={styles["info"]}>
              <p className={styles["name"]}>
                {data.lastName + " " + data.firstName}
              </p>
              <p>{data.depName}</p>
            </div>
          </div>
          <div>
          {isOpenMentorDetails ? (
            <GroupDetails type={"mentor"} data={data} />
          ) : (
            ""
          )}
        </div>
        </div>
      );
    }
  };
  return <div className={styles["group-item"]}>{renderList()}</div>;
}

export default GroupItem;
