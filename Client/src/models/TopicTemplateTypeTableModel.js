import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import OptionalAlert from "../ui/DialogMessage/OptionalDialog/OptionalDialog.component";
import { green } from "@mui/material/colors";

function TopicTemplateTypeTableModel(onApprove) {
    return [
        {
            field: "projectId",
            headerName: "Project Id",
            width: 200,
        },
        {
            field: "title",
            headerName: "Title",
            width: 200,
        },
        {
            field: "desc",
            headerName: "Description",
            width: 550,
        },
        {
            field: "groupTitle",
            headerName: "Group Name",
            width: 150,
        },
        {
            field: "fullName",
            headerName: "Leader",
            width: 150,
        },
        {
            field: "fullName",
            headerName: "Leader",
            width: 250,
        },
        {
            field: "isApproved",
            headerName: "Status",
            width: 100,
            type: "boolean",
        },
        {
            field: "toolbar",
            headerName: "Toolbar",
            width: 100,
            renderCell: (params) => (
                <div className="d-flex">
                    <OptionalAlert
                        title="Message"
                        content="Do you want to delete this topic ?"
                        onAgree={() =>
                            onApprove(params.row.projectId, true, "isApproved")
                        }
                    >
                        <CheckBoxOutlinedIcon
                            sx={{ color: green[500] }}
                            className="cursor-pointer"
                        />
                    </OptionalAlert>
                </div>
            ),
        },
    ];
}

export default TopicTemplateTypeTableModel;
