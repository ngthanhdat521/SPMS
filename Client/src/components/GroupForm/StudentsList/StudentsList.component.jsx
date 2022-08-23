import React from "react";
import StudentItem from "../StudentItem/StudentItem.component";
import style from "./StudentsList.module.scss";
import TextField from "@mui/material/TextField";
import LoadingWhiteBox from "../../../ui/Loading/LoadingWhiteBox/LoadingWhiteBox.component";

function StudentsList({
  isLoading,
  students,
  typeCapstone,
  isSearchFunction,
  handleClick,
  rankingValue,
  searchStudents,
}) {
  const isFiltered = (student) => {
    switch (rankingValue) {
      case "excellent":
        return 3.6 <= student.gpa && student.gpa <= 4.0;
      case "veryGood":
        return 3.2 <= student.gpa && student.gpa <= 3.59;
      case "good":
        return 2.5 <= student.gpa && student.gpa <= 3.19;
      case "average":
        return 2 <= student.gpa && student.gpa <= 2.49;
      default:
        return true;
    }
  };
  return (
    <div className={style["students-list"]}>
      {isSearchFunction ? (
        <TextField
          id="standard-search"
          variant="standard"
          label="Search field"
          name="password"
          autoComplete="off"
          type="text"
          className={style["search-bar"]}
          placeholder={"Student name"}
          onChange={(e) => searchStudents(e)}
        />
      ) : (
        ""
      )}
      {isLoading ? (
        <LoadingWhiteBox />
      ) : (
        students.map((student, index) => {
          if (typeCapstone === student.typeCapstone - 1) {
            return isFiltered(student) ? (
              <div
                className={style["student-line"]}
                key={index}
                onClick={() => {
                  handleClick(student, index);
                }}
              >
                <StudentItem student={student}></StudentItem>
              </div>
            ) : (
              ""
            );
          } else return "";
        })
      )}
    </div>
  );
}

export default StudentsList;