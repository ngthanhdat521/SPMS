import React from "react";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import styles from "./CouncilModal.module.scss";
import CouncilItem from "../CouncilItem/CouncilItem.component";
import DateConverter from "../../../services/Converter/DateConverter";

function CouncilModal({ council, isOpenModal, handleCloseModal }) {
  if (isOpenModal) {
    return (
      <div className={styles["council-modal-container"]}>
        <div className={styles["council-modal"]}>
          <div className={styles["modal"]}>
            <div className={styles["modal-item"]}>
              <h4>{council.council.councilName}</h4>
              <p>{council.council.councilDesc}</p>
            </div>
            <div className={styles["modal-item"]}>
              <h4>{council.group?.groupName || "Empty"}</h4>
              <p>{council.group?.groupDesc || "Empty"}</p>
            </div>
            <div className={styles["close-item"]}>
              <DisabledByDefaultOutlinedIcon
                onClick={() => handleCloseModal()}
                className={styles["close-button"]}
              />
            </div>
          </div>
          <div className={styles["modal"]}>
            <div className={styles["modal-item"]}>
              <div className={styles["modal-list"]}>
                <p className={styles["members"]}>Members: </p>
                {council.detailMembers.map((member) => {
                  return <CouncilItem type={"member"} data={member} />;
                })}
              </div>
            </div>

            <div className={styles["modal-item"]}>
              <div className={styles["modal-list"]}>
                <p className={styles["members"]}>Members: </p>
                {council.students.map((student) => {
                  return <CouncilItem type={"student"} data={student} />;
                })}
              </div>
            </div>
          </div>

          <div className={styles["modal-footer"]}>
            <span className={styles["location"]}>
              {council.council.location}
            </span>
            <span className={styles["time"]}>
              {DateConverter.parseShortDateTime(council.council.time)}
            </span>
          </div>
        </div>
      </div>
    );
  } else return "";
}

export default CouncilModal;
