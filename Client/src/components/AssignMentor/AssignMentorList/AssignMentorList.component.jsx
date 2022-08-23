import React from "react";
import AssignMentorItem from "../AssignMentorItem/AssignMentorItem.component";
import styles from "./AssignMentorList.module.scss";
import TextField from "@mui/material/TextField";
import DataItem from "../../../ui/Item/DataItem/DataItem.component";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

function AssignMentorList({
  type,
  data,
  handleChange,
  handleClickOnGroup,
  handleClickOnMentor,
}) {
  const handleType = () => {
    if (type === "mentors") {
      return data.map((mentor, index) => {
        return (
          <div className={styles["item"]}>
            <div key={index} className={styles["mentor-content"]}>
              {/* <AssignMentorItem
                key={index}
                type={"mentors"}
                itemData={mentor}
                handleClickOnMentor={() => handleClickOnMentor(mentor)}
              /> */}
              <DataItem
                type={"lecturer"}
                data={mentor}
                handleClickOnLecturer={() => handleClickOnMentor(mentor)}
              />
            </div>
          </div>
        );
      });
    } else if (type === "groups") {
      return data.map((group, index) => {
        return (
          <div className={styles["item"]}>
            <div key={index} className={styles["group-content"]}>
              {/* <AssignMentorItem
                key={index}
                type={"groups"}
                itemData={group}
                handleClickOnGroup={() => handleClickOnGroup(group)}
              /> */}
              <DataItem
                type={"groups"}
                data={group}
                handleClickOnGroup={() => handleClickOnGroup(group)}
              />
            </div>
          </div>
        );
      });
    }
  };
  return (
    <div className={styles["assign-mentor-list"]}>
      <div>
        <TextField
          className={styles["search-bar"]}
          id="standard-search"
          label="Search field"
          variant="standard"
          name="password"
          autoComplete="off"
          type="text"
          onChange={(e) => handleChange(e)}
        />
      </div>
      {handleType()}
      <div></div>
    </div>
  );
}

export default AssignMentorList;