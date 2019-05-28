import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './checkOutSummary.module.css';

const checkOutSummary = (props) => {

    const { ingredients } = props;

    return (
        <div className={classes.CheckOutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{ width: '300px', height: '300px', margin: 'auto' }}>
                <Burger ingredients={ingredients} />
            </div>
            <Button
                btnType="Danger"
                clicked>CANCEL</Button>
            <Button
                btnType="Success"
                clicked>CONTIUNE</Button>
        </div>

    );
}

export default checkOutSummary; 