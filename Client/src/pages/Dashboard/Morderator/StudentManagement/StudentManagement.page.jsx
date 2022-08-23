import React, { useEffect, useState } from "react";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import styles from "./StudentManagement.module.scss";
import { axios } from "../../../../services/HttpClient/HttpClient";
import SMTypeModel from "../../../../models/SMTypeModel";
import AdvancedTable from "../../../../ui/Table/AdvancedTable/AdvancedTable.component";
import ApproveHeader from "../../../../ui/Table/HeaderTable/ApproveHeader.component";
import ManagementTable from "../../../../ui/Table/ManagementTable/ManagementTable.component";
import LoadingTable from "../../../../ui/Loading/LoadingTable/LoadingTable.component";
import BasicSnackbar from "../../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";

function StudentManagement() {
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState({
        isOpen: false,
        content: "",
    });
    const Model = {
        stuId: "",
        firstName: "",
        lastName: "",
        stuCode: "",
        class: "",
        email: "",
        password: "",
        phone: "",
        dateOfBirth: "",
        majorId: "",
        gpa: "",
        capstone: "",
        codeLevel: "",
        courseCreadits: "",
        note: "",
        isApproved: "",
    };
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        setIsLoading(true);
        let { ok, status, data } = await axios({
            url: "/api/student/",
            method: "get",
        });
        if (ok && status === 200) {
            console.log(data);
            setStudents(data);
        }
        setIsLoading(false);
    }, []);

    const deleteStudent = async (student) => {
        let { ok, status } = await axios({
            url: "/api/user/delete/" + student.userId,
            method: "post",
        });
        if (ok && status === 200) {
            setMessage({ content: "Delete successfully!", isOpen: true });
            return true;
        } else {
            setMessage({ content: "Fail to delete", isOpen: true });
            return false;
        }
    };

    const updateStudent = async (student, isAdd) => {
        if (!isAdd) {
            let { ok, status } = await axios({
                url: "/api/student/update/" + student.stuId,
                method: "post",
            });
            if (ok && status === 200) {
                setMessage({ content: "Approve successfully!", isOpen: true });
                return true;
            } else {
                setMessage({ content: "Approve failed", isOpen: true });
                return false;
            }
        }
    };

    const approveAll = async (selections) => {
        selections.map(async (selection) => {
            let { ok, status } = await axios({
                url: "/api/student/update/" + selection,
                method: "post",
            });
            if (ok && status === 200) {
                setMessage({
                    content: "Approve selected students successfully!",
                    isOpen: true,
                });
                return true;
            } else {
                setMessage({ content: "Approve failed", isOpen: true });
                return false;
            }
        });
    };

    return (
        <div className={styles["student-management"]}>
            <Header>
                <h5>Student Management</h5>
                <div className="d-flex justify-content-end">
                    <input
                        type="text"
                        className="form-control w-70 mr-2"
                        placeholder="Search students"
                    />
                </div>
            </Header>
            <Body>
                <BasicSnackbar
                    isOpen={message.isOpen}
                    content={message.content}
                    onClose={() => setMessage({ content: "", isOpen: false })}
                />
                <div className={styles["filter-table"]}>
                    {isLoading ? (
                        <LoadingTable />
                    ) : (
                        <ManagementTable
                            defaultRows={students}
                            Model={Model}
                            idField="stuId"
                            TypeTableModel={({
                                editRow,
                                deleteRow,
                                saveRow,
                                closeRow,
                            }) => {
                                return SMTypeModel(
                                    editRow,
                                    deleteRow,
                                    saveRow,
                                    closeRow
                                );
                            }}
                            HeaderTable={({ editRowsByName, selections }) => (
                                <ApproveHeader
                                    onApprove={async () => {
                                        await approveAll(selections);
                                        editRowsByName("isApproved", true);
                                    }}
                                />
                            )}
                            onDeleteRow={deleteStudent}
                            onSaveRow={updateStudent}
                        ></ManagementTable>
                    )}
                </div>
            </Body>
        </div>
    );
}

export default StudentManagement;
