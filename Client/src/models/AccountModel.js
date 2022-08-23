import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import OptionalAlert from "../ui/DialogMessage/OptionalDialog/OptionalDialog.component";
import { red, green, blue } from "@mui/material/colors";
import DateConverter from "../services/Converter/DateConverter";

function AccountModel(onEdit, onDelete, onSave, onClose) {
  return [
    { field: "userId", headerName: "Account ID", width: 90, editable: false },
    {
      field: "firstName",
      headerName: "First name",
      width: 200,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 140,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 160,
      editable: true,
    },
    {
      field: "dateOfBirth",
      headerName: "Date of birth",
      type: "date",
      width: 140,
      editable: true,
      renderCell: (param) => {
        return DateConverter.parseShortDate(param.row.dateOfBirth);
      },
    },
    {
      field: "depName",
      headerName: "Department",
      width: 160,
      renderCell: (params)=>{
        return "Internation School";
      }
    },
    {
      field: "role",
      headerName: "Role",
      type: "singleSelect",
      valueOptions: [
        {
          value: 1,
          label: "Student",
        },
        {
          value: 2,
          label: "Lecturer",
        },
      ],
      width: 160,
      renderCell: (params)=>{
        return params.row.role ===  1 ? "Student":"Lecturer";
      }
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
            content="Do you want to delete this topic ?"
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
            content="Do you want to save this topic ?"
            onAgree={() => onSave(params.row)}
          >
            <SaveOutlinedIcon
              className="cursor-pointer"
              sx={{ color: green[500] }}
            />
          </OptionalAlert>
          <CloseOutlinedIcon className="cursor-pointer" onClick={onClose} />
        </div>
      ),
    },
  ];
}

export default AccountModel;
