import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button'


class OrderSummary extends React.Component {

    componentDidUpdate() { 
        console.log('[OrderSummary]: DidMount')
    }

    render() {


        const { ingredients, disableModel, continuePurchase, price } = this.props;

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
                <p><strong>Current Burguer Price: {price.toFixed(2)} </strong> </p>
                <p>Continue to CheckOut!</p>
                <Button btnType="Danger" clicked={disableModel}>CANCEL</Button>
                <Button btnType="Success" clicked={continuePurchase} >PROCEED</Button>
        
            </Aux>
        );
    }
}

export default OrderSummary;