import React, { useState } from "react";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import styles from "./AccountManagement.module.scss";

import ManagementTable from "../../../../ui/Table/ManagementTable/ManagementTable.component";
import AccountModel from "../../../../models/AccountModel";
import HeaderTable from "../../../../ui/Table/HeaderTable/HeaderTable.component";
import { axios } from "../../../../services/HttpClient/HttpClient";
function AccountManagement() {
  const [accounts, setAccounts] = useState([
    {
      userId: 1,
      firstName: "Huy",
      lastName: "Truong",
      email: "huydongtruong@gmail.com",
      phone: "20323578239",
      password: "sdojospdgjodpsg",
      dateOfBirth: "2000-05-17 07:00:00+07",
      depName: "International School",
      role: 1,
    },
    {
      userId: 2,
      firstName: "Dat",
      lastName: "Truong",
      email: "huydongtruong@gmail.com",
      phone: "20323578239",
      password: "sdojospdgjodpsg",
      dateOfBirth: "2000-05-17 07:00:00+07",
      depName: "International School",
      role: 2,
    },
  ]);

  const Model = {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    depName: "",
    role:""
  };

  const saveAccount = async (account, isAdd) => {
    // delete account.userId;
    account.dateOfBirth = account.dateOfBirth.toISOString();
    console.log(account);
    
    if (isAdd) {
      let { status, ok, data } = await axios({
        url: "/api/user/add",
        data: account,
        method: "post",
      });

      return { status, ok, data };
    }
  };
  const deleteAccount = () => {
    return true;
  };
  return (
    <div className={styles["account-management"]}>
      <Header>
        <div>
          <h5>Account Management</h5>
        </div>
      </Header>
      <Body>
        <div className={styles["advanced-table"]}>
          <ManagementTable
            defaultRows={accounts}
            Model={Model}
            idField="userId"
            onSaveRow={saveAccount}
            onDeleteRow={deleteAccount}
            TypeTableModel={(editRow, deleteRow, saveRow, closeRow) => {
              return AccountModel(editRow, deleteRow, saveRow, closeRow);
            }}
            HeaderTable={({ onAdd, onDelete }) => (
              <HeaderTable onAdd={onAdd} onDelete={onDelete}></HeaderTable>
            )}
          ></ManagementTable>
        </div>
      </Body>
    </div>
  );
}

export default AccountManagement;
