import { useState, useEffect } from "react";
import styles from "./AssignMentor.module.scss";
import { axios } from "../../../../services/HttpClient/HttpClient";
import GroupService from "../../../../services/Supporter/Group/Group";
import LecturerAccount from "../../../../services/Supporter/LecturerAccount/LecturerAccount";
import AssignMentorList from "../../../../components/AssignMentor/AssignMentorList/AssignMentorList.component";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AssignReview from "../../../../components/AssignMentor/AssignReview/AssignReview.component";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import Button from "@mui/material/Button";
import BasicSnackbar from "../../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";
import Header from "../../../../components/Header/Header.component";
import Body from "../../../../components/Body/Body.component";
import HeaderSearch from "../../../../ui/Form/HeaderSearch/HeaderSearch.component";

function AssignMentor() {
  const [groups, setGroups] = useState([]);
  const [saveGroups, setSaveGroups] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [isLoadingMentor, setIsLoadingMentor] = useState(true);
  const [isLoadingGroup, setIsLoadingGroup] = useState(true);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedMentors, setSelectedMentors] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [searchTermGroup, setSearchTermGroup] = useState("");
  const [searchTermMentor, setSearchTermMentor] = useState("");
  const [message, setMessage] = useState({
    isOpen: false,
    content: "",
  });
  const [assignData, setAssignData] = useState({
    lecturerId: "",
    groups: [],
  });

  const loadGroups = async () => {
    console.log("load");
    let { data, isSucess } = await GroupService.load();
    if (isSucess) {
      setSaveGroups(data);
      setGroups(sortGroupList(data));
      setIsLoadingGroup(false);
    }
  };

  const loadMentors = async () => {
    let { data, isSuccess } = await LecturerAccount.load();
    if (isSuccess) {
      setMentors(sortMentorList(data));
      setIsLoadingMentor(false);
    }
  };

  useEffect(async () => {
    await loadGroups();
    await loadMentors();
  }, []);

  const sortMentorList = (data) => {
    let newMentors = [...data];
    newMentors.sort(function (a, b) {
      if (a.firstName < b.firstName) {
        return -1;
      }
      if (a.firstName > b.firstName) {
        return 1;
      }
      return 0;
    });
    return newMentors;
  };

  const sortGroupList = (data) => {
    let newGroups = [...data];
    newGroups.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return newGroups;
  };
  //sort
  useEffect(() => {
    setMentors(sortMentorList(mentors));
    setGroups(sortGroupList(groups));
  }, [selectedMentors, selectedGroups]);

  // handle mentor can't be re-assign
  useEffect(() => {
    console.log(saveGroups);
    let newGroups = [...saveGroups];
    let filterGroups = newGroups.filter((newGroup) => {
      let isSame = true;
      selectedMentors.forEach((selected) => {
        newGroup.mentors.forEach((mentor) => {
          if (mentor.lecturerId === selected.lecturerId) isSame = false;
        });
      });
      return isSame;
    });
    setGroups(sortGroupList(filterGroups));
  }, [selectedMentors]);

  useEffect(() => {
    if (selectedGroups.length === 0 && selectedMentors.length === 0) {
      setShowReview(false);
    }
  }, [selectedGroups, selectedMentors]);

  //handle mentors
  const searchMentors = (mentors) => {
    let newValue = searchTermMentor.toLowerCase();
    return mentors.filter((mentor) => {
      let convertName = mentor.lastName
        .concat(" ", mentor.firstName)
        .toLowerCase();
      return convertName.includes(newValue);
    });
  };

  const selectMentors = (mentor, index) => {
    setShowReview(true);
    //delete from mentor list
    let newMentors = [...mentors];
    let deleteIndex = mentors.findIndex((item) => {
      return item.userId === mentor.userId;
    });
    newMentors.splice(deleteIndex, 1);
    setMentors(newMentors);

    //add to selected mentors
    let newSelectedMentors = [...selectedMentors];
    newSelectedMentors.push(mentor);
    setSelectedMentors(newSelectedMentors);
  };

  const removeMentor = (mentor, index) => {
    //delete from selected mentors
    let newSelectedMentors = [...selectedMentors];
    newSelectedMentors.splice(index, 1);
    setSelectedMentors(newSelectedMentors);

    // add to group list
    let newMentors = [...mentors];
    newMentors.push(mentor);
    setMentors(newMentors);
  };

  //handle groups
  const searchGroups = (groups) => {
    let newValue = searchTermGroup.toLowerCase();
    return groups.filter((group) => {
      let convertName = group.name.toLowerCase();
      return convertName.includes(newValue);
    });
  };

  const selectGroups = (group, index) => {
    setShowReview(true);
    //delete from group list
    let newGroups = [...groups];
    let deleteIndex = groups.findIndex((item) => {
      return item.groupId === group.groupId;
    });
    newGroups.splice(deleteIndex, 1);
    setGroups(newGroups);

    //add to selected groups
    let newSelectedGroups = [...selectedGroups];
    newSelectedGroups.push(group);
    setSelectedGroups(newSelectedGroups);
  };

  const removeGroup = (group, index) => {
    //delele from selected groups
    let newSelectedGroups = [...selectedGroups];
    newSelectedGroups.splice(index, 1);
    setSelectedGroups(newSelectedGroups);

    //add to group list
    let newGroups = [...groups];
    newGroups.push(group);
    setGroups(newGroups);
  };

  const submitAssignData = async (assignData) => {
    let { ok, data, status } = await axios({
      url: "/api/group/assignmentor",
      data: assignData,
      method: "post",
    });
    if (ok && status === 200) {
      setMessage({ content: "Assign successfully!", isOpen: true });
      assignData.lecturerId = "";
      assignData.groups = [];
      //add mentor to group at client
      let newGroups = [...selectedGroups];
      newGroups.forEach((group) => {
        selectedMentors.forEach((selected) => {
          group.mentors.push(selected);
        });
      });

      let insertGroups = [...groups];
      newGroups.forEach((selected) => {
        insertGroups.push(selected);
      });
      setGroups(newGroups);

      //move selected to list
      let insertMentors = [...mentors];
      selectedMentors.forEach((selected) => {
        insertMentors.push(selected);
      });
      setMentors(insertMentors);

      setSelectedGroups([]);
      setSelectedMentors([]);
      return true;
    } else {
      setMessage({ content: "Assign failed", isOpen: true });
      return false;
    }
  };

  //Assign Mentor
  const assignMentor = () => {
    let newData = assignData;
    selectedGroups.forEach((selectedGroup) => {
      newData.groups.push(selectedGroup.groupId);
    });
    selectedMentors.forEach(async (selectedMentor) => {
      newData.lecturerId = selectedMentor.lecturerId;
      await submitAssignData(newData);
    });
  };

  return (
    <div>
      <Header>
        <h5>Mentor Assignment</h5>
        <HeaderSearch placeholder="Search groups" />
      </Header>
      <Body>
        <BasicSnackbar
          isOpen={message.isOpen}
          content={message.content}
          onClose={() => setMessage({ content: "", isOpen: false })}
        />
        <div className={styles["assign-mentor"]}>
          <div className={styles["two-list"]}>
            <div className={styles["mentors"]}>
              <AssignMentorList
                isLoadingMentor={isLoadingMentor}
                type={"mentors"}
                data={searchMentors(mentors)}
                handleChange={(e) => setSearchTermMentor(e.target.value)}
                handleClickOnMentor={(mentor, index) =>
                  selectMentors(mentor, index)
                }
              />
            </div>
            <div className={styles["plus-icon"]}>
              <AddBoxOutlinedIcon fontSize="large" />
            </div>
            <div className={styles["groups"]}>
              <AssignMentorList
                isLoadingGroup={isLoadingGroup}
                type={"groups"}
                data={searchGroups(groups)}
                handleChange={(e) => setSearchTermGroup(e.target.value)}
                handleClickOnGroup={(group, index) =>
                  selectGroups(group, index)
                }
              />
            </div>
          </div>
          <div className={styles["review-container"]}>
            {showReview ? (
              <div>
                <div className={styles["down-icon-container"]}>
                  <LoopOutlinedIcon
                    className={styles["down-icon"]}
                    fontSize="large"
                  />
                  <LoopOutlinedIcon
                    className={styles["down-icon"]}
                    fontSize="large"
                  />
                </div>
                <div className={styles["assign-review-container"]}>
                  <div className={styles["assign-review"]}> 
                  <AssignReview
                    mentors={selectedMentors}
                    groups={selectedGroups}
                    onRemoveMentor={(mentor, index) =>
                      removeMentor(mentor, index)
                    }
                    onRemoveGroup={(group, index) => removeGroup(group, index)}
                  />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={styles["button-container"]}>
            <Button onClick={() => assignMentor()} variant="contained">
              Submit
            </Button>
          </div>
        </div>
      </Body>
    </div>
  );
}

export default AssignMentor;