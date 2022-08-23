import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import OptionalAlert from "../ui/DialogMessage/OptionalDialog/OptionalDialog.component";
import { red, green, blue } from "@mui/material/colors";
import DateConverter from "../services/Converter/DateConverter";
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';

function AccountTypeTableModel(onReset, onDelete) {
  return [
    { field: "userId", headerName: "Account ID", width: 200, editable: false }, 
    {
      field: "firstName",
      headerName: "First name",
      width: 300,
      editable: false,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 300,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      editable: false,
    },
    {
      field: "toolbar",
      headerName: "Toolbar",
      editable: false,
      width: 100,
      renderCell: (params) => (
        <div className="d-flex">
          <OptionalAlert
            title="Message"
            content="Do you want to reset password for this user ?"
            onAgree={() => onReset(params.row)}
          >
          <LockResetOutlinedIcon
            sx={{ color: blue[500] }}
            className="cursor-pointer"
          />
          </OptionalAlert>
          <OptionalAlert
            title="Message"
            content="Do you want to delete this user ?"
            onAgree={() => onDelete(params.row)}
          >
            <DeleteOutlineOutlinedIcon
              sx={{ color: red[500] }}
              className="cursor-pointer"
            />
          </OptionalAlert>
        </div>
      )
    },
  ];
}

export default AccountTypeTableModel;
