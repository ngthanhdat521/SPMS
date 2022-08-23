import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import OptionalAlert from "../ui/DialogMessage/OptionalDialog/OptionalDialog.component";
import { red, green, blue } from "@mui/material/colors";

function LecturerTypeTableModel(onEdit, onDelete, onSave, onClose) {
    return [
        {
            field: "userId",
            headerName: "User Id",
            width: 200,
        },
        {
            field: "firstName",
            headerName: "First Name",
            width: 200,
            editable: true,
        },
        {
            field: "lastName",
            headerName: "Last Name",
            width: 200,
            editable: true,
        },
        {
            field: "email",
            headerName: "Email",
            width: 300,
            editable: true,
        },
        {
            field: "depName",
            headerName: "Department",
            width: 200,
            editable: true,
        },
        {
            field: "phone",
            headerName: "Phone",
            width: 140,
            editable: true,
        },
        {
            field: "academicLevel",
            headerName: "Academic Level",
            width: 150,
            editable: true,
        },
        {
            field: "toolbar",
            headerName: "Toolbar",
            width: 100,
            renderCell: (params) => (
                <div className="d-flex">
                    <ModeEditOutlineOutlinedIcon
                        sx={{ color: blue[500] }}
                        className="cursor-pointer"
                        onClick={() => onEdit(params.row)}
                    />
                    <OptionalAlert
                        title="Message"
                        content="Do you want to delete this lecturer ?"
                        onAgree={() => onDelete(params.row)}
                    >
                        <DeleteOutlineOutlinedIcon
                            sx={{ color: red[500] }}
                            className="cursor-pointer"
                        />
                    </OptionalAlert>
                </div>
            ),
            renderEditCell: (params) => (
                <div className="d-flex">
                    <OptionalAlert
                        title="Message"
                        content="Do you want to save this lecturer ?"
                        onAgree={() => onSave(params.row)}
                    >
                        <SaveOutlinedIcon
                            className="cursor-pointer"
                            sx={{ color: green[500] }}
                        />
                    </OptionalAlert>
                    <CloseOutlinedIcon
                        className="cursor-pointer"
                        onClick={onClose}
                    />
                </div>
            ),
        },
    ];
}

export default LecturerTypeTableModel;
