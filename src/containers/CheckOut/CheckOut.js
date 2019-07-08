import React from 'react'; 

import CheckOutSummary from '../../components/Order/CheckOutSummary/ChecktOutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';

class CheckOut extends React.Component { 

    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    } 

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    //Route can use component as a property of render={()=>()} with the arrouw function to render a certain component.
    //here this will be super important for 
    render () { 
        
        const { ings } = this.props;
        
        return (
            <div>
                <CheckOutSummary 
                    ingredients={ings}
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler}/>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps = state => { 
    return {
        ings: state.ingredients,
    };
};

export default connect(mapStateToProps)(CheckOut);