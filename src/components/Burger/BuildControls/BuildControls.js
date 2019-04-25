import React from 'react';

import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const buildControls = (props) => {

    const { addIngredient, deleteIngredient, disabled, price , purchasable } = props;

    return (
        <div className={classes.BuildControls}>
            <p>Current Burguer Price:<strong> {price.toFixed(2)} </strong> </p>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    addIngredient={() => addIngredient(ctrl.type)}
                    deleteIngredient={() => deleteIngredient(ctrl.type)}
                    disabled={disabled[ctrl.type]}
                />
            ))}
            <button
                className={classes.OrderButton}
                disabled={purchasable}>ORDER NOW</button>
        </div>
    )
}

export default buildControls;