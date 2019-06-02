import React from 'react';

import classes from './Input.module.css';

const input = (props) => {

    const { label, elementType, value, elementConfig , changed } = props;

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    switch (elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...elementConfig}
                value={value} 
                onChange={changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...elementConfig}
                value={value} 
                onChange={changed}/>;
            break;
        case ('select'):
            inputElement = (
            <select
                className={inputClasses.join(' ')}
                value={value}
                onChange={changed}>
                {elementConfig.options.map (option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
                </select>);
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...elementConfig}
                value={value} 
                onChange={changed}/>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{label}</label>
            {inputElement}
        </div>
    )
}

export default input;