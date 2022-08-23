import { useEffect, useState } from "react";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import HeaderSearch from "../../../../ui/Form/HeaderSearch/HeaderSearch.component";
import AssignCouncilList from "../../../../components/AssignCouncil/AssignCouncilList/AssignCouncilList.component";
import GroupServices from "../../../../services/Supporter/Group/Group";
import CouncilServices from "../../../../services/Supporter/Council/Council";
import List from "../../../../services/Supporter/List/List";
import styles from "./AssignCouncil.module.scss";
import Button from "@mui/material/Button";
import BasicSnackbar from "../../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";
function AssignCouncil() {
  const [councils, setCouncils] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoadingCouncils, setIsLoadingCouncils] = useState(true);
  const [isLoadingGroups, setIsLoadingGroups] = useState(true);
  const [searchTermCouncils, setSearchTermCouncils] = useState("");
  const [searchTermGroups, setSearchTeamGroups] = useState("");
  const [message, setMessage] = useState({
    isOpen: false,
    content: "",
  });
  const [assignData, setAssignData] = useState({
    councilId: "",
    groupId: "",
  });
  const loadGroups = async () => {
    let { data, isSucess } = await GroupServices.load();
    if (isSucess) {
      //handle only load groups that have mentors and haven't assigned to any council
      let filterData = [];
      filterData = data.filter((item) => {
        return item.mentors.length !== 0;
      });
      filterData = data.filter((item) => {
        return item.councilId === null;
      });
      setGroups(List.sort(filterData, "name"));
      setIsLoadingGroups(false);
    }
  };
  const loadListCouncils = async () => {
    let { data, isSucess } = await CouncilServices.loadDefenseToAssign();
    if (isSucess) {
      setCouncils(List.sortWithObject(data, "councilName", "council"));
      setIsLoadingCouncils(false);
    }
  };
  useEffect(async () => {
    await loadGroups();
    await loadListCouncils();
  }, []);

  useEffect(() => {
    setGroups(List.sort(groups, "name"));
    setCouncils(List.sort(councils, "councilName"));
  }, []);

  const selectCouncil = (council, index) => {
    let newCouncils = [...councils];
    newCouncils = List.selectOneLine(newCouncils, index);
    setCouncils(newCouncils);
  };
  const selectGroup = (group, index) => {
    let newGroups = [...groups];
    newGroups = List.selectOneLine(newGroups, index);
    setGroups(newGroups);
  };

  const deleteSelected = () => {
    let newCouncils = [...councils];
    newCouncils = List.deleteSelected(newCouncils);
    setCouncils(newCouncils);

    let newGroups = [...groups];
    newGroups = List.deleteSelected(newGroups);
    setGroups(newGroups);
  };

  const assignCouncil = () => {
    let canAssign = true;
    let newAssignData = assignData;
    let council = councils.find((council) => {
      return council.isSelected === true;
    });
    let group = groups.find((group) => {
      return group.isSelected === true;
    });
    council.detailMembers.forEach(member => {
      group.mentors.forEach(mentor => {
        if(member.lecturerId === mentor.lecturerId){
          setMessage({ content: `${member.firstName} ${member.lastName} (${member.roleName}) is a mentor of group ${group.name}`, isOpen: true });
          canAssign = false;
        }
      })
    })
    newAssignData.councilId = council.council.councilId;
    newAssignData.groupId = group.groupId;
    setAssignData(newAssignData);
    return canAssign;
  };

  const submitAssignData = async () => {
    if(assignCouncil()){
      let { data, isSucess } = await CouncilServices.assignCouncil(assignData);
      if (isSucess) {
        setMessage({ content: "Assign successfully!", isOpen: true });
        deleteSelected();
      } else {
        setMessage({ content: "Assign failed!", isOpen: true });
      }
    }
    console.log(assignData);
  };

  return (
    <div className={styles["assign-council"]}>
      <BasicSnackbar
        isOpen={message.isOpen}
        content={message.content}
        onClose={() => setMessage({ content: "", isOpen: false })}
      />
      <Header>
        <h5>Assign Council</h5>
        <HeaderSearch placeholder={"Search Council"} />
      </Header>
      <Body>
        <AssignCouncilList
          isLoadingCouncils={isLoadingCouncils}
          isLoadingGroups={isLoadingGroups}
          councils={List.searchWithObject(
            councils,
            searchTermCouncils,
            "councilName",
            "council"
          )}
          groups={List.searchByName(groups, searchTermGroups, "name")}
          firstOnSearch={(e) => setSearchTermCouncils(e.target.value)}
          secondOnSearch={(e) => setSearchTeamGroups(e.target.value)}
          handleClickOnCouncil={selectCouncil}
          handleClickOnGroup={selectGroup}
        ></AssignCouncilList>
        <div className={styles["button-container"]}>
          <Button onClick={submitAssignData} variant="contained">
            Submit
          </Button>
        </div>
      </Body>
    </div>
  );
}

export default AssignCouncil;