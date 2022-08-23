import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import CheckMember from "../CheckMember/CheckMember.component";

export default function ListCheckbox({ list, onChange }) {
    return (
        <Box
            className="light-border p-3"
            sx={{ display: "flex", borderRadius: "5px" }}
        >
            <FormControl
                className="w-100"
                component="fieldset"
                variant="standard"
            >
                <input
                    type="search"
                    className="form-control w-100 mb-3"
                    placeholder="Enter a name"
                />
                {list.map((item, index) => (
                    <CheckMember
                        fullName={item.fullName}
                        email={item.email}
                        defaultValue={item.isChecked}
                        key={index}
                        onChange={(isChecked) =>
                            onChange(item, index, isChecked)
                        }
                    />
                ))}
            </FormControl>
        </Box>
    );
}
