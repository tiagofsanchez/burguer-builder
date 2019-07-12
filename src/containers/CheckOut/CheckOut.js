import React from 'react'; 

import CheckOutSummary from '../../components/Order/CheckOutSummary/ChecktOutSummary';
import { Route , Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';


class CheckOut extends React.Component { 

    componentWillMount () {
        this.props.onPurchaseInit ()
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
        
        const { ings , purchased } = this.props;
        
        let summary = <Redirect to='/' />
        if (ings) { 
            const redirectAfter = purchased ? <Redirect to='/'/> : null;
            summary = 
            <div>
                {redirectAfter}
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
        purchased: state.order.purchased,
    };
};

const mapDispatchToProps = dispatch => { 
    return { 
        onPurchaseInit: () => dispatch (actionCreators.purchaseInit())
    }
}

export default connect(mapStateToProps , mapDispatchToProps )(CheckOut);