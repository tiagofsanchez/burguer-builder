import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => { 

    const { ingredients } = props;
    
    const ingredientsSummary = Object.keys(ingredients)
        .map(ingKey => {
            return <li key={ingKey}><span>{ingKey}</span>: {ingredients[ingKey]}</li>
        })

    return (
        <Aux>
            <h3>Your Order!</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to CheckOut!</p>
        </Aux>
    );
}

export default orderSummary;