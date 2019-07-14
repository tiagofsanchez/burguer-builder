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
            console.log('[RE PURCHASE_BURGER_SUCESS]')
            return {
                ...state, 
                loading: false,
                orders: state.orders.concat(newOrder), 
                purchased: true,
            };

        case actionTypes.PURCHASE_BURGER_FAIL: 
            console.log('[RE PURCHASE_BURGER_SUCESS]')
            return {
                ...state, 
                loading: false,
            };

        case actionTypes.DOWLOAD_ORDERS_INIT: 
            
            return { 
                ...state, 
                loading: true,
            };    
        case actionTypes.DOWLOAD_ORDERS_FAIL: 
            console.log('RE[ORDERS_FAIL]')
            return { 
                ...state, 
                loading: false,
            }; 
        case actionTypes.DOWLOAD_ORDERS_SUCESS:
            console.log('RE[ORDERS_SUCCESS]')
            return { 
                ...state, 
                loading: false, 
                orders: action.orders,
            }
            
        default: 
            return {};
    }
}

export default order;