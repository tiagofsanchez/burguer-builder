import React from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';




const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends React.Component {

    state = {
        purchasable: false,
        purchasing: false,
        loadingOrder: false,
        error: false, 
    }

    componentDidMount () { 
        console.log(this.props)
        axios.get('https://react-my-burger-c9843.firebaseio.com/ingredients.json')
            .then (resp => {
                this.setState({ingredients: resp.data})
            })
            .catch(error => {
                this.setState({error: true })
            })  
    }

    updadtePurchasable = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)

        this.setState({ purchasable: sum > 0 })

    }

    addIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = priceAddition + this.state.totalPrice
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        })

        this.updadtePurchasable(updatedIngredients);

    }

    removeIngridientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        /* Making sure that I don't put negative ingredients */
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceSubtraction = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceSubtraction
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })

        this.updadtePurchasable(updatedIngredients);
    }

    purchaseHandler = () => {
        const { purchasing } = this.state;
        this.setState({
            purchasing: !purchasing
        })
    }

    purchaseContinueHandler = () => {
        //alert('you are about to continue!');
        //On a reall app we should recalculate the price on the server as this will be safer and the user couldn't manipulate the price
        

        // not yet storing in Firebase... sending that information on to the CheckOut page before so I have comment that out 
        //This is now in ContactData component
        
        
        // Ineed to do the for here, because I will need to go through and object instead of an array        
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')         
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        }); 
        console.log(queryParams);
        console.log(queryString);
        console.log(this.props);
    }



    render() {

        const { ingredients, totalPrice, purchasable, purchasing } = this.state;

        /* passa informacao para quando temos que disabled os botoes. em primeiro lugar copia e depois altera e passar essa informacao */
        const disableInfo = {
            ...ingredients
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        //Showing the spinner if we need it
        let oderSummary = <OrderSummary
            ingredients={ingredients}
            disableModel={this.purchaseHandler}
            continuePurchase={this.purchaseContinueHandler}
            price={totalPrice} />
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
        if (ingredients) {
            burger = 
            <Aux>
            <Burger ingredients={ingredients} />
            <BuildControls
                addIngredient={this.addIngredientHandler}
                deleteIngredient={this.removeIngridientHandler}
                disabled={disableInfo}
                price={totalPrice}
                purchasable={!purchasable}
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

export default withErrorHandler(BurgerBuilder , axios);