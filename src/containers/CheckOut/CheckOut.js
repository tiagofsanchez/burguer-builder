import React from 'react'; 

import CheckOutSummary from '../../components/Order/CheckOutSummary/ChecktOutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class CheckOut extends React.Component { 

    state ={
        ingredients: null,
        totalPrice: 0
    }
    
    //here I will get the information that pass into the URL so that I can use it here in the state of my componet
    componentWillMount () {
        
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for ( let p of query.entries() ) {
            if(p[0] === 'price') {
                price = p[1]
            } else {
                ingredients[p[0]] = +p[1];
            }
            
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: price
        })
        console.log(ingredients);
        console.log(price)
        
    }
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    } 

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    //Route can use component as a property of render={()=>()} with the arrouw function to render a certain component.
    //here this will be super important for 
    render () { 
        
        const { ingredients , totalPrice } = this.state;
        
        return (
            <div>
                <CheckOutSummary 
                    ingredients={ingredients}
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler}/>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props)=><ContactData ingredients={ingredients} price={totalPrice} {...props}/>} />
            </div>
        )
    }
}

export default CheckOut;