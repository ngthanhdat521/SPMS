import React, { useEffect, useState } from "react";
import Body from "../../../../components/Body/Body.component";
import List from "../../../../components/CouncilManagement/List/List.component";
import Header from "../../../../components/Header/Header.component";
import BasicBox from "../../../../ui/Container/BasicBox/BasicBox.component";
import HeaderSearch from "../../../../ui/Form/HeaderSearch/HeaderSearch.component";
import ListCard from "../../../../ui/List/ListCard/ListCard.component";
import styles from "./CouncilManagement.module.scss";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import ListServices from "../../../../services/Supporter/List/List";
import CouncilServices from "../../../../services/Supporter/Council/Council";
import BasicSnackbar from "../../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";
import TopicTab from "../../../../ui/Tab/TopicTab/TopicTab.component";
import { useSelector } from "react-redux";

function CouncilManagement() {
  const [councils, setCouncils] = useState([]);
  const user = useSelector(s => s.user);
  const [defaultCouncils, setDefaultCouncils] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({
    isOpen: false,
    content: "",
  });

  const loadListCouncils = async () => {
    let { data, isSucess } = await CouncilServices.load();
    if (isSucess) {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      const info = JSON.parse(localStorage.getItem("info"));
      let sortData = ListServices.sortWithObject(
        data,
        "councilName",
        "council"
      );
      if(userInfo.roleUser.includes("mentor")) sortData = sortData.filter((council) => 
         council.mentors.findIndex((mentor) => mentor.userId === userInfo.userId) >= 0 || council.detailMembers.findIndex((member) => member.lecturerId === info.lecturerId) >= 0
      );
      if(userInfo.roleUser.includes("student")) sortData = sortData.filter((council) => council.students.findIndex((student) => student.userInfo.userId === userInfo.userId) >= 0);
      setCouncils(sortData);
      setDefaultCouncils(sortData);
      setIsLoading(false);
    }
  };
  useEffect(async () => {
    await loadListCouncils();
  }, []);

  const handleTab = (event, newTab) => {
    console.log(newTab);
    if (newTab === 0) setCouncils(defaultCouncils);
    else {
      let newCouncils = [...defaultCouncils];
      newCouncils = newCouncils.filter(
        (council) => council.group.typeCapstone === newTab
      );
      setCouncils(newCouncils);
    }
  };

  const deleteCouncil = async (council, index) => {
    let { data, isSucess, message } = await CouncilServices.deleteCouncil(
      council.council.councilId
    );
    setMessage(message);
    if (isSucess) {
      let newCouncils = [...councils];
      newCouncils.splice(index, 1);
      setCouncils(newCouncils);
    }
  };

  return (
    <div className={styles["council-management"]}>
      <BasicSnackbar
        isOpen={message.isOpen}
        content={message.content}
        onClose={() => setMessage({ content: "", isOpen: false })}
      />
      <Header>
        <h5>CounCil Management</h5>
        <HeaderSearch placeholder={"Search Council"} />
      </Header>
      <Body>
        <BasicBox>
          <div className="row mb-5">
            <div className="col-xl-2 col-lg-12">
              <h5>{councils.length} Councils</h5>
            </div>
            <div className="col-xl-10 col-lg-12">
              {
                user.roleUser.includes("moderator") && 
                <div className={styles["council-management_btn-box"]}>
                  <div
                    className={`${styles["council-management_btn-box_event"]} d-flex mb-2 justify-content-center`}
                  >
                    <Button className="mr-2" variant="contained">
                      <NavLink to="/dashboard/council-form?type=add">
                        Add Council
                      </NavLink>
                    </Button>
                    <Button className="mr-2" variant="contained">
                      <NavLink to="/dashboard/assign-council">
                        Assign Council
                      </NavLink>
                    </Button>
                    <Button variant="contained">Export</Button>
                  </div>
                  <div className={`d-flex mb-2 justify-content-center`}>
                    <TopicTab onChange={handleTab} />
                  </div>
              </div>
              }
              
            </div>
          </div>
          <ListCard>
            <List
              councils={councils}
              isLoading={isLoading}
              deleteCouncil={(council, index) => deleteCouncil(council, index)}
            />
          </ListCard>
        </BasicBox>
      </Body>
    </div>
  );
}

export default CouncilManagement;
