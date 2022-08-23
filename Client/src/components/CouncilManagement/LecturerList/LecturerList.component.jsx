import React from "react";
import LecturerLine from "../LecturerLine/LecturerLine.component";
import styles from "./LecturerList.module.scss";
import TwoBox from "../../../ui/TwoBox/TwoBox.component";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import DataItem from "../../../ui/Item/DataItem/DataItem.component";
import LoadingWhiteBox from "../../../ui/Loading/LoadingWhiteBox/LoadingWhiteBox.component";
function LecturerList({
  isLoading = true,
  lecturers,
  selectedLecturers,
  addLecturer,
  removeLecturer,
  firstOnSearch,
  selectRole,
  enterWorkUnit,
}) {
  return (
    <TwoBox
      firstIsSearchFunction={true}
      firstOnSearch={(e) => firstOnSearch(e)}
      secondIsSearchFunction={false}
    >
      <div>
        {isLoading ? (
          <LoadingWhiteBox />
        ) : (
          lecturers.map((lecturer, index) => {
            return (
              <div key={index} className={styles["lecturer-line"]}>
                <DataItem
                  type={"lecturer"}
                  data={lecturer}
                  handleClickOnLecturer={() => addLecturer(lecturer, index)}
                />
              </div>
            );
          })
        )}
      </div>
      <div>
        <RepeatOutlinedIcon fontSize="large" />
      </div>
      <div>
        {selectedLecturers.map((lecturer, index) => {
          return (
            <div key={index} className={styles["lecturer-line"]}>
              <LecturerLine
                lecturer={lecturer}
                roleSelection={true}
                handleClickOnLecturer={(lecturer, index) =>
                  removeLecturer(lecturer, index)
                }
                selectRole={(event) => selectRole(event, index)}
                enterWorkUnit={(event) => enterWorkUnit(event, index)}
              />
            </div>
          );
        })}
      </div>
    </TwoBox>
  );
}

export default LecturerList;
