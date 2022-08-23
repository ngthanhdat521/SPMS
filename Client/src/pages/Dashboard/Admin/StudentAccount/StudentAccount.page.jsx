import React, { useState, useEffect } from "react";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import styles from "./StudentAccount.module.scss";

import ManagementTable from "../../../../ui/Table/ManagementTable/ManagementTable.component";
import AccountTypeTableModel from "../../../../models/AccountTypeTableModel";
import HeaderTable from "../../../../ui/Table/HeaderTable/HeaderTable.component";
import { axios } from "../../../../services/HttpClient/HttpClient";
import LoadingTable from "../../../../ui/Loading/LoadingTable/LoadingTable.component";
import StudentAccount from "../../../../services/Supporter/StudentAccount/StudentAccount";
import BasicSnackbar from "../../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";

function StudentAccountManagement() {
    const [accounts, setAccounts] = useState([]);
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
        password: "",
    };

    useEffect(async () => {
        setIsLoading(true);
        let { data, isSuccess } = await StudentAccount.load();
        if (isSuccess) {
            setAccounts(data);
        }
        setIsLoading(false);
    }, []);

    const deleteAccount = async (student) => {
        let { resultMessage } = await StudentAccount.remove(student.userId);
        setMessage(resultMessage);
    };

    const resetPassword = async (student, editRowById) => {
        setMessage({isOpen:true, content: "Reset successfull !"});
        await StudentAccount.resetPassword(
            student.userId,
            editRowById
        );
        
    };

    return (
        <div className={styles["account-management"]}>
            <Header>
                <div>
                    <h5>Student Account Management</h5>
                </div>
            </Header>
            <Body>
                <BasicSnackbar
                    isOpen={message.isOpen}
                    content={message.content}
                    onClose={() => setMessage({ content: "", isOpen: false })}
                />
                <div className={styles["advanced-table"]}>
                    {isLoading ? (
                        <LoadingTable />
                    ) : (
                        <ManagementTable
                            defaultRows={accounts}
                            Model={Model}
                            idField="userId"
                            // onSaveRow={saveAccount}
                            onDeleteRow={deleteAccount}
                            TypeTableModel={({ editRowById, deleteRow }) => {
                                return AccountTypeTableModel(
                                    (student) =>
                                        resetPassword(student, editRowById),
                                    deleteRow
                                );
                            }}
                            HeaderTable={() => <div></div>}
                        ></ManagementTable>
                    )}
                </div>
            </Body>
        </div>
    );
}

export default StudentAccountManagement;
