import React, { useEffect } from "react";
import styles from "./DateTimePicker.module.scss";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import DateConverter from "../../../services/Converter/DateConverter";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import RegexValidation from "../../DataValidation/RegexValidation/RegexValidation.component";

function TimePicker({
    style,
    defaultValue = new Date().toISOString(),
    onChange = (value) => {},
    isSubmitted = false,
}) {
    const [value, setValue] = React.useState(defaultValue);

    const handleChange = (newValue) => {
        console.log(newValue.toUTCString());
        newValue = newValue.toISOString();
        setValue(newValue);
        onChange(newValue);
    };

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    return (
        <div className={styles["date-time-picker"]} style={style}>
            <div className={styles["date-time-picker_box"]}>
                <div className={styles["picker"]}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDateTimePicker
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>

                <div className={styles["date-time-input"]}>
                    <input
                        value={DateConverter.parseShortDateTime(value)}
                        className="form-control"
                    />
                    <EventOutlinedIcon />
                </div>
            </div>

            {isSubmitted && !value && (
                <RegexValidation message="Date Time is required !" />
            )}
        </div>
    );
}

export default TimePicker;
