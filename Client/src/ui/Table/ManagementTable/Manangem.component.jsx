import React, { useState } from "react";
import Body from "../../../../components/Body/Body.component";
import Header from "../../../../components/Header/Header.component";
import TopicTypeTableModel from "../../../../models/TopicTypeTableModel";
import AdvancedTable from "../../../../ui/Table/AdvancedTable/AdvancedTable.component";
import HeaderTable from "../../../../ui/Table/HeaderTable/HeaderTable.component";
import styles from "./MyTopic.module.scss";

function MyTopic() {
    const [rows, setRows] = useState([
        {
            topicId: "2",
            title: "Snow1",
            desc: "Jon1",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
        {
            topicId: "3",
            title: "Snow2",
            desc: "Jon1",
            type: "NCKH",
            leader: "Nguyen Long",
            groupId: "wei2-qasdf-12vvv",
            groupTitle: "Topic 30",
            isApproved: "Approved",
        },
    ]);

    const Model = {
        topicId: "",
        title: "",
        desc: "",
        type: "",
        leader: "",
        groupId: "",
        groupTitle: "",
        isApproved: "",
    };

    const idField = "topicId";

    const [currentRow, setCurrentRow] = useState({});

    const [selections, setSelections] = useState([]);

    const convertRow = (row, isOpen) => {
        let newRow = {};
        newRow[row[idField]] = {};
        for (let i in row) {
            newRow[row[idField]][i] = {};
            newRow[row[idField]][i].value = row[i];
        }
        if (isOpen) newRow[row[idField]].toolbar = { value: undefined };
        return newRow;
    };

    const convertCurrentRow = () => {
        let row = {};
        for (let i in currentRow) {
            for (let j in Model) {
                row[j] = currentRow[i][j].value;
            }
        }
        return row;
    };

    const addTopic = () => {
        let newRows = [Model].concat(rows);

        setRows([...newRows]);

        setCurrentRow(convertRow(Model));

        focusInput();
    };

    const focusInput = () => {
        setTimeout(() => {
            if (
                document.querySelectorAll(
                    ".MuiDataGrid-cell .MuiInputBase-input"
                ).length
            ) {
                document
                    .querySelectorAll(
                        ".MuiDataGrid-cell .MuiInputBase-input"
                    )[0]
                    .focus();
            }
        }, 1);
    };

    const deleteTopic = (row) => {
        let newRows = [...rows];
        let index = newRows.findIndex(
            (row) => row[idField] === row.topicId
        );
        newTopics.splice(index, 1);
        setTopics(newTopics);
    };

    const deleteTopics = () => {
        let newRows = [...topics];
        newRows = newRows.filter((row) => selections.indexOf(row[idField]) < 0);
        setTopics(newRows);
    };

    const searchTopic = (event) => {
        let { value } = event.target;
        let newTopics = topics.filter(
            (topic) => topic.title.toUpperCase().indexOf(value) >= 0
        );
        setTopics([...newTopics]);
    };

    const closeTopic = () => {
        let newTopics = [...topics];
        newTopics.shift();
        setTopics(newTopics);
    };

    const saveTopic = (row) => {
        let newTopics = [...topics];
        let index = newTopics.findIndex(
            (topic) => topic.topicId === row.topicId
        );
        console.log(row);
        newTopics[index] = convertCurrentRow();
        setTopics([...newTopics]);
        setCurrentRow({});
    };

    const editTopic = (row) => {
        setCurrentRow(convertRow(row));
    };

    return (
        <div className={styles["my-topic"]}>
            <Header>
                <h5>My Topic</h5>
                <div className="d-flex justify-content-end">
                    <input
                        type="text"
                        className="form-control w-50 mr-2"
                        placeholder="Search topics"
                        onChange={searchTopic}
                    />
                </div>
            </Header>
            <Body>
                <AdvancedTable
                    rows={topics}
                    columns={TopicTypeTableModel(
                        editTopic,
                        deleteTopic,
                        saveTopic,
                        () => setCurrentRow({})
                    )}
                    currentRow={currentRow}
                    onChange={(model) => setCurrentRow(model)}
                    onSelectionChange={(models) => setSelections(models)}
                    idField={idField}
                >
                    <HeaderTable onAdd={addTopic} onDelete={deleteTopics} />
                </AdvancedTable>
            </Body>
        </div>
    );
}

export default MyTopic;
