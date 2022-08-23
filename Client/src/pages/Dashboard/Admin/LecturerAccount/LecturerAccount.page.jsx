import React, { useState, useEffect } from "react";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import styles from "./LecturerAccount.module.scss";

import ManagementTable from "../../../../ui/Table/ManagementTable/ManagementTable.component";
import AccountTypeTableModel from "../../../../models/AccountTypeTableModel";
import HeaderTable from "../../../../ui/Table/HeaderTable/HeaderTable.component";
import { axios } from "../../../../services/HttpClient/HttpClient";
import LoadingTable from "../../../../ui/Loading/LoadingTable/LoadingTable.component";
import LecturerAccount from "../../../../services/Supporter/LecturerAccount/LecturerAccount";
import BasicSnackbar from "../../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";

function LecturerAccountManagement() {
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
        let { data, isSuccess } = await LecturerAccount.load();
        if (isSuccess) {
            setAccounts(data);
        }
        setIsLoading(false);
    }, []);

    const deleteAccount = async (lecturer) => {
        let { resultMessage } = await LecturerAccount.remove(lecturer.userId);
        setMessage(resultMessage);
    };

    const resetPassword = async (lecturer, editRowById) => {
        await LecturerAccount.resetPassword(
            lecturer.userId,
            editRowById
        );
        
        setMessage({isOpen:true, content: "Reset successfull !"});
    };

    return (
        <div className={styles["account-management"]}>
            <Header>
                <div>
                    <h5>Lecturer Account Management</h5>
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
                                    (lecturer) =>
                                        resetPassword(lecturer, editRowById),
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

export default LecturerAccountManagement;
