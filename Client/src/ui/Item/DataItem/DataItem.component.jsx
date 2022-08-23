import { useState } from "react";
import styles from "./DataItem.module.scss";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import RoundedAvatar from "../../../ui/Avatar/RoundedAvatar/RoundedAvatar.component";
import ItemDetails from "../ItemDetails/ItemDetails.component";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
function DataItem({
  type,
  data,
  handleClickOnLecturer,
  handleClickOnGroup,
  handleClickOnCouncil
}) {
  const [isOpenLecturerDetails, setIsOpenLecturerDetails] = useState(false);
  const [isOpenGroupDetails, setIsOpenGroupDetails] = useState(false);
  const [isOpenCouncilDetails, setIsOpenCouncilDetails] = useState(false);

  const handleViewDetails = () => {
    setIsOpenLecturerDetails(!isOpenLecturerDetails);
    setIsOpenGroupDetails(!isOpenGroupDetails);
    setIsOpenCouncilDetails(!isOpenCouncilDetails);
  };
  const handleType = () => {
    if (type === "lecturer") {
      return (
        <div className="w-100">
          <div className={styles["item"]}>
            <div
              onClick={() => handleClickOnLecturer(data)}
              className={styles["lecturer-content"]}
            >
              <div className={styles["avatar"]}>
                <RoundedAvatar
                  name={data.lastName + " " + data.firstName}
                />
              </div>
              <div className={styles["lecturer-info"]}>
                <div>
                  <span className={styles["lecturer-name"]}>
                    {data.lastName + " " + data.firstName}
                  </span>
                </div>
                <div>
                  <span className={styles["lecturer-dep"]}>{data.depName}</span>
                </div>
              </div>
            </div>
            <div
              onClick={() => handleViewDetails()}
              className={styles["dropdown-icon"]}
            >
              {isOpenLecturerDetails ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
            </div>
          </div>
          <div className={styles["details-container"]}>
            {isOpenLecturerDetails ? (
              <div className={styles["details"]}>
                <ItemDetails type={"lecturer"} data={data} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    } else if (type === "groups") {
      return (
        <div className="w-100">
          <div className={styles["item"]}>
            <div
              onClick={() => handleClickOnGroup(data)}
              className={styles["group-content"]}
            >
              <div>
                <span className={styles["group-name"]}>{data.name}</span>
                {data.isScientificGroup ? (
                  <span className={styles["type"]}> (Scientific Group)</span>
                ) : (
                  ""
                )}
              </div>
              <div>
                <span className={styles["group-desc"]}>{data.note}</span>
              </div>
            </div>
            <div
              onClick={() => handleViewDetails()}
              className={styles["dropdown-icon"]}
            >
              {isOpenGroupDetails ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
            </div>
          </div>
          <div className={styles["details-container"]}>
            {isOpenGroupDetails ? (
              <div className={styles["details"]}>
                <ItemDetails type={"group"} data={data} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      else if (type === "council") {
        return (
          <div className="w-100">
            <div className={styles["item"]}>
              <div
                onClick={() => handleClickOnCouncil(data)}
                className={styles["council-content"]}
              >
                <div>
                  <span className={styles["council-name"]}>{data.council.councilName}</span>
                </div>
                <div>
                  <span className={styles["council-desc"]}>{data.council.councilDesc}</span>
                </div>
              </div>
              <div
                onClick={() => handleViewDetails()}
                className={styles["dropdown-icon"]}
              >
              {isOpenCouncilDetails ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
              </div>
            </div>
            <div className={styles["details-container"]}>
              {isOpenCouncilDetails ? (
                <div className={styles["details"]}>
                  <ItemDetails type={"council"} data={data} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        );
    }
    
  };
  return <div className={styles["data-item"]}>{handleType()}</div>;
}

export default DataItem;