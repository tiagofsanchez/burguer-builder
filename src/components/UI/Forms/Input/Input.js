import React from 'react';

import classes from './Input.module.css';

const input = (props) => {

    const { label, elementType, value , elementConfig} = props;

    let inputElement = null;
    switch (elementType) {
        case ('input'):
            inputElement = <input
                className={classes.InputElement}
                {...elementConfig}
                value={value} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={classes.InputElement}
                {...elementConfig}
                value={value} />;
            break;
        default:
            inputElement = <input
                className={classes.InputElement}
                {...elementConfig}
                value={value} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{label}</label>
            {inputElement}
        </div>
    )
}

export default input;