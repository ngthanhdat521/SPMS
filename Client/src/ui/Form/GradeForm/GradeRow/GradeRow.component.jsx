import { useState } from "react";
import ErrorNumberbox from "../../ErrorNumberBox/ErrorNumberBox.component";
import Textbox from "../../Textbox/Textbox.component";
import styles from "./GradeRow.module.scss";
function GradeRow({
  numberOfStudent,
  deliverable,
  criteria,
  shortName,
  grade,
  teamGrade,
  teamGradeOf,
  handleMark,
  isShowGradeOf = true,
}) {
  return (
    <div className={styles["grade-row"]}>
      <table className={styles["grade-table"]}>
        <tr className={styles["grade"]}>
          <td className={styles["deliverable"]} rowSpan={2}>
            {deliverable}
          </td>
          <td className={styles["criteria"]}>{criteria}</td>
          <td className={styles["team"]}>{teamGrade}</td>
          {Array(5)
            .fill(0)
            .map((n, i) => {
              if (i < numberOfStudent)
                return (
                  <td className={styles["members"]}>
                    <ErrorNumberbox
                      onChange={(event) => handleMark(event, i)}
                      max={isShowGradeOf ? 10 : 100}
                      // className={styles["grade-input"]}
                    />
                  </td>
                );
              else return <td className={styles["faded"]}></td>;
            })}
        </tr>
        {isShowGradeOf ? (
          <tr className={styles["avg-grade"]}>
            <td className={styles["short-name"]}>Grade of {shortName}</td>
            <td className={styles["team"]}>{teamGradeOf}</td>
            <td className={styles["members"]}>{grade.first}</td>
            <td className={styles["members"]}>{grade.second}</td>
            <td className={styles["members"]}>{grade.third}</td>
            <td className={styles["members"]}>{grade.fourth}</td>
            <td className={styles["members"]}>{grade.fifth}</td>
          </tr>
        ) : (
          ""
        )}
      </table>
    </div>
  );
}

export default GradeRow;
