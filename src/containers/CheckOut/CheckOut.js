import React from 'react'; 

import CheckOutSummary from '../../components/Order/CheckOutSummary/ChecktOutSummary';
import { Route , Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Axios from 'axios';

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
        let summary = <Redirect to='/' />
        if (ings) { 
            summary = 
            <div>
                <CheckOutSummary 
                    ingredients={ings}
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler}/>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}/>
            </div>
        }

        return summary;
    }
}

const mapStateToProps = state => { 
    return {
        ings: state.burguerBuilder.ingredients,
    };
};

export default connect(mapStateToProps)(withErrorHandler(CheckOut, Axios));