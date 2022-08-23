import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import styles from "./BasicTab.module.scss";

export default function BasicTab() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box className={styles["basic-tab"]}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="inherit"
                variant="fullWidth"
            >
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
            </Tabs>
        </Box>
    );
}
