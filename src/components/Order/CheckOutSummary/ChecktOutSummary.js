import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckOutSummary.module.css';

const checkOutSummary = (props) => {

    const { ingredients } = props;

    return (
        <div className={classes.CheckOutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{ width: '100%' , margin: 'auto'}}>
                <Burger ingredients={ingredients} />
            </div>
            <div>
                <Button
                    btnType="Danger"
                    clicked>CANCEL</Button>
                <Button
                    btnType="Success"
                    clicked>CONTIUNE</Button>
            </div>
        </div>

    );
}

export default checkOutSummary; 