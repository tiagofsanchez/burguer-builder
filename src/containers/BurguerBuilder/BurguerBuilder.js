import React from 'react';

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';


class BurgerBuilder extends React.Component {

    state = {
        purchasing: false,
    }

    componentDidMount () { 
        console.log(this.props);
        this.props.onInitIngredients();
        console.log(this.props.ings)
        //testing my assync code to see if this is working...and it is seems that it is
        //this.props.onTestingOrders();
        //console.log(this.props.orders)
    }
    
    updadtePurchasable = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)

        return sum>0;

    }
    
    purchaseHandler = () => {
        const { purchasing } = this.state;
        const { isAuth } = this.props;

        if ( isAuth ) {
        this.setState({
            purchasing: !purchasing
        })} 
        else { 
            this.props.history.push('/auth'); 
        }
    }

   
    //This is such a bit advantage not needing this to happen anymore
    purchaseContinueHandler = () => {        
        this.props.history.push('/checkout'); 
    }



    render() {

        const { purchasing } = this.state;
        const { ings , onIngredientAdded , onIngredientRemoved , tPrice , err , isAuth } = this.props;

        /* passa informacao para quando temos que disabled os botoes. em primeiro lugar copia e depois altera e passar essa informacao */
        const disableInfo = {
            ...ings
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        //Showing the spinner if we need it
        let oderSummary = <OrderSummary
            ingredients={ings}
            disableModel={this.purchaseHandler}
            continuePurchase={this.purchaseContinueHandler}
            price={tPrice} />
           


        /* Will only show modal if I need. No animation */
        let modal = null;
        if (purchasing) {
            modal = (
                <Modal disableModel={this.purchaseHandler} >
                   {oderSummary}
                </Modal>)
        }

        let burger = err ? <p>ingredients can't be loaded</p> : <Spinner/>; 
        if (ings) {
            burger = 
            <Aux>
            <Burger ingredients={ings} />
            <BuildControls
                addIngredient={onIngredientAdded}
                deleteIngredient={onIngredientRemoved}
                disabled={disableInfo}
                price={tPrice}
                purchasable={!this.updadtePurchasable(ings)}
                enableModal={this.purchaseHandler}
                isAuth={isAuth}
            />
            </Aux>
        }

        return (
            <Aux>
                {modal}
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => { 
    return { 
        ings: state.burguerBuilder.ingredients,
        tPrice: state.burguerBuilder.totalPrice,
        err: state.burguerBuilder.error,
        isAuth: state.auth.token !== null,
        //try to understand if this assync works up on DidMount
        orders: state.order.orders,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch (actionCreators.addIngredients(ingName)),
        onIngredientRemoved: (ingName) => dispatch (actionCreators.delIngredients(ingName)),
        onInitIngredients: () => dispatch (actionCreators.iniIngridients()),
        onTestingOrders: () => dispatch (actionCreators.downloadOrders())

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder , axios));