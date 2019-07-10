import * as actionTypes from './actionTypes'; 
import axios from '../../axios-orders';

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

//Getting the ingredients from our database (FIREBASE)//
//despite the fact that I have 2 actionTypes I will only have 1 actionCreator that will get dispatched...and that will be the ASYNC one

const setIngredients = (ingredients) => { 
    return {
        type: actionTypes.SET_INGREDIENTS, 
        ingredients: ingredients,
    }
};

const fetchIngredientsFailed = () => { 
    return { 
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
};

export const iniIngridients = () => { 
    return dispatch => {
        axios.get('https://react-my-burger-c9843.firebaseio.com/ingredients.json')
            .then (resp => {
               dispatch(setIngredients(resp.data)) 
            })
            .catch(error => {
               dispatch(fetchIngredientsFailed())
            })  
    }
};