import React from "react";
import GradeRow from "../GradeRow/GradeRow.component";
import styles from "./GradeForm.module.scss";
import DefaultTheme from "../../../../theme/DefaultTheme";
function GradeForm({
  numberOfStudent,
  grade,
  gradeRows,
  calcEachCriteria,
  handleMark,
  handleContriEvaluation,
  calcTeamGrade,
  calcTeamGradeOf,
  finalTeamGrade,
}) {
  return (
    <div className={styles["grade-form"]}>
      <table className={styles["table"]}>
        <tr>
          <th className={`${styles["deliverable"]} default-bg`} rowSpan={2}>
            Deliverable
          </th>
          <th className={`${styles["criteria"]} default-bg`}>Criteria</th>
          <th className={`${styles["team"]} default-bg`} rowSpan={2}>
            Team
          </th>
          <th className={`${styles["members"]} default-bg`} colSpan={5}>
            Team member
          </th>
        </tr>
        <tr>
          <th className={`${styles["criteria"]} default-bg`}>Scale 1-10</th>
          <th className={`${styles["member"]} default-bg`}>1</th>
          <th className={`${styles["member"]} default-bg`}>2</th>
          <th className={`${styles["member"]} default-bg`}>3</th>
          <th className={`${styles["member"]} default-bg`}>4</th>
          <th className={`${styles["member"]} default-bg`}>5</th>
        </tr>
      </table>
      {gradeRows.map((gradeRow, index) => {
        return (
          <GradeRow
            numberOfStudent={numberOfStudent}
            key={index}
            deliverable={gradeRow.deliverable}
            criteria={gradeRow.criteria}
            shortName={gradeRow.shortName}
            grade={grade[index]}
            teamGrade={calcTeamGrade(index)}
            teamGradeOf={calcTeamGradeOf(index)}
            handleMark={(event, i) => {
              let position = "";
              if (i === 0) position = "first";
              if (i === 1) position = "second";
              if (i === 2) position = "third";
              if (i === 3) position = "fourth";
              if (i === 4) position = "fifth";

              handleMark(
                event,
                position,
                index,
                index === 2 || index === 5 ? 10 : 20
              );
            }}
          />
        );
      })}
      <GradeRow
        numberOfStudent={numberOfStudent}
        deliverable={"Contribution(*)"}
        criteria={"Team member contributed significantly to team's success (%)"}
        isShowGradeOf={false}
        handleMark={(event, i) => {
          let position = "";
              if (i === 0) position = "first";
              if (i === 1) position = "second";
              if (i === 2) position = "third";
              if (i === 3) position = "fourth";
              if (i === 4) position = "fifth";
          handleContriEvaluation(event, position);
        }}
      />
      <table className={styles["table"]}>
        <tr>
          <th className={`${styles["final-grade"]} default-bg`} colSpan={2}>
            Final Grade
          </th>
          <th className={`${styles["team"]} default-bg`}>
            {finalTeamGrade}
          </th>
          <th className={`${styles["member"]} default-bg`}>
            {calcEachCriteria("first")}
          </th>
          <th className={`${styles["member"]} default-bg`}>
            {calcEachCriteria("second")}
          </th>
          <th className={`${styles["member"]} default-bg`}>
            {calcEachCriteria("third")}
          </th>
          <th className={`${styles["member"]} default-bg`}>
            {calcEachCriteria("fourth")}
          </th>
          <th className={`${styles["member"]} default-bg`}>
            {calcEachCriteria("fifth")}
          </th>
        </tr>
      </table>
    </div>
  );
}

export default GradeForm;
