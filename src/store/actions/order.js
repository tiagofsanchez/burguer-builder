import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

const purchaseBurguerSuccess = (id , orderData ) => {
    return { 
        type: actionTypes.PURCHASE_BURGER_SUCESS,
        orderId: id, 
        orderData: orderData
    };
};

const purchaseBurguerFail = (error) => {
    return { 
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurguerStarter = (orderData) => { 
    return dispatch => {
        axios.post('/orders.json', orderData)
        .then(response => {
            console.log(response.data)
            dispatch(purchaseBurguerSuccess(response.data, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurguerFail(error));
        })
    }

}





