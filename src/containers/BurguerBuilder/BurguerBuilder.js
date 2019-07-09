import React from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';


class BurgerBuilder extends React.Component {

    state = {
        purchasing: false,
        loadingOrder: false,
        error: false, 
    }

    
    componentDidMount () { 
        console.log(this.props);
       /*  axios.get('https://react-my-burger-c9843.firebaseio.com/ingredients.json')
            .then (resp => {
                this.setState({ingredients: resp.data})
            })
            .catch(error => {
                this.setState({error: true })
            })   */
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
        this.setState({
            purchasing: !purchasing
        })
    }

   
    //This is such a bit advantage not needing this to happen anymore
    purchaseContinueHandler = () => {        
        this.props.history.push('/checkout'); 
    }



    render() {

        const { purchasable, purchasing } = this.state;
        const { ings , onIngredientAdded , onIngredientRemoved , tPrice } = this.props;

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
            if (this.state.loadingOrder) {
                oderSummary = <Spinner />
            }


        /* Will only show modal if I need. No animation */
        let modal = null;
        if (purchasing) {
            modal = (
                <Modal disableModel={this.purchaseHandler} >
                   {oderSummary}
                </Modal>)
        }

        let burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner/>; 
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
        ings: state.ingredients,
        tPrice: state.totalPrice,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch ({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch ({type: actionTypes.DEL_INGREDIENT, ingredientName: ingName })
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder , axios));