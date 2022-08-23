import { useState, useEffect } from "react";
import style from "./GroupForm.module.scss";
import Header from "../../../../components/Header/Header.component";
import Body from "../../../../components/Body/Body.component";
import HeaderSearch from "../../../../ui/Form/HeaderSearch/HeaderSearch.component";
import StudentsList from "../../../../components/GroupForm/StudentsList/StudentsList.component";
import Textbox from "../../../../ui/Form/Textbox/Textbox.component";
import CapstoneTab from "../../../../ui/Tab/CapstoneTab/CapstoneTab.component";
import Switch from "@mui/material/Switch";
import RowRadioButtonsGroup from "../../../../ui/Form/RadioGroup/RadioGroup.component";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import Button from "@mui/material/Button";
import BasicSnackbar from "../../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";
import { useDispatch, useSelector } from "react-redux";
import { axios } from "../../../../services/HttpClient/HttpClient";
import { useSearchParams } from "react-router-dom";
import ObjectChecker from "../../../../services/Object/ObjectChecker";

function GroupForm() {
    const [searchParams] = useSearchParams();
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [filterStudents, setFilterStudents] = useState([]);

    const [selected, setSelected] = useState([]);

    const [radioSelected, setRadioSelected] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [type, setType] = useState(0);

    const [message, setMessage] = useState({
        isOpen: false,
        content: "",
    });

    const [typeSubmit, setTypeSubmit] = useState("create");

    const [group, setGroup] = useState({
        groupName: "",
        isScientificGroup: false,
        groupDesc: "",
        typeCapstone: 0,
        students: [],
    });

    //load student
    useEffect(async () => {
        let { ok, status, data } = await axios({
            url: "/api/student/",
            method: "get",
        });
        if (ok && status === 200) {
            let newData = [...data];
            console.log(newData);
            let filteredData = newData.filter(
                (student) => student.groupId == null || !student.isApproved
            );
            for (let index in filteredData) {
                filteredData[index].isSelected = false;
            }
            setStudents(sortStudentList(filteredData));
            setIsLoading(false);
        }
    }, []);

    //redux for edit group
    const groupEditing = useSelector((s) => s.group);
    const dispatch = useDispatch();
    useEffect(() => {
        let type = searchParams.get("type");
        console.log(type);
        if (type === "edit") {
            setType(groupEditing.students[0].typeCapstone - 1);
            setTypeSubmit("edit");
            let newSelected = [];
            groupEditing.students.map((student) => {
                newSelected.push(student);
            });
            setSelected(newSelected);
            setGroup(groupEditing);
        }
    }, []);

    const [disabledButton, setDisabledButton] = useState(false);
    const handleSelecteType = (value) => {
        if (selected.length > 0) {
            setMessage({
                content:
                    "You need to remove all students selected in current group",
                isOpen: true,
            });
            setDisabledButton(true);
        } else {
            setType(value);
            setDisabledButton(false);
        }
    };

    //sort
    const sortStudentList = (data) => {
        let newStudents = [...data];
        newStudents.sort(function (a, b) {
            if (a.firstName < b.firstName) {
                return -1;
            }
            if (a.firstName > b.firstName) {
                return 1;
            }
            return 0;
        });
        return newStudents;
    };
    useEffect(() => {
        setStudents(sortStudentList(students));
    }, [selected]);

    //check available group
    useEffect(() => {
        let totalGPA = 0;
        if (selected.length >= 4) {
            totalGPA = selected.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.gpa;
            }, 0);
            if (totalGPA / selected.length < 2.5) {
                setDisabledButton(true);
                setMessage({
                    content: "Average GPA of each group must be greater than 2.5",
                    isOpen: true,
                });
            } else setDisabledButton(false);
        }
    }, [selected]);

    const searchStudents = (students) => {
        let newValue = searchTerm.toLowerCase();
        let newStudents = [];
        return students.filter((student) => {
            let convertName = student.lastName
                .concat(" ", student.firstName)
                .toLowerCase();
            return (
                convertName.includes(newValue) && student.isSelected == false
            );
        });
    };

    const handleChange = (value) => {
        setRadioSelected(value);
    };

    const addToGroup = (student, index) => {
        if (selected.length < 5) {
            student.isSelected = true;
            let newSelected = [...selected];
            newSelected.push(student);
            setSelected(newSelected);

            let newStudents = [...students];
            let selectedIndex = newStudents.findIndex((newStudent) => {
                return student.stuCode == newStudent.stuCode;
            });
            newStudents.splice(selectedIndex, 1);
            setStudents(newStudents);
            setDisabledButton(false);
        } else {
            setMessage({
                content: "Each group has a maximum of 5 members",
                isOpen: true,
            });
            setDisabledButton(true);
        }
    };

    const removeFromGroup = (student, index) => {
        student.isSelected = false;
        let newSelected = [...selected];
        newSelected.splice(index, 1);
        setSelected(newSelected);

        let newStudents = [...students];
        newStudents.push(student);
        setStudents(newStudents);
    };

    const onChange = (event, name, typeOfInput) => {
        var typeOfInput = event.target[typeOfInput];
        group[name] = typeOfInput;
        setGroup({ ...group });
        // console.log(group);
        setMessage("");
    };

    const createGroup = async (group) => {
        let { ok, data, status } = await axios({
            url: "/api/group/createGroup",
            data: group,
            method: "post",
        });
        if (ok && status === 200) {
            setMessage({ content: "Create group successfully!", isOpen: true });
            setSelected([]);
            return true;
        } else {
            setMessage({ content: "Create failed", isOpen: true });
            return false;
        }
    };

    const editGroup = async (group) => {
        console.log(group);
        let { ok, data, status } = await axios({
            url: "/api/group/update/" + group.groupId,
            data: group,
            method: "put",
        });
        if (ok && status === 200) {
            setMessage({ content: "Update group successfully!", isOpen: true });
            setSelected([]);
            return true;
        } else {
            setMessage({ content: "Update failed", isOpen: true });
            return false;
        }
    };

    const submitGroup = async () => {
        if(selected.length)
        {
            let newGroup = group;
            newGroup.students = [];
            newGroup.typeCapstone = selected[0].typeCapstone;
            selected.map((student) => {
                newGroup.students.push(student.stuId);
            });
            setIsSubmitted(true);
            setGroup(newGroup);
            if(ObjectChecker.isEmptyKeys(group,["groupName","groupDesc"])) console.log("Reject to submit the form !");
            else{
                if (typeSubmit === "create") {
                    await createGroup(group);
                } else if (typeSubmit === "edit") {
                    await editGroup(group);
                }
            }

            
        }
        
    };
    return (
        <div>
            <Header>
                <h5>Group Management</h5>
                <HeaderSearch placeholder="Search groups" />
            </Header>
            <Body>
                <BasicSnackbar
                    isOpen={message.isOpen}
                    content={message.content}
                    onClose={() => setMessage({ content: "", isOpen: false })}
                />
                <div className={style["create-group"]}>
                    <div className={style["info-group"]}>
                        <div className={style["group-header"]}>
                            <div className={style["group-name"]}>
                                <Textbox
                                    defaultValue={group.groupName}
                                    onChange={(event) => onChange(event, "groupName", "value")}
                                    placeholder={"Group name"}
                                    regex={/^[A-Za-z\d]{10,}$/}
                                    message={"Group name must be a-z A-Z 0-9 and > 10 characters"}
                                    isSubmitted={isSubmitted}
                                />
                            </div>
                            <div className={style["switch"]}>
                                <label>Scientific research</label>
                                <Switch
                                    checked={group.isScientificGroup}
                                    onChange={(event) => onChange(event, "isScientificGroup","checked")}
                                />
                            </div>
                        </div>
                        <div className={style["group-desc"]}>
                            <Textbox
                                defaultValue={group.groupDesc}
                                onChange={(event) => onChange(event, "groupDesc", "value")}
                                regex={/^$/}
                                placeholder={"Group description"}
                                isSubmitted={isSubmitted}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center my-3">
                        <CapstoneTab
                            onChange={(e, value) => handleSelecteType(value)}
                            selected={selected}
                            defaultValue={type}
                        />
                    </div>
                    <div className="d-flex justify-content-center text-center">
                        <RowRadioButtonsGroup
                            handleChange={(e) => handleChange(e.target.value)}
                        />
                    </div>
                    <div className={style["list-container"]}>
                        <div className={style["students-list"]}>
                            <StudentsList
                                isLoading={isLoading}
                                students={searchStudents(students)}
                                typeCapstone={type}
                                isSearchFunction={true}
                                handleClick={(student, index) =>
                                    addToGroup(student, index)
                                }
                                rankingValue={radioSelected}
                                searchStudents={(e) =>
                                    setSearchTerm(e.target.value)
                                }
                            />
                        </div>
                        <div className={style["transfer-icon"]}>
                            <RepeatOutlinedIcon fontSize="large" />
                        </div>
                        <div className={style["students-list"]}>
                            <StudentsList
                                students={selected}
                                typeCapstone={type}
                                isSearchFunction={false}
                                handleClick={(student, index) =>
                                    removeFromGroup(student, index)
                                }
                            />
                        </div>
                    </div>
                    <div className={style["submitButton-container"]}>
                        <Button
                            onClick={submitGroup}
                            className={style["submitButton"]}
                            variant="contained"
                            disabled={disabledButton}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Body>
        </div>
    );
}

export default GroupForm;
