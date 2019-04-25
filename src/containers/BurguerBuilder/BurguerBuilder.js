import React from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends React.Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false
    }

    updadtePurchasable = (ingredients) => {
       
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey]
            })
            .reduce ((sum , el) => {
                return sum + el
            }, 0 )
        
        this.setState({purchasable: sum > 0})

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

    render() {
        
        const { ingredients , totalPrice , purchasable } = this.state;
        
        /* passa informacao para quando temos que disabled os botoes. em primeiro lugar copia e depois altera e passar essa informacao */
        const disableInfo = {
            ...ingredients
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        
        return (
            <Aux>
                <Modal> 
                    <OrderSummary ingredients={ingredients}/>
                </Modal>
                <Burger ingredients={ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    deleteIngredient={this.removeIngridientHandler} 
                    disabled={disableInfo}
                    price={totalPrice}
                    purchasable={!purchasable}
                    upadtePurchasable={this.upadtePurchasable}
                    />
            </Aux>
        );
    }
}

export default BurgerBuilder;