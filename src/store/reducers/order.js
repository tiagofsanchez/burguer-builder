import * as actionTypes from '../actions/actionTypes';

const initState = { 
    orders: [],
    loading: false,
    purchased: false,

}


const order = (state = initState , action ) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: 
            return { 
                ...state, 
                purchased: false
            }
        
        case actionTypes.PURCHASE_BURGER_START: 
            return{
                ...state, 
                loading: true,
            };
        
        case actionTypes.PURCHASE_BURGER_SUCESS: 
            const newOrder = {
                ...action.orderData, 
                id: action.orderId
            }
            return {
                ...state, 
                loading: false,
                orders: state.orders.concat(newOrder), 
                purchased: true,
            };

        case actionTypes.PURCHASE_BURGER_FAIL: 
            return {
                ...state, 
                loading: false,
        
            };
            
        default: 
            return {};
    }
}

export default order;