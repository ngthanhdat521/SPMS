import { useEffect, useState } from "react";
import Body from "../../../../components/Body/Body.component";
import LecturerList from "../../../../components/CouncilManagement/LecturerList/LecturerList.component";
import Header from "../../../../components/Header/Header.component";
import LecturerAccount from "../../../../services/Supporter/LecturerAccount/LecturerAccount";
import HeaderSearch from "../../../../ui/Form/HeaderSearch/HeaderSearch.component";
import Textbox from "../../../../ui/Form/Textbox/Textbox.component";
import List from "../../../../services/Supporter/List/List";
import Button from "@mui/material/Button";
import styles from "./CouncilForm.module.scss";
import DateTimePicker from "../../../../ui/Form/DateTimePicker/DateTimePicker.component";
import BasicSnackbar from "../../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";
import CouncilServices from "../../../../services/Supporter/Council/Council";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ObjectChecker from "../../../../services/Object/ObjectChecker";

function CouncilForm() {
  const [searchParams] = useSearchParams();
  const [lecturers, setLecturers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedLecturers, setSelectedLecturers] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState({
    isOpen: false,
    content: "",
  });
  const [council, setCouncil] = useState({
    councilName: "",
    councilDesc: "",
    location: "",
    time: "",
    lecturers: [],
  });
  const [submitType, setSubmitType] = useState("create");
  //load list lecturers
  const loadLecturers = async () => {
    let { data, isSuccess } = await LecturerAccount.load();
    if (isSuccess) {
      setLecturers(List.sort(data, "firstName"));
      setIsLoading(false);
    }
  };
  const councilEditing = useSelector((s) => s.council);
  const getEditingData = async () => {
    let type = searchParams.get("type");
    if (type === "edit") {
      setSubmitType("edit");
      //show selected lecturers
      let newSelected = [{}];
      councilEditing.council.detailMembers.forEach((member, index) => {
        newSelected[index] = {
          lecturerId: member.lecturerId,
          workUnit: member.workUnit,
          lastName: member.lastName,
          firstName: member.firstName,
          roleId: member.roleId,
        };
      });
      //show edit data
      let newCouncil = {};
      newCouncil.councilId = councilEditing.council.council.councilId;
      newCouncil.councilName = councilEditing.council.council.councilName;
      newCouncil.councilDesc = councilEditing.council.council.councilDesc;
      newCouncil.location = councilEditing.council.council.location;
      newCouncil.time = councilEditing.council.council.time;
      setSelectedLecturers(newSelected);
      setCouncil(newCouncil);
    }
  };

  //delete lecturers selected
  const delectSelectedLecturers = () => {
    let newLecturers = [];
    newLecturers = lecturers.filter((lecturer) => {
      let isSame = true;
      selectedLecturers.forEach((member) => {
        if (lecturer.lecturerId === member.lecturerId) {
          isSame = false;
        }
      });
      return isSame;
    });
    setLecturers(List.sort(newLecturers, "firstName"));
  };

  useEffect(async () => {
    await loadLecturers();
    if (councilEditing) await getEditingData();
    // console.log("edit");
  }, []);

  useEffect(() => {
    if (lecturers.length !== 0) {
      delectSelectedLecturers();
    }
  }, [selectedLecturers])

  //handle select same time
  const handleSelectTime = (value) => {
    council.time = value;
    setCouncil({ ...council });
  };
  //handle click to add or remove
  const addLecturer = (lecturer) => {
    let listData = List.transfer(
      lecturer,
      lecturers,
      selectedLecturers,
      "lecturerId"
    );
    setLecturers(listData.firstList);
    setSelectedLecturers(listData.secondList);
  };
  const removeLecturer = (lecturer) => {
    delete lecturer.roleId;
    delete lecturer.workUnit;
    let listData = List.transfer(
      lecturer,
      selectedLecturers,
      lecturers,
      "lecturerId"
    );
    setSelectedLecturers(listData.firstList);
    setLecturers(listData.secondList);
  };
  const onChange = (event, index, name, type) => {
    let value = event.target.value;
    if (type === "text") {
      council[name] = value;
    } else if (type === "role" || type === "workUnit") {
      selectedLecturers[index][name] = value;
    }
    setSelectedLecturers(selectedLecturers);
    setCouncil({ ...council });
  };
  const getCouncil = () => {
    let newCouncil = council;
    newCouncil.lecturers = [];
    selectedLecturers.forEach((selected) => {
      if (selected.roleId !== undefined)
        newCouncil.lecturers.push({
          lecturerId: selected.lecturerId,
          roleId: selected.roleId,
          workUnit: selected.workUnit || "Duy Tan University",
        });
    });
    // check enough 3 roles
    let roles = Array.from(new Set(newCouncil.lecturers.map((e) => e.roleId)));
    if (roles.length < 3) {
      setMessage({
        content: "You need to have enough 3 roles to create council!",
        isOpen: true,
      });
      return false;
    } else {
      setCouncil({ ...newCouncil });
      return true;
    }
  };
  const submitCreateCouncil = async () => {
    if (getCouncil()) {
      console.log(council);
      setIsSubmitted(true);
      if (ObjectChecker.isEmptyKeys(council, ["councilName", "councilDesc", "time", "location"])) console.log("Reject to submit the form !");
      else {
        if (submitType === "create") {
          var { isCreateSuccess } = await CouncilServices.createCouncil(council);
        }
        if (submitType === "edit") {
          var { isEditSuccess } = await CouncilServices.editCouncil(council);
        }
        if (isCreateSuccess || isEditSuccess) {
          //reset council data
          let newCouncil = {
            councilName: "",
            councilDesc: "",
            location: "",
            time: new Date().toISOString(),
            lecturers: [],
          };
          setCouncil(newCouncil);
          //reset list lecturers
          let originLecturers = [...lecturers];
          selectedLecturers.forEach((selected) => {
            delete selected.workUnit;
            delete selected.roleId;
            originLecturers.push(selected);
          });
          setLecturers(originLecturers);
          setSelectedLecturers([]);
          if (submitType === "create") {
            setMessage({
              content: "Create council succesfully!",
              isOpen: true,
            });
          }
          if (submitType === "edit") {
            setMessage({
              content: "Edit council succesfully!",
              isOpen: true,
            });
          }
        } else {
          if (submitType === "create") {
            setMessage({
              content: "Create council failed!",
              isOpen: true,
            });
          }
          if (submitType === "edit") {
            setMessage({
              content: "Edit council failed!",
              isOpen: true,
            });
          }
        }
      }


    }
  };
  return (
    <div>
      <Header>
        <h5>Council Form</h5>
        <HeaderSearch placeholder={"Search Council"} />
      </Header>
      <Body>
        <BasicSnackbar
          isOpen={message.isOpen}
          content={message.content}
          onClose={() => setMessage({ content: "", isOpen: false })}
        />
        <div className={styles["council-form"]}>
          <div className={styles["council-info-container"]}>
            <div className={styles["council-info"]}>
              <div className={styles["council-info-header"]}>
                <div className={styles["name"]}>
                  <Textbox
                    defaultValue={council.councilName}
                    onChange={(event) =>
                      onChange(event, null, "councilName", "text")
                    }
                    placeholder={"Council Name"}
                    regex={/^[A-Za-z\d]{10,}$/}
                    message={"Council name must be a-z A-Z 0-9 and > 10 characters !"}
                    isSubmitted={isSubmitted}
                  />
                </div>
                <div className={styles["desc"]}>
                  <Textbox
                    defaultValue={council.councilDesc}
                    onChange={(event) =>
                      onChange(event, null, "councilDesc", "text")
                    }
                    placeholder={"Council Description"}
                    regex={/^$/}
                    isSubmitted={isSubmitted}
                  />
                </div>
              </div>
              <div className={styles["picker"]}>
                <div className={styles["left"]}>
                  <Textbox
                    defaultValue={council.location}
                    onChange={(event) =>
                      onChange(event, null, "location", "text")
                    }
                    placeholder={"Location"}
                    regex={/^[A-Za-z\d]{10,}$/}
                    message={"Location must be a-z A-Z 0-9 and > 10 characters"}
                    isSubmitted={isSubmitted}
                  />
                </div>
                <div className={styles["right"]}>
                  <DateTimePicker
                    defaultValue={council.time}
                    onChange={(value) => handleSelectTime(value)}
                    isSubmitted={isSubmitted}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles["council-list"]}>
            <LecturerList
              isLoading={isLoading}
              lecturers={List.searchByFirstName(lecturers, searchTerm)}
              selectedLecturers={selectedLecturers}
              addLecturer={(lecturer) => addLecturer(lecturer)}
              removeLecturer={(lecturer) => removeLecturer(lecturer)}
              firstOnSearch={(e) => {
                setSearchTerm(e.target.value);
              }}
              selectRole={(event, index) =>
                onChange(event, index, "roleId", "role")
              }
              enterWorkUnit={(event, index) =>
                onChange(event, index, "workUnit", "workUnit")
              }
            />
          </div>
          <div className={styles["button-container"]}>
            <Button
              onClick={() => submitCreateCouncil()}
              className={styles["submit-button"]}
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </div>
      </Body>
    </div>
  );
}

export default CouncilForm;
