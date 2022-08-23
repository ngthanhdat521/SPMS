import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./ManangementTable.module.scss";

function ManagementTable({
    defaultRows,
    Model,
    idField,
    TypeTableModel,
    HeaderTable,
    pageSize = 15,
    onSaveRow,
    onDeleteRow,
}) {
    const [rows, setRows] = useState(defaultRows);
    const [currentRow, setCurrentRow] = useState({});
    const [selections, setSelections] = useState([]);
    const [isAdd, setIsAdd] = useState(false);

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
                if (currentRow[i][j] !== undefined)
                    row[j] = currentRow[i][j].value;
            }
        }
        return row;
    };

    const addRow = () => {
        let newRows = [Model].concat(rows);

        setRows(newRows);
        setCurrentRow(convertRow(Model, true));

        focusInput();
        setIsAdd(true);
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

    const deleteRow = (row) => {
        let newRows = [...rows];
        let index = newRows.findIndex((r) => r[idField] === row[idField]);

        let ok = onDeleteRow(row, index);
        if (ok) {
            newRows.splice(index, 1);
            setRows(newRows);
        }
    };

    const deleteRows = () => {
        let newRows = [...rows];

        let ok = false;
        selections.map((selection) => {
            let index = newRows.findIndex((row) => row[idField] === selection);
            ok = onDeleteRow(newRows[index], index);
        });

        if (ok) {
            newRows = newRows.filter(
                (row) => selections.indexOf(row[idField]) < 0
            );
            setRows(newRows);
        }
    };

    const closeRow = () => {
        if (isAdd) {
            let newRows = [...rows];
            newRows.shift();
            setRows(newRows);
        }
        setIsAdd(false);
        setCurrentRow({});
    };

    const saveRow = async (row) => {
        let newRows = [...rows];
        let index = newRows.findIndex((r) => r[idField] === row[idField]);
        let { ok, status, data } = await onSaveRow(
            { ...row, ...convertCurrentRow() },
            isAdd
        );

        newRows[index] = { ...row, ...convertCurrentRow() };
        if (isAdd) newRows[index][idField] = data[idField];

        if (ok && status === 200) {
            setRows([...newRows]);
            setCurrentRow({});
        }
    };

    const editRow = (row) => {
        setCurrentRow(convertRow(row, true));
        setIsAdd(false);
    };

    const editRowsByName = (value, name) => {
        var newRows = [...rows];
        selections.map((selection) => {
            for (let index in newRows) {
                if (selection === newRows[index][idField])
                    newRows[index][name] = value;
            }
        });
        setRows(newRows);
    };

    const editRowById = (id, value, name) => {
        var newRows = [...rows];
        for (let index in newRows) {
            if (newRows[index][idField] === id) newRows[index][name] = value;
        }
        setRows(newRows);
    };

    useEffect(() => {
        setRows(defaultRows);
    }, [defaultRows]);

    return (
        <div className={styles["management-table"] + " management-table"}>
            <DataGrid
                getRowId={(r) => r[idField]}
                rows={rows}
                columns={TypeTableModel({
                    editRow,
                    deleteRow,
                    saveRow,
                    closeRow,
                    editRowsByName,
                    editRowById,
                })}
                pageSize={pageSize}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                onCellClick={(row) => {}}
                onEditRowsModelChange={(model) => {
                    setCurrentRow(model);
                }}
                components={{
                    LoadingOverlay: LinearProgress,
                    Toolbar: () => (
                        <HeaderTable
                            onAdd={addRow}
                            onDelete={deleteRows}
                            selections={selections}
                            editRowsByName={editRowsByName}
                        />
                    ),
                }}
                editRowsModel={currentRow}
                editMode="row"
                style={{ border: "none" }}
                onSelectionModelChange={(newSelection) => {
                    setSelections(newSelection);
                }}
            />
        </div>
    );
}

export default ManagementTable;
