import * as actionTypes from '../actions/actionTypes';

const initialState = { 
    ingredients: {
        bacon: 0, 
        cheese: 0, 
        meat: 0, 
        salad: 0,
    },
    totalPrice: 4,
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

//Existem duas formas de alterar o nosso estado...ou eu crio mais uma action ou eu faco altero o preco directamente nas actions anteriores
const reducer = (state = initialState , action ) => { 
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: 
        return { 
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            }, 
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],  
        }
        case actionTypes.DEL_INGREDIENT: 
        return { 
            ...state, 
            ingredients: { 
                ...state.ingredients, 
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        }
        default: 
        return state;
    }
    
};

export default reducer;