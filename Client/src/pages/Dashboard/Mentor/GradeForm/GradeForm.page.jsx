import { useEffect, useState } from "react";
import styles from "./GradeForm.module.scss";
import GradeFormComponent from "../../../../ui/Form/GradeForm/GradeForm/GradeForm.component";
import Header from "../../../../components/Header/Header.component";
import HeaderSearch from "../../../../ui/Form/HeaderSearch/HeaderSearch.component";
import BasicBox from "../../../../ui/Container/BasicBox/BasicBox.component";
import Body from "../../../../components/Body/Body.component";
import LoadingCombobox from "../../../../ui/Loading/LoadingCombobox/LoadingCombobox.component";
import GradeRowsItem from "../../../../models/GradeRowsItem";
import GradeRowsData from "../../../../models/GradeRowsData";
import GradeInfo from "../../../../ui/Form/GradeForm/GradeInfo/GradeInfo.component";
import Combobox from "../../../../ui/Form/Combobox/Combobox.component";
import CouncilServices from "../../../../services/Supporter/Council/Council";
import Button from "@mui/material/Button";
import BasicSnackbar from "../../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";
import Grade from "../../../../services/Supporter/Grade/Grade";
import ObjectChecker from "../../../../services/Object/ObjectChecker";
function GradeForm() {
  const [grade, setGrade] = useState(() => GradeRowsItem());
  const [contributionGrade, setContributionGrade] = useState({
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  });
  // const [gradeData, setGradeData] = useState([]);
  const [councils, setCouncils] = useState([]);
  const [council, setCouncil] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [councilsCombobox, setCouncilsCombobox] = useState([]);
  const [message, setMessage] = useState({
    isOpen: false,
    content: "",
  });
  const [userRole, setUserRole] = useState({});
  const [submitType, setSubmitType] = useState("mentor");

  //get user
  let user = JSON.parse(localStorage.getItem("info"));

  //filter council of mentor
  const filterCouncilMentor = (data) => {
    let newCouncils = [...data];
    newCouncils = newCouncils.filter((council) => {
      let isSame = false;
      council.mentors.forEach((mentor) => {
        if (mentor.lecturerId === user.lecturerId) {
          isSame = true;
        }
      });
      return isSame;
    });
    return newCouncils;
  };
  // filter council for member of council
  const filterCouncilMember = (data) => {
    let newCouncils = [...data];
    newCouncils = newCouncils.filter((council) => {
      let isSame = false;
      council.detailMembers.forEach((member) => {
        if (member.lecturerId === user.lecturerId) {
          isSame = true;
        }
      });
      return isSame;
    });
    return newCouncils;
  };
  //get data to combobox
  const fillCombobox = (name, id) => {
    let newData = {};
    newData.councilName = name;
    newData.councilId = id;
    return newData;
  };

  const getMentorCombobox = (data) => {
    let comboboxData = [];
    data.forEach((item) => {
      comboboxData.push(
        fillCombobox(item.group.groupName, item.council.councilId)
      );
    });
    return comboboxData;
  };

  const getCouncilCombobox = (data) => {
    let comboboxData = [];
    console.log(comboboxData);
    data.forEach((item) => {
      comboboxData.push(
        fillCombobox(item.council.councilName, item.council.councilId)
      );
    });
    return comboboxData;
  };

  //load councils
  useEffect(async () => {
    let { data, isSucess } = await CouncilServices.load();
    if (isSucess) {
      let filterData = filterCouncilMentor(data).concat(
        filterCouncilMember(data)
      );
      setCouncils(filterData);
      setCouncilsCombobox(
        getMentorCombobox(filterCouncilMentor(data)).concat(
          getCouncilCombobox(filterCouncilMember(data))
        )
      );
      setIsLoading(false);
    }
  }, []);

  const handleSelectGroup = (e) => {
    let id = e.target.value;
    councils.forEach((item) => {
      if (item.council.councilId === id) {
        setCouncil(item);
        //check user is mentor of group or member of councils
        item.mentors.forEach((mentor) => {
          if (mentor.lecturerId === user.lecturerId) {
            setUserRole(mentor);
            setSubmitType("mentor");
          }
        });
        item.detailMembers.forEach((member) => {
          if (member.lecturerId === user.lecturerId) {
            setUserRole(member);
            setSubmitType("council");
          }
        });
      }
    });
  };
  //input contribution of each members
  const handleContriEvaluation = (e, name) => {
    let value = e.target.value;
    let newContributionGrade = { ...contributionGrade };
    if(e.isError) newContributionGrade[name] = -1;
    else newContributionGrade[name] = value;
  
    setContributionGrade(newContributionGrade);
  };

  // calc final grade for name
  const calcEachCriteria = (name) => {
    let calcValue = grade.reduce((accumulator, currentValue) => {
      return accumulator + currentValue[name];
    }, 0);
    //final grade after multiplied contribution (%)
    if (contributionGrade[name]) {
      calcValue = (calcValue * contributionGrade[name]) / 100;
    }
    return Number.parseFloat(calcValue.toFixed(2));
  };
  //handle input grade
  const handleMark = (e, name, index, percent) => {
    let newGrade = [...grade];
    if(e.isError) newGrade[index][name] = -1;
    else{
      let value = Number.parseFloat(e.target.value);
      newGrade[index][name] = (value * (percent || 20)) / 100;
    }
    setGrade(newGrade);
  };

  const calcTeamGradeOf = (index) => {
    let teamGradeOf = (
      (grade[index].first +
        grade[index].second +
        grade[index].third +
        grade[index].fourth +
        grade[index].fifth) /
      (council ? council.students.length : 5)
    ).toFixed(2);
    return Number.parseFloat(teamGradeOf);
  };

  const calcTeamGrade = (index) => {
    let percent = index === 2 || index === 5 ? 10 : 20;
    let teamGrade = (
      (((grade[index].first +
        grade[index].second +
        grade[index].third +
        grade[index].fourth +
        grade[index].fifth) /
        (council ? council.students.length : 5)) *
        100) /
      percent
    ).toFixed(2);
    return Number.parseFloat(teamGrade);
  };

  const calcFinalTeamGrade = () => {
    let finalTeamGrade = 0;
    for (let i = 0; i < 6; i++) {
      finalTeamGrade = finalTeamGrade + calcTeamGradeOf(i);
    }
    return Number.parseFloat(finalTeamGrade.toFixed(2));
  };

  const getGradeData = () => {
    let newGradeData = [];
    council.students.forEach((student, i) => {
      let position = "";
      if (i === 0) position = "first";
      if (i === 1) position = "second";
      if (i === 2) position = "third";
      if (i === 3) position = "fourth";
      if (i === 4) position = "fifth";
      newGradeData.push({
        stuId: student.studentInfo.stuId,
        score: calcEachCriteria(position),
      });
    });
    return newGradeData;
  };

  const submitGradeData = async () => {
    let isSuccess;
    if(ObjectChecker.doArrHasANegativeNumber(getGradeData(),"score")){
      setMessage({ isOpen:true , content: "Score must be 0-10 or 0-100 !" });
    }
    else{
        if (submitType === "mentor") {
        isSuccess = await Grade.assignMentorGrade(
          getGradeData(),
          user.lecturerId
        );
      } else if (submitType === "council") {
        isSuccess = await Grade.assignCouncilGrade(
          getGradeData(),
          council.council.councilId,
          user.lecturerId
        );
      }
      if (isSuccess) {
        setMessage({ content: "Assign Grade Successfully", isOpen: true });
      } else {
        setMessage({ content: "Assign Grade Failed", isOpen: true });
      }
    }
    
  };

  return (
    <div className={styles["grade-form-page"]}>
      <Header>
        <h5>Grade Form</h5>
        <HeaderSearch placeholder={"Search Groups"} />
      </Header>
      <Body>
        <BasicSnackbar
          isOpen={message.isOpen}
          content={message.content}
          onClose={() => setMessage({ content: "", isOpen: false })}
        />
        <BasicBox>
          <div className={styles["grade-form-header"]}>
            <div className={styles["council-combobox"]}>
              <div className={styles["title"]}>
                <div className={styles["uni-title"]}>
                  <h4>DUY TAN UNIVERSITY </h4>
                  <h4>INTERNATIONAL SCHOOL</h4>
                </div>
              </div>
              <div className={styles["combobox"]}>
                <div className={styles["grade-title"]}>
                  <h5>Capstone Project Grading Sheet</h5>
                </div>
                <div className={styles["auto-complete-container"]}>
                  {isLoading ? (
                    <LoadingCombobox />
                  ) : (
                    <Combobox
                      list={councilsCombobox}
                      field={"group/council"}
                      gettedName={"councilId"}
                      shownName={"councilName"}
                      className={styles["auto-complete"]}
                      onChange={(e) => handleSelectGroup(e)}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className={styles["grade-info"]}>
              {council && (
                <GradeInfo
                  data={council}
                  user={userRole}
                  submitType={submitType}
                />
              )}
            </div>
          </div>
          <GradeFormComponent
            numberOfStudent={council ? council.students.length : 5}
            grade={grade}
            gradeRows={GradeRowsData()}
            calcEachCriteria={(name) => calcEachCriteria(name)}
            handleMark={(e, name, index, percent) =>
              handleMark(e, name, index, percent)
            }
            handleContriEvaluation={(e, name) =>
              handleContriEvaluation(e, name)
            }
            calcTeamGrade={(index) => calcTeamGrade(index)}
            calcTeamGradeOf={(index) => calcTeamGradeOf(index)}
            finalTeamGrade={calcFinalTeamGrade()}
          />
          <div className={styles["button-container"]}>
            <Button
              onClick={() => submitGradeData()}
              className={styles["submit-button"]}
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </BasicBox>
      </Body>
    </div>
  );
}

export default GradeForm;
