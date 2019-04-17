import React from 'react'; 
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends React.Component {
    
    state = {
        ingredients: {
            salad: 0,
            bacon: 0, 
            cheese: 0, 
            meat: 0,
        }
    }
    
    addIngredientHandler = (type) => {
        
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1; 
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        this.setState({
            ingredients: updatedIngredients, 
        })
    }
    
    removeIngridientHandler = (type) => {

    }

    render() {
        const { ingredients } = this.state; 
        return (
            <Aux>
                <Burger ingredients={ingredients}/>
                <BuildControls addIngredient={this.addIngredientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;