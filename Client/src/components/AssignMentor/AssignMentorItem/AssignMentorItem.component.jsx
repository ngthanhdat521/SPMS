import { useState } from "react";
import styles from "./AssignMentorItem.module.scss";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ItemDetails from "../ItemDetails/ItemDetails.component";
import RoundedAvatar from "../../../ui/Avatar/RoundedAvatar/RoundedAvatar.component";
function AssignMentorItem({
  type,
  itemData,
  handleClickOnMentor,
  handleClickOnGroup,
}) {
  const [isOpenGroupDetails, setIsOpenGroupDetails] = useState(false);
  const [isOpenMentorDetails, setIsOpenMentorDetails] = useState(false);

  const handleViewDetails = (itemData) => {
    setIsOpenMentorDetails(!isOpenMentorDetails);
    setIsOpenGroupDetails(!isOpenGroupDetails);
  };
  const handleType = () => {
    if (type === "mentors") {
      return (
        <div className="w-100">
          <div className={styles["item"]}>
            <div
              onClick={() => handleClickOnMentor(itemData)}
              className={styles["mentor-content"]}
            >
              <div className={styles["avatar"]}>
                <RoundedAvatar
                  name={itemData.lastName + " " + itemData.firstName}
                />
              </div>
              <div>
                <div>
                  <span className={styles["mentor-name"]}>
                    {itemData.lastName + " " + itemData.firstName}
                  </span>
                </div>
                <div>
                  <span className={styles["note"]}>{itemData.depName}</span>
                </div>
              </div>
            </div>
            <div
              onClick={() => handleViewDetails(itemData)}
              className={styles["dropdown-icon"]}
            >
              <ArrowDropDownOutlinedIcon />
            </div>
          </div>
          <div className={styles["details-container"]}>
            {isOpenMentorDetails ? (
              <div className={styles["details"]}>
                <ItemDetails type={"mentor"} data={itemData} />
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
              onClick={() => handleClickOnGroup(itemData)}
              className={styles["group-content"]}
            >
              <div>
                <span className={styles["group-name"]}>{itemData.name}</span>
                {itemData.isScientificGroup ? (
                  <span className={styles["type"]}> (Scientific Group)</span>
                ) : (
                  ""
                )}
              </div>
              <div>
                <span className={styles["note"]}>{itemData.note}</span>
              </div>
            </div>
            <div
              onClick={() => handleViewDetails(itemData)}
              className={styles["dropdown-icon"]}
            >
              <ArrowDropDownOutlinedIcon />
            </div>
          </div>
          <div className={styles["details-container"]}>
            {isOpenGroupDetails ? (
              <div className={styles["details"]}>
                <ItemDetails type={"group"} data={itemData} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    }
  };
  return <div className={styles["assign-mentor-item"]}>{handleType()}</div>;
}

export default AssignMentorItem;
