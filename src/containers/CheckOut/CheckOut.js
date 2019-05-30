import React from 'react'; 

import CheckOutSummary from '../../components/Order/CheckOutSummary/ChecktOutSummary';

class CheckOut extends React.Component { 

    state ={
        ingredients: {
            salad: 1,
            meat: 1, 
            cheese: 1, 
            bacon: 1
        }
    }
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();

    } 

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }



    render () { 
        
        const { ingredients } = this.state;
        
        return (
            <div>
                <CheckOutSummary 
                    ingredients={ingredients}
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler}/>
            </div>
        )
    }
}

export default CheckOut;