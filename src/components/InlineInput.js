import React from 'react';

const InlineInput = () => {
    return(
        <div class="input-field-container inline">
            <input id="textFieldOne" placeholder="Full Name" type="text" onChange={props.handleChange} class="text-field" />
            <button class="button input-button">Add!</button>
        </div>
    )
}

export default InlineInput;