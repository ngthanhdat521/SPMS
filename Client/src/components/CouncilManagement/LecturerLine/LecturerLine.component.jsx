import {useState, useEffect} from "react";
import RoundedAvatar from "../../../ui/Avatar/RoundedAvatar/RoundedAvatar.component";
import styles from "./LecturerLine.module.scss";
import RoleAssigner from "../../../ui/Form/RoleAssigner/RoleAssigner.component";
import TextBox from "../../../ui/Form/Textbox/Textbox.component";
import { axios } from "../../../services/HttpClient/HttpClient";

function LecturerLine({
  lecturer,
  roleSelection,
  handleClickOnLecturer,
  selectRole,
  enterWorkUnit,
}) {
  const [roles, setRoles] = useState([]);

  const getAllRoles = async() => {
    let {data, ok, status } = await axios({
        url: "/api/role/council/list",
        method: "get",
    });
    if(ok && status === 200) {
      setRoles(data);
    }
    else console.log("get roles failed");
  }
  useEffect(async () =>{
    await getAllRoles();
  },[])

  return (
    <div className={styles["lecturer-line-component"]}>
      <div className={styles["lecturer-line"]}>
        <div
          onClick={() => {
            handleClickOnLecturer(lecturer);
          }}
          className={styles["line"]}
        >
          <div className={styles["avatar"]}>
            <RoundedAvatar
              name={lecturer.lastName + " " + lecturer.firstName}
            />
          </div>
          <div className={styles["lecturer-info"]}>
            <p className={styles["name"]}>
              {lecturer.lastName + " " + lecturer.firstName}
            </p>
            <p className={styles["depName"]}>{lecturer.depName}</p>
          </div>
        </div>
        {roleSelection ? (
          <div className={styles["role-selection"]}>
            <RoleAssigner
              roles={roles}
              onChange={(event) => selectRole(event)}
              defaultValue={lecturer.roleId}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles["work-unit"]}>
        <TextBox defaultValue={lecturer.workUnit} placeholder={"Duy Tan University"} onChange={enterWorkUnit} />
      </div>
    </div>
  );
}

export default LecturerLine;
