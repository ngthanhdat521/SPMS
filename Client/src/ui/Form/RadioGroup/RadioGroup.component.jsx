import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup( {handleChange} ) {
  return (
    <FormControl onChange = {(e) => handleChange(e)}>
      <FormLabel className='text-center' id="demo-row-radio-buttons-group-label">Academic Ranking</FormLabel>
      <RadioGroup
        className='d-flex justify-content-center'
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="all"
      >
        <FormControlLabel value="all" control={<Radio />} label="All students" />
        <FormControlLabel value="excellent" control={<Radio />} label="Excellent" />
        <FormControlLabel value="veryGood" control={<Radio />} label="Very good" />
        <FormControlLabel value="good" control={<Radio />} label="Good" />
        <FormControlLabel value="average" control={<Radio />} label="Average" />
        {/* <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label="other"
        /> */}
      </RadioGroup>
    </FormControl>
  );
}