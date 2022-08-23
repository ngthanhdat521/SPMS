import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./AdvancedTable.module.scss";

export default function AdvancedTable({
    rows,
    columns,
    onChange,
    currentRow,
    onSelectionChange,
    idField = "id",
    children,
}) {
    return (
        <div className={styles["advanced-table"] + " advanced-table"}>
            <DataGrid
                loading={false}
                getRowId={(r) => r[idField]}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                onEditRowsModelChange={onChange}
                components={{
                    Toolbar: () => <div>{children}</div>,
                }}
                editRowsModel={currentRow}
                editMode="row"
                style={{ border: "none" }}
                onSelectionModelChange={(newSelection) => {
                    onSelectionChange(newSelection);
                }}
            />
        </div>
    );
}
