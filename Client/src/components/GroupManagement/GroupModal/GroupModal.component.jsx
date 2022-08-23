import { useState } from "react";
import styles from "./GroupModal.module.scss";
import RoundedAvatar from "../../../ui/Avatar/RoundedAvatar/RoundedAvatar.component";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import GroupDetails from "../GroupDetails/GroupDetails.component";
import GroupItem from "../GroupItem/GroupItem.component";
function GroupModal({
  isOpenModal,
  handleCloseModal,
  note,
  name,
  startDate,
  endDate,
  typeCapstone,
  isScientificGroup,
  students,
  mentors,
}) {
  if (isOpenModal) {
    return (
      <div className={styles["group-modal-container"]}>
        <div className={styles["group-modal"]}>
          <div prevent className={styles["modal"]}>
            <div className={styles["modal-header"]}>
              <div>
                <h2>{name}</h2>
              </div>
              <div>
                <DisabledByDefaultOutlinedIcon
                  onClick={() => handleCloseModal()}
                  className={styles["close-button"]}
                />
              </div>
            </div>
            <div className={styles["modal-body"]}>
              <div>
                <p className="mb-1">{`Capstone ${typeCapstone} (${
                  isScientificGroup ? "Scientific Research" : "Normal"
                })`}</p>
                <span className="light-text">{note}</span>
              </div>
              <div className={styles["modal-list"]}>
                <div className={styles["member-list"]}>
                  <div className={styles["list-title"]}>
                    <p>Members: </p>
                  </div>
                  {students.map((student) => {
                    return (
                      <div className={styles["item-line"]}>
                        <GroupItem type={"group"} data={student} />
                      </div>
                    );
                  })}
                </div>
                <div className={styles["mentor-list"]}>
                  <div className={styles["list-title"]}>
                    <p>Mentors: </p>
                  </div>
                  {mentors.map((mentor) => {
                    return (
                      <div className={styles["item-line"]}>
                        <GroupItem type={"mentor"} data={mentor} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else return "";
}

export default GroupModal;
