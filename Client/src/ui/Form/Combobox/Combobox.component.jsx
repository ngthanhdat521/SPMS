import React, { useState } from 'react';
import RegexValidation from '../../DataValidation/RegexValidation/RegexValidation.component';

function Combobox({ defaultValue, field = "field", onChange, message, list, shownName, gettedName, isSubmitted }) {
    const [text, setText] = useState("");

    const handleChange = (event) => {
        let displayedName = "";
        list.map((item)=> {
            if(item[gettedName] === event.target.value) displayedName = item[shownName];
        });
        event.target.displayedName = displayedName;
        onChange(event);
        setText(event.target.value);
    }

    return (
        <div>
            <select onChange={handleChange} value={defaultValue} className="form-control w-100">
                <option>Choose a {field}</option>
                {
                    list.map((item,index) => {
                        return <option key={index} value={item[gettedName]}>{item[shownName]}</option>;
                    })
                }
            </select>
            <RegexValidation message={!defaultValue && isSubmitted && !text ? message : ""} />
        </div>
    );
}

export default Combobox;