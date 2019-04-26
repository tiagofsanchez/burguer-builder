import React from 'react';
import classes from './Backdrop.module.css';

const backdrop =(props) => {
    
    const { disableModel } = props
    return (
        <div 
        className={classes.Backdrop}
        onClick={disableModel}></div>
    )

};

export default backdrop