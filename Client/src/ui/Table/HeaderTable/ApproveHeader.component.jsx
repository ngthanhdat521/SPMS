import React from "react";
import Button from "@mui/material/Button";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import OptionalDialog from "../../DialogMessage/OptionalDialog/OptionalDialog.component";
function ApproveHeader({ onApprove }) {
    return (
        <div className="d-flex align-items-center">
            <OptionalDialog title="Message" content="Do you want to approve all ?" onAgree={onApprove}>
                <Button>
                    <CheckBoxOutlinedIcon />{" "}
                    <span className="ml-2 pt-1">Approve All</span>
                </Button>
            </OptionalDialog>
        </div>
    );
}

export default ApproveHeader;
