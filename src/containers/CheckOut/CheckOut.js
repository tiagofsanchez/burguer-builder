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
    
    //here I will get the information that pass into the URL so that I can use it here in the state of my componet
    componentDidMount () {
        
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for ( let p of query ) {
            ingredients[p[0]] = +p[1];
        }
        this.setState({
            ingredients: ingredients,
        })
        console.log(ingredients);
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