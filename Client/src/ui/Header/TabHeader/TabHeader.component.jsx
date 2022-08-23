import { Button } from "@mui/material";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import styles from "./TabHeader.module.scss";

function TabHeader(props) {
    return (
        <div className={styles["tab-header"]}>
            <div className="row">
                <div className="col-xl-6 col-sm-12">
                    <div>
                        <Button variant="contained">Add Item</Button>
                    </div>
                </div>
                <div className="col-xl-6 col-sm-12">
                    <div className="d-flex justify-content-end">
                        <Box className={styles["tab-header_box"]}>
                            <AppBar position="inherit">
                                <Tabs textColor="inherit" variant="fullWidth">
                                    <Tab label="Item One" />
                                    <Tab label="Item Two" />
                                    <Tab label="Item Three" />
                                </Tabs>
                            </AppBar>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabHeader;
