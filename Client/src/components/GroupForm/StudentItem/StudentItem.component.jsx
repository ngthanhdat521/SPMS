import React from "react";
import RoundedAvatar from "../../../ui/Avatar/RoundedAvatar/RoundedAvatar.component";
import style from "./StudentItem.module.scss";
function StudentItem({ student }) {
  return (
    <div className={style["student-item"]}>
      <div className={style["avatar"]}>
        <RoundedAvatar name={student.lastName + " " + student.firstName} />
      </div>
      <div className={style["item-content"]}>
        <div className={style["item-header"]}>
          <div>
            <span onClick={(student) => console.log(student)}>
              {student.lastName + " " + student.firstName}
            </span>
          </div>
          <div>
            <span>{student.gpa}</span>
          </div>
        </div>
        <span className={style["stucode"]}>{student.stuCode}</span>
      </div>
    </div>
  );
}

export default StudentItem;
