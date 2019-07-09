import * as actionTypes from './actionTypes'; 

export const addIngredients = (name) => { 
    return { 
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name 
    }
}
export const delIngredients = (name) => { 
    return { 
        type: actionTypes.DEL_INGREDIENT,
        ingredientName: name 
    }
}