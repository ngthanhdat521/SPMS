import React, { useEffect, useState } from "react";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import LecturerTypeTableModel from "../../../../models/LecturerTypeTableModel";
import HeaderTable from "../../../../ui/Table/HeaderTable/HeaderTable.component";
import LoadingTable from "../../../../ui/Loading/LoadingTable/LoadingTable.component";
import ManagementTable from "../../../../ui/Table/ManagementTable/ManagementTable.component";
import { axios } from "../../../../services/HttpClient/HttpClient";
import styles from "./LecturerManagement.module.scss";
import BasicSnackbar from "../../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";
import LecturerForm from "../../../../components/LecturerManagement/LecturerForm/LecturerForm.component";

function LectureManagement() {
    const [lecturers, setLecturers] = useState([]);
    const [isInvisible, setIsInvisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({
        isOpen: false,
        content: "",
    });

    const Model = {
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        depName: "",
        academicLevel: "",
    };

    const saveLecturer = async (lecturer, isAdd) => {
        if (!isAdd) {
            let { status, ok } = await axios({
                url: "/api/lecturer/update/" + lecturer.userId,
                data: lecturer,
                method: "post",
            });

            if (ok && status === 200)
                setMessage({ content: "Update successfully!", isOpen: true });
            else setMessage({ content: "Fail to update!", isOpen: true });
            return ok && status === 200;
        }
    };

    const addLecturer = async (email) => {
        let { status, ok, data } = await axios({
            url: "/api/lecturer/add",
            data: { email: email },
            method: "post",
        });

        let newLecturers = [...lecturers];

        if (ok && status === 200) {
            newLecturers = [{ userId: data.lecturer.userId, email: email }].concat(
                newLecturers
            );
            console.log(data);
            setMessage({ content: "Add successfully!", isOpen: true });
        } else {
            newLecturers.splice(0, 1);
            setMessage({ content: "Fail to add!", isOpen: true });
        }

        setLecturers(newLecturers);
    };

    const deleteLecturer = async (row, index) => {
        let { ok, status } = await axios({
            url: "/api/user/delete/" + row.userId,
            method: "post",
        });
        let newLecturers = [...lecturers];

        if (ok && status === 200) {
            setMessage({ content: "Delete successfully!", isOpen: true });
            return true;
        } else {
            newLecturers.splice(index, 0);
            setMessage({ content: "Fail to delete!", isOpen: true });
        }

        setLecturers(newLecturers);
        return ok && status === 200;
    };

    useEffect(async () => {
        setIsLoading(true);

        let { data, ok, status } = await axios({
            url: "/api/lecturer/list",
            method: "get",
        });

        if (ok && status === 200) setLecturers(data);

        setIsLoading(false);
    }, []);

    return (
        <div className={styles["lecturer-management"]}>
            <Header>
                <h5>Lecturer Manangement</h5>
                <div className="d-flex justify-content-end">
                    <input
                        type="text"
                        className="form-control w-50 mr-2"
                        placeholder="Search topics"
                    />
                </div>
            </Header>
            <Body>
                {isInvisible || (
                    <LecturerForm
                        onSubmit={addLecturer}
                        onClose={() => setIsInvisible(true)}
                    />
                )}

                <BasicSnackbar
                    isOpen={message.isOpen}
                    content={message.content}
                    onClose={() => setMessage({ content: "", isOpen: false })}
                />
                {isLoading ? (
                    <LoadingTable />
                ) : (
                    <ManagementTable
                        defaultRows={lecturers}
                        Model={Model}
                        idField="userId"
                        onSaveRow={saveLecturer}
                        onDeleteRow={deleteLecturer}
                        TypeTableModel={({
                            editRow,
                            deleteRow,
                            saveRow,
                            closeRow,
                        }) => {
                            return LecturerTypeTableModel(
                                editRow,
                                deleteRow,
                                saveRow,
                                closeRow
                            );
                        }}
                        HeaderTable={({ onAdd, onDelete }) => (
                            <HeaderTable
                                data={lecturers}
                                onAdd={() => setIsInvisible(false)}
                                onDelete={onDelete}
                            />
                        )}
                    />
                )}
            </Body>
        </div>
    );
}

export default LectureManagement;
