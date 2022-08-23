import React from "react";
import AssignMentorItem from "../AssignMentorItem/AssignMentorItem.component";
import styles from "./AssignReview.module.scss";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DataItem from "../../../ui/Item/DataItem/DataItem.component";
function AssignReview({ mentors, groups, onRemoveMentor, onRemoveGroup }) {
  return (
    <div className={styles["assign-review"]}>
      <div className={styles["mentors-container"]}>
        {mentors.map((mentor, index) => {
          return (
            <div key={index} className={styles["item"]}>
              <DataItem 
              type={"lecturer"}
              data={mentor}
              handleClickOnLecturer={() => onRemoveMentor(mentor, index)}
              />
              {/* <AssignMentorItem
                key={index}
                type={"mentors"}
                itemData={mentor}
                handleClickOnMentor={() => onRemoveMentor(mentor, index)}
              /> */}
            </div>
          );
        })}
      </div>
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
              {/* <AssignMentorItem
                key={index}
                type={"groups"}
                itemData={group}
                handleClickOnGroup={() => onRemoveGroup(group, index)}
              /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AssignReview;
