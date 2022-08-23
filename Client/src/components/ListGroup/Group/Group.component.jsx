import React, { useState } from "react";
import styles from "./Group.module.scss";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import RoundedAvatar from "../../../ui/Avatar/RoundedAvatar/RoundedAvatar.component";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import DateConverter from "../../../services/Converter/DateConverter";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button } from "@mui/material";
import ListMember from "../ListMember/ListMember.component";

function Group({
    note,
    name,
    startDate,
    endDate,
    typeCapstone,
    isScientificGroup,
    students,
    mentors,
}) {
    const [isInvisible, setIsInvisible] = useState(true);
    const [currentMembers, setCurrentMembers] = useState({
        students: [],
        mentors: [],
    });

    const openMembers = () => {
        setCurrentMembers({
            students,
            mentors,
        });
        setIsInvisible(false);
    };

    const getLeft = () => {
        let total = students.length + mentors.length;
        if (total) return total * 22;
        else return 0;
    };

    const getZIndex = () => {
        return students.length + mentors.length;
    };

    return (
        <>
            {isInvisible || (
                <ListMember
                    students={currentMembers.students}
                    mentors={currentMembers.mentors}
                    onClose={() => setIsInvisible(true)}
                />
            )}
            <div className={styles["group"]} onClick={openMembers}>
                <div className={styles["group_header"]}>
                    <div className="d-flex justify-content-between">
                        <h4>{name}</h4>
                    </div>
                    <p className="mb-1">{`Capstone ${typeCapstone} (${
                        isScientificGroup ? "Scientific Research" : "Normal"
                    })`}</p>
                    <span className="light-text">{note}</span>
                </div>
                <div className="dropdown-divider pt-2" />
                <div className={styles["group_body"]}>
                    <div className="d-flex">
                        {students.map((student, index) => (
                            <div
                                style={{
                                    left: `${index * 22}px`,
                                    zIndex: index + 1,
                                }}
                                className={styles["group_body_avatar"]}
                            >
                                <RoundedAvatar
                                    key={index}
                                    name={`${student.userInfo.firstName} ${student.userInfo.lastName}`}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        fontSize: "11px",
                                    }}
                                />
                            </div>
                        ))}
                        {mentors.map((student, index) => (
                            <div
                                style={{
                                    left: `${(students.length + index) * 22}px`,
                                    zIndex: students.length + index + 1,
                                }}
                                className={styles["group_body_avatar"]}
                            >
                                <RoundedAvatar
                                    key={index}
                                    name={`${student.firstName} ${student.lastName}`}
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        fontSize: "11px",
                                    }}
                                />
                            </div>
                        ))}
                        <div
                            style={{
                                left: `${getLeft()}px`,
                                zIndex: getZIndex(),
                            }}
                            className={styles["group_body_avatar"]}
                        >
                            <Button
                                className={styles["group_body_avatar_button"]}
                                variant="contained"
                            >
                                <AddOutlinedIcon />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="dropdown-divider py-2" />
                <div className={styles["group_footer"] + ""}>
                    <div className="">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="w-75 d-flex align-items-center">
                                    <ManageAccountsOutlinedIcon className="light-text" />{" "}
                                    <span className="ml-2 light-text">
                                        {mentors.length} mentors
                                    </span>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="d-flex align-items-center">
                                    <GroupOutlinedIcon className="light-text" />{" "}
                                    <span className="ml-2 light-text">
                                        {students.length} members
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="mt-2">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="d-flex align-items-center">
                                <AccessTimeOutlinedIcon className="light-text" />{" "}
                                <span className="ml-2 light-text">
                                    {DateConverter.parseShortDate(startDate)} -{" "}
                                    {DateConverter.parseShortDate(endDate)}
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="d-flex align-items-center">
                                <HourglassBottomOutlinedIcon className="light-text" />{" "}
                                <span className="ml-2 light-text">
                                    {Math.round(
                                        DateConverter.calculate(
                                            startDate,
                                            endDate
                                        ) / 30
                                    )}{" "}
                                    months
                                </span>
                            </div>
                        </div>
                    </div>
                </div> */}
                </div>
            </div>
        </>
    );
}

export default Group;
