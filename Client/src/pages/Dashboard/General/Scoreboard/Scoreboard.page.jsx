import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import Group from "../../../../components/Scoreboard/Group/Group.component";
import ScoreService from "../../../../services/Supporter/Score/Score";
import ProjectService from "../../../../services/Supporter/Project/Project";

import Pagination from "@mui/material/Pagination";

import styles from "./Scoreboard.module.scss";

function Scoreboard() {
    const [score, setScore] = useState({ students: [], mentors: [], detailMembers: [] });
    const [page, setPage] = useState(1);
    const [groupId, setGroupId] = useState("");

    const [groups, setGroups] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (event, value) => {
        setPage(value);
    };

    const getPage = (index) => {
        return index >= page * 9 - 9 && index < page * 9;
    };

    const getPages = () => {
        return groups.length <= 9
            ? 1
            : Math.round(
                  (groups.length / 9) % 1 === 0
                      ? groups.length / 9 + 1
                      : groups.length / 9
              );
    };

    const calcAverage = (scores) => {
        let total = 0;
        for (let i in scores) if (i !== "mentorScore") total += scores[i];
        return (total / 3).toFixed(2);
    };

    const calcSummary = (scores) => {
        let pointOfCouncil = calcAverage(scores);
        pointOfCouncil = pointOfCouncil * 0.7;
        let pointOfMentor = scores?.mentorScore || 0;
        pointOfMentor = pointOfMentor * 0.3;
        return (pointOfCouncil + pointOfMentor).toFixed(2);
    };

    const onLoad = async () => {
        let user = JSON.parse(localStorage.getItem("user"));
        let newGroupId = searchParams.get("groupId");
        setGroupId(newGroupId || "");

        if (newGroupId) {
            let { data, isSucess } = await ScoreService.load(newGroupId);
            console.log(data);
            if (isSucess) setScore(data);
        } else {
            if (user.roleUser.includes("moderator")) {
                let { data, isSucess } = await ProjectService.loadAll();
                data = [...data, ...data];
                if (isSucess) setGroups(data);
            } else {
                let { data, isSucess } = await ProjectService.loadMyGroup();
                if (isSucess) setGroups(data);
            }
        }
    };

    useEffect(onLoad, [searchParams]);

    return (
        <div className={styles["score-board"]}>
            <Header>
                <h5>Score Board</h5>
            </Header>
            <Body>
                <div className={styles["score-board_body"]}>
                    {groupId === "" && <h3>{groups.length} Groups</h3>}

                    <div className="w-100 d-flex justify-content-center">
                        {groupId ? (
                            <div className="w-100">
                                <div className={`${styles["score-board_table"]} ${styles["score-board_table_m"]}`}>
                                    <table className="table table-hover m-0 ">
                                        <thead className="default-bg">
                                            <tr>
                                                <th rowSpan={2} scope="col">
                                                    #
                                                </th>
                                                <th rowSpan={2} scope="col">
                                                    Student Code
                                                </th>
                                                <th rowSpan={2} scope="col">
                                                    Full Name
                                                </th>
                                                <th rowSpan={2} scope="col">
                                                    Course
                                                </th>
                                                <th rowSpan={2} scope="col">
                                                    Score Of Mentor (30%)
                                                </th>
                                                <th
                                                    className="text-center"
                                                    colSpan={4}
                                                    scope="col"
                                                >
                                                    Score (70%)
                                                </th>
                                                <th rowSpan={2} scope="col">
                                                    Summary
                                                </th>
                                            </tr>
                                            <tr>
                                                <th scope="col">
                                                    Score Of President
                                                </th>
                                                <th scope="col">
                                                    Score Of Assistant
                                                </th>
                                                <th scope="col">
                                                    Score Of Reviewer
                                                </th>
                                                <th scope="col">Average</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {score.students.map(
                                                (student, index) => (
                                                    <tr key={index}>
                                                        <th scope="row">
                                                            {index + 1}
                                                        </th>
                                                        <td>
                                                            {student.stuCode}
                                                        </td>
                                                        <td>
                                                            {student.firstName}{" "}
                                                            {student.lastName}
                                                        </td>
                                                        <td>{student.class}</td>
                                                        <td className="text-center">
                                                            {
                                                                student.score
                                                                ?.mentorScore || "Waiting"
                                                            }
                                                        </td>
                                                        <td className="text-center">
                                                            {
                                                                student.score
                                                                ?.presidentScore || "Waiting"
                                                            }
                                                        </td>
                                                        <td className="text-center">
                                                            {
                                                                student.score
                                                                ?.assistantScore || "Waiting"
                                                            }
                                                        </td>
                                                        <td className="text-center">
                                                            {
                                                                student.score?.reviewerScore || "Waiting"
                                                            }
                                                        </td>
                                                        <td className="text-center">
                                                            {calcAverage(
                                                                student.score
                                                            )}
                                                        </td>
                                                        <td className="text-center">
                                                            {calcSummary(
                                                                student.score
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <div className={`${styles["score-board_table"]} ${styles["score-board_table_s"]}`}>
                                    <table
                                        className={`${styles["score-board_members"]} table table-hover m-0`}
                                    >
                                        <thead className="default-bg">
                                            <tr>
                                                <th rowSpan={2} scope="col">
                                                    #
                                                </th>
                                                <th rowSpan={2} scope="col">
                                                    Full Name
                                                </th>
                                                <th rowSpan={2} scope="col">
                                                    Role
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {score.detailMembers.map(
                                                (member, index) => (
                                                    <tr key={index}>
                                                        <th scope="row">
                                                            {index + 1}
                                                        </th>
                                                        <td>
                                                            {member.firstName}{" "}
                                                            {member.lastName}
                                                        </td>
                                                        <td>{member.roleName}</td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className={styles["score-board_group"]}>
                                {groups.map((group, index) => {
                                    if (getPage(index)) {
                                        return (
                                            <div className="p-3">
                                                <Group key={index} {...group} />
                                            </div>
                                        );
                                    }
                                    return "";
                                })}
                            </div>
                        )}
                    </div>

                    {groupId === "" && (
                        <div className="w-100 d-flex">
                            <Pagination
                                page={page}
                                onChange={handleChange}
                                className="ml-auto mt-4"
                                count={getPages()}
                                variant="outlined"
                                shape="rounded"
                            />
                        </div>
                    )}
                </div>
            </Body>
        </div>
    );
}

export default Scoreboard;
