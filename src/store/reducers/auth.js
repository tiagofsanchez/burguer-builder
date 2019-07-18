import * as actionTypes from '../actions/actionTypes';


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.AUTH_SUCESS:
            return {
                ...state, 
                error:null, 
                loading: false, 
                token: action.idToken,
                userId: action.userId,
            }
        case actionTypes.AUTH_FAIL: 
            console.log(action.error)
            return { 
                ...state, 
                loading:false,
                error: action.error
            }
        
        default:
            return state;
    }
}

export default reducer;