import * as actionTypes from './actions';

const initialState = { 
    ingredients: null,
    totalPrice: 4,
}

const reducer = (state = initialState , action ) => { 
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: 
        return { 
            state
        }
        case actionTypes.DEL_INGREDIENT: 
        return { 
            state
        }
    }
    return state
};

export default reducer;