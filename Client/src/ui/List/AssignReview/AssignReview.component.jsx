import React from "react";
import styles from "./AssignReview.module.scss";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DataItem from "../../Item/DataItem/DataItem.component";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
function AssignReview({
  isOpenReview,
  mentors,
  councils,
  groups,
  onRemoveMentor,
  onRemoveGroup,
  onRemoveCouncil,
}) {
  return isOpenReview ? (
    <div className={styles["assign-review"]}>
      <div className={styles["down-icon-container"]}>
        <LoopOutlinedIcon className={styles["down-icon"]} fontSize="large" />
        <LoopOutlinedIcon className={styles["down-icon"]} fontSize="large" />
      </div>
      <div className={styles["review"]}>
        {typeof mentors !== "undefined" ? (
          <div className={styles["mentors-container"]}>
            {mentors.map((mentor, index) => {
              return (
                <div key={index} className={styles["item"]}>
                  <DataItem
                    type={"lecturer"}
                    data={mentor}
                    handleClickOnLecturer={() => onRemoveMentor(mentor, index)}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        {typeof councils !== "underfined" ? (
          <div className={styles["mentors-container"]}>
            {councils.map((council, index) => {
              return (
                <div key={index} className={styles["item"]}>
                  <DataItem
                    type={"council"}
                    data={council}
                    handleClickOnCouncil={() => onRemoveCouncil(council, index)}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        <div className={styles["plus-icon"]}>
          <AddBoxOutlinedIcon fontSize="large" />
        </div>
        <div className={styles["groups-container"]}>
          {groups.map((group, index) => {
            return (
              <div key={index} className={styles["item"]}>
                <DataItem
                  type={"groups"}
                  data={group}
                  handleClickOnGroup={() => onRemoveGroup(group, index)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AssignReview;
