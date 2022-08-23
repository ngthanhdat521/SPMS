import React from "react";
import styles from "./AssignCouncilList.module.scss";
import DataItem from "../../../ui/Item/DataItem/DataItem.component";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import TwoBox from "../../../ui/TwoBox/TwoBox.component";
import LoadingWhiteBox from "../../../ui/Loading/LoadingWhiteBox/LoadingWhiteBox.component";

function AssignCouncilList({
  councils,
  groups,
  isLoadingCouncils = true,
  isLoadingGroups = true,
  firstOnSearch,
  secondOnSearch,
  handleClickOnCouncil,
  handleClickOnGroup,
}) {
  return (
    <div className={styles["assign-council-list"]}>
      <TwoBox
        firstIsSearchFunction={true}
        firstOnSearch={(e) => firstOnSearch(e)}
        secondIsSearchFunction={true}
        secondOnSearch={(e) => secondOnSearch(e)}
      >
        <div>
          {isLoadingCouncils ? (
            <LoadingWhiteBox />
          ) : (
            councils.map((council, index) => {
              return (
                <div
                  key={index}
                  className={`${styles["item"]} ${
                    council.isSelected ? styles["selected"] : ""
                  }`}
                >
                  <DataItem
                    type={"council"}
                    data={council}
                    handleClickOnCouncil={() =>
                      handleClickOnCouncil(council, index)
                    }
                  />
                </div>
              );
            })
          )}
        </div>
        <div>
          <AddBoxOutlinedIcon fontSize="large" />
        </div>
        <div>
          {isLoadingGroups ? (
            <LoadingWhiteBox />
          ) : (
            groups.map((group, index) => {
              return (
                <div className={styles["item"]}>
                  <div
                    key={index}
                    className={`${styles["group-content"]} ${
                      group.isSelected ? styles["selected"] : ""
                    }`}
                  >
                    <DataItem
                      type={"groups"}
                      data={group}
                      handleClickOnGroup={() =>
                        handleClickOnGroup(group, index)
                      }
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </TwoBox>
    </div>
  );
}

export default AssignCouncilList;
