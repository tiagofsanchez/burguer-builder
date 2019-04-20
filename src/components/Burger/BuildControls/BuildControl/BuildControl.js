import React from 'react';

import classes from './BuildControl.module.css';

const buildControl = (props) => {
    const { label , addIngredient , deleteIngredient } = props;
    

    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{label}</div>
            <button className={classes.Less} onClick={deleteIngredient}>Less</button>
            <button className={classes.More} onClick={addIngredient} >More</button>
        </div>
    )
}

export default buildControl;