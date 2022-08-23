import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import OptionalAlert from "../ui/DialogMessage/OptionalDialog/OptionalDialog.component";
import { red, green, blue } from "@mui/material/colors";
import DateConverter from "../services/Converter/DateConverter";
import MajorService from "../services/Supporter/Major/Major";

function SMTypeModel(onEdit, onDelete, onSave, onClose) {
    return [
        { field: "stuId", headerName: "Student ID", width: 100 },
        {
            field: "firstName",
            headerName: "First name",
            width: 100,
            editable: false,
        },
        {
            field: "lastName",
            headerName: "Last name",
            width: 120,
            editable: false,
        },
        {
            field: "stuCode",
            headerName: "Student code",
            width: 140,
            editable: false,
        },
        {
            field: "class",
            headerName: "Class",
            width: 140,
            editable: false,
        },
        {
            field: "email",
            headerName: "Email",
            width: 250,
            editable: false,
        },
        {
            field: "phone",
            headerName: "Phone Number",
            width: 160,
            editable: false,
        },
        {
            field: "dateOfBirth",
            headerName: "Date of birth",
            type: "date",
            width: 140,
            editable: false,
            renderCell: (param) => {
                return DateConverter.parseShortDate(param.row.dateOfBirth);
            },
        },
        {
            field: "majorId",
            headerName: "Major Id",
            type: "singleSelect",
            valueOptions: MajorService.load(),
            width: 160,
            editable: false,
            renderCell: (param) => {
              let marjors = MajorService.load();
              let major = marjors.find((major) => param.row.majorId === major.majorId);
            //   console.log(major);
              return major.majorName;
            },
        },
        {
            field: "gpa",
            headerName: "GPA",
            type: "number",
            width: 100,
            headerAlign: "left",
            align: "left",
            editable: false,
        },
        {
            field: "capstone",
            headerName: "Capstone Type",
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
            width: 170,
            editable: false,
            renderCell: (param) => {
                if (param.row.typeCapstone === 1) {
                    return "Capstone 1";
                } else if (param.row.typeCapstone === 2) return "Capstone 2";
            },
        },
        {
            field: "codeLevel",
            headerName: "Code Level",
            width: 170,
            type: "singleSelect",
            valueOptions: [
                {
                    value: 1,
                    label: "Not Well",
                },
                {
                    value: 2,
                    label: "Medium",
                },
                {
                    value: 3,
                    label: "Good",
                },
                {
                    value: 4,
                    label: "Very Good",
                },
            ],
            editable: false,
            renderCell: (param) => {
                switch (param.row.codeLevel) {
                    case 1:
                        return "Not Well";
                    case 2:
                        return "Medium";
                    case 3:
                        return "Good";
                    case 4:
                        return "Very Good";
                }
            },
        },
        {
            field: "courseCreadits",
            headerName: "Course Credits",
            type: "number",
            width: 140,
            headerAlign: "left",
            align: "left",
            editable: false,
        },
        {
            field: "note",
            headerName: "Note",
            width: 140,
            editable: false,
        },
        {
            field: "isApproved",
            headerName: "Approved",
            type: "boolean",
            width: 100,
            editable: false,
        },
        {
            field: "toolbar",
            headerName: "Toolbar",
            width: 100,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <div className="d-flex justify-content-center">
                    <OptionalAlert
                        title="Message"
                        content="Do you want to approve this student ?"
                        onAgree={() => onSave(params.row)}
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

export default SMTypeModel;
