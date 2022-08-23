import { Button } from "@mui/material";
import React from "react";

function ApprovalButton({ isApproved, onClick }) {
    return (
        <Button
            onClick={onClick}
            color={isApproved ? "error" : "primary"}
            className="ml-auto"
            variant="contained"
        >
            {isApproved ? "Cancel" : "Approve"}
        </Button>
    );
}

export default ApprovalButton;
