import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => {

    const { clicked } = props
    return (
        <div
            className={classes.Backdrop}
            onClick={clicked}>
        </div>
    )

};

export default backdrop