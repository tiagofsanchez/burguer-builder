import React from 'react';

const input = (props) => {

    const { lable, inputType } = props;

    let inputElement = null;

    switch (inputType) {
        case ('input'):
            inputElement = <input />;
            break;
        case ('textarea'):
            inputElement = <textarea />;
            break;
        default: 
        

    }


    return (
        <div>
            <label>{lable}</label>
            {inputElement}
        </div>
    )
}

export default input;
