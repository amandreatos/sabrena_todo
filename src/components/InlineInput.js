import React from 'react';

const InlineInput = () => {
    return(
        <div class="input-field-container inline">
            <input id="textFieldOne" placeholder="Full Name" type="text" class="text-field" />
            <button class="button input-button">Submit</button>
        </div>
    )
}

export default InlineInput;