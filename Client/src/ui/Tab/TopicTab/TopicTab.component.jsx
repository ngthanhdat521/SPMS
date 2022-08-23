import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import styles from "./TopicTab.module.scss";

export default function TopicTab({ onChange }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onChange(event, newValue);
    };

    return (
        <Box className={styles["topic-tab"]}>
            <AppBar position="inherit">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="transparent"
                    textColor="inherit"
                    variant="fullWidth"
                    style={{padding:"0px"}}
                >
                    <Tab label="All" />
                    <Tab label="Capstone 1" />
                    <Tab label="Capstone 2" />
                </Tabs>
            </AppBar>
        </Box>
    );
}
