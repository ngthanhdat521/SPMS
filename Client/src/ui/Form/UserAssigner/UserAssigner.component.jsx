import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import styles from "./UserAssigner.module.scss";

export default function ListCheckFinder({ onSearch, children }) {
    return (
        <Box
            className={styles["user-assigner"] + " light-border p-3"}
            sx={{ display: "flex", borderRadius: "5px" }}
        >
            <FormControl
                className="w-100"
                component="fieldset"
                variant="standard"
            >
                <div className={styles["user-assigner_search"]}>
                    <input
                        type="search"
                        className="form-control w-100 mb-3"
                        placeholder="Enter a name"
                        onChange={onSearch}
                    />
                    <div className={styles["user-assigner_search_users"]}>
                        {children[0]}
                    </div>
                </div>
                <div>{children[1]}</div>
            </FormControl>
        </Box>
    );
}
