import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function ValidatedCheckbox({ onChange, list }) {

    return (
        <FormGroup>
            <div className="d-flex">
                {
                    list.map((item) => <FormControlLabel control={<Checkbox onChange={(event) => { onChange(event, item); }} defaultChecked={item.checked} />} label={item.label} />)
                }
            </div>
        </FormGroup>
    );
}