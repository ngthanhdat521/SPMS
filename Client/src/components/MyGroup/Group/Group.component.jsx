import React from "react";
import styles from "./Group.module.scss";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import InfoAvatar from "../../../ui/Avatar/InfoAvatar/InfoAvatar.component";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import DateConverter from "../../../services/Converter/DateConverter";

function Group({
    project,
    groupName,
    startDate,
    endDate,
    typeCapstone,
    isScientificGroup,
    mentor,
}) {
    let { projectName, projectDesc, members, leader } = project
        ? project
        : { projectName: "", projectDesc: "", members: [], leader: {} };
    return (
        <div className={styles["group"]}>
            <div className={styles["group_header"]}>
                <h4>{projectName}</h4>
                <p className="mb-1">
                    Capstone {typeCapstone} (
                    {isScientificGroup ? "Scientific Research" : "Normal"})
                </p>
                <span className="light-text">{projectDesc}</span>
            </div>
            <div className="dropdown-divider py-2" />
            <div className={styles["group_body"]}>
                <div className="row">
                    <div className="col-xl-6">
                        <p>Mentors</p>
                        <div>
                            {mentor.map((mentor, mentorIndex) => (
                                <InfoAvatar
                                    key={mentorIndex}
                                    fullName={`${mentor.firstName} ${mentor.lastName}`}
                                    email={mentor.email}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <p>Members - {groupName}</p>
                        {members.map((member, memberIndex) => (
                            <InfoAvatar
                                key={memberIndex}
                                fullName={`${member.firstName} ${member.lastName}`}
                                email={member.email}
                            />
                        ))}
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
                                    {mentor.length} mentors
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="d-flex align-items-center">
                                <GroupOutlinedIcon className="light-text" />{" "}
                                <span className="ml-2 light-text">
                                    {members.length} members
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
                                    3 months
                                </span>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Group;
