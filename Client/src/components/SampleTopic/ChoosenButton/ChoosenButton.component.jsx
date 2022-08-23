import Button from "@mui/material/Button";
import React from "react";

function ChoosenButton({ isChoosen, onChoose }) {
    return (
        <Button
            color={isChoosen ? "error" : "primary"}
            onClick={onChoose}
            variant="contained"
        >
            {isChoosen ? "Cancel" : "Choose"}
        </Button>
    );
}

export default ChoosenButton;
