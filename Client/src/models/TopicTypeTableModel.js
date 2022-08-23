import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import OptionalAlert from "../ui/DialogMessage/OptionalDialog/OptionalDialog.component";
import { red, green, blue } from "@mui/material/colors";

function TopicTypeTableModel(onEdit, onDelete, onSave, onClose) {
    return [
        {
            field: "topicId",
            identity: true,
            headerName: "Topic Id",
            width: 120,
        }, // sdfeu-1df3-fa
        {
            field: "title",
            headerName: "Title",
            width: 200,
            editable: true,
        },
        {
            field: "desc",
            headerName: "Description",
            width: 350,
            editable: true,
        },
        {
            field: "type",
            headerName: "Type",
            width: 130,
            editable: true,
            type: "singleSelect",
            valueOptions: [
                {
                    value: 1,
                    label: "Capstone 1",
                },
                {
                    value: 2,
                    label: "Capstone 2",
                },
            ],
        },
        {
            field: "leader",
            headerName: "Leader",
            width: 140,
            editable: true,
        },
        {
            field: "groupId",
            headerName: "Group Id",
            width: 150,
            editable: true,
        },
        {
            field: "groupTitle",
            headerName: "Group Name",
            width: 170,
            editable: true,
        },
        {
            field: "isApproved",
            headerName: "Approved",
            type: "boolean",
            width: 140,
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
                        content="Do you want to save this topic ?"
                        onAgree={() => onEdit(params.row)}
                    >
                        <DeleteOutlineOutlinedIcon
                            sx={{ color: red[500] }}
                            className="cursor-pointer"
                            onClick={() => onDelete(params.row)}
                        />
                    </OptionalAlert>
                </div>
            ),
            renderEditCell: (params) => (
                <div className="d-flex">
                    <OptionalAlert
                        title="Message"
                        content="Do you want to save this topic ?"
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

export default TopicTypeTableModel;
