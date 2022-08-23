import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MyGroup from "../../pages/Dashboard/General/MyGroup/MyGroup.page";
import ActivityNotification from "../../pages/Dashboard/General/ActivityNotification/ActivityNotification.page";
import Introduction from "../../pages/Dashboard/General/Introduction/Introduction.page";
import LecturerProfile from "../../pages/Dashboard/General/LecturerProfile/LecturerProfile.page";
import Stageboard from "../../pages/Dashboard/Student/Stageboard/Stageboard.page";
import MyTopic from "../../pages/Dashboard/Student/MyTopic/MyTopic.page";
import TaskManagement from "../../pages/Dashboard/Student/TaskManagement/TaskManagement.page";
import SampleTopic from "../../pages/Dashboard/Student/SampleTopic/SampleTopic.page";
import SampleDocument from "../../pages/Dashboard/Student/SampleDocument/SampleDocument.page";
import DocumentManagement from "../../pages/Dashboard/Mentor/DocumentManagement/DocumentManagement.page";
import GroupManagement from "../../pages/Dashboard/Morderator/GroupManagement/GroupManagement.page";
import LecturerManagement from "../../pages/Dashboard/Morderator/LectureManagement/LecturerManagement.page";
import StudentManagement from "../../pages/Dashboard/Morderator/StudentManagement/StudentManagement.page";
import TopicApproval from "../../pages/Dashboard/Morderator/TopicApproval/TopicApproval.page";
import TopicManagement from "../../pages/Dashboard/Mentor/TopicManagement/TopicManagement.page";
import GroupForm from "../../pages/Dashboard/Morderator/GroupForm/GroupForm.page";
import AssignMentor from "../../pages/Dashboard/Morderator/AssignMentor/AssignMentor.page";
import ListGroup from "../../pages/Dashboard/Student/ListGroup/ListGroup.page";
import LecturerAccountManagement from "../../pages/Dashboard/Admin/LecturerAccount/LecturerAccount.page";
import StudentAccountManagement from "../../pages/Dashboard/Admin/StudentAccount/StudentAccount.page";
import ContributionReport from "../../pages/Dashboard/General/ContributionReport/ContributionReport.page";
import GradeForm from "../../pages/Dashboard/Mentor/GradeForm/GradeForm.page";
import CouncilForm from "../../pages/Dashboard/Morderator/CouncilForm/CouncilForm.page";
import AssignCouncil from "../../pages/Dashboard/Morderator/AssignCouncil/AssignCouncil.page";
import Calendar from "../../pages/Dashboard/General/Calendar/Calendar.page";
import CouncilManagement from "../../pages/Dashboard/Morderator/CouncilManagement/CouncilManagement.page";
import Scoreboard from "../../pages/Dashboard/General/Scoreboard/Scoreboard.page";

export default function GeneralRouter() {
    const getRoles = () => {
        let isAuthenticated = localStorage.getItem("isAuthenticated");

        if (isAuthenticated) {
            let user = JSON.parse(localStorage.getItem("user"));
            return user.roleUser;
        }
        return [];
    };

    return (
        <Routes>
            <Route path="introduction" element={<Introduction />} />
            <Route path="" element={<Navigate to="/introduction" replace />} />
            <Route
                path="activity-notification"
                element={<ActivityNotification />}
            />
            <Route path="my-group" element={<MyGroup />} />
            <Route path="*" element={<Navigate to="/error/404" replace />} />
            <Route path="score-board" element={<Scoreboard />} />
            

            {/* router for admin */}
            {!getRoles().includes("admin") || (
                <>
                    <Route
                        path="lecturer-account-management"
                        element={<LecturerAccountManagement />}
                    />
                    <Route
                        path="student-account-management"
                        element={<StudentAccountManagement />}
                    />
                    <Route
                        path="document-management"
                        element={<DocumentManagement />}
                    />
                </>
            )}

            {/* router for student */}
            {!getRoles().includes("student") || (
                <>
                    <Route path="sample-topic" element={<SampleTopic />} />
                    <Route path="my-topic" element={<MyTopic />} />

                    <Route
                        path="sample-document"
                        element={<SampleDocument />}
                    />

                    <Route path="list-group" element={<ListGroup />} />
                    {/* <Route
                        path="contribution-report"
                        element={<ContributionReport />}
                    /> */}
                    <Route path="task-management" element={<Stageboard />} />
                    <Route
                        path="task-management/stage"
                        element={<TaskManagement />}
                    />
                    <Route path="calendar" element={<Calendar />} />
                    <Route
                        path="council-management"
                        element={<CouncilManagement />}
                    ></Route>
                </>
            )}

            {/* router for moderator */}
            {!getRoles().includes("moderator") || (
                <>
                    <Route
                        path="student-management"
                        element={<StudentManagement />}
                    />

                    <Route path="topic-approval" element={<TopicApproval />} />
                    <Route
                        path="lecturer-management"
                        element={<LecturerManagement />}
                    />
                    <Route
                        path="group-management"
                        element={<GroupManagement />}
                    />
                    <Route path="group-form" element={<GroupForm />}></Route>
                    <Route
                        path="assign-mentor"
                        element={<AssignMentor />}
                    ></Route>
                    <Route
                        path="council-form"
                        element={<CouncilForm />}
                    ></Route>
                    <Route
                        path="assign-council"
                        element={<AssignCouncil />}
                    ></Route>
                    <Route
                        path="council-management"
                        element={<CouncilManagement />}
                    ></Route>
                    <Route
                        path="sample-document"
                        element={<SampleDocument />}
                    />
                </>
            )}

            {/* router for mentor */}
            {!getRoles().includes("mentor") || (
                <>
                    <Route
                        path="topic-management"
                        element={<TopicManagement />}
                    />
                    <Route
                        path="contribution-report"
                        element={<ContributionReport />}
                    />
                    <Route
                        path="lecturer-profile"
                        element={<LecturerProfile />}
                    />
                    <Route path="grade-form" element={<GradeForm />}></Route>
                    <Route path="calendar" element={<Calendar />} />
                    <Route
                        path="sample-document"
                        element={<SampleDocument />}
                    />
                    <Route
                        path="council-management"
                        element={<CouncilManagement />}
                    ></Route>
                </>
            )}
        </Routes>
    );
}
