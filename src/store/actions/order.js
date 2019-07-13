import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';


// SAVING THE ORDERS INTO OUR BACKEND
export const purchaseBurguerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurguerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurguerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurguer = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurguerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurguerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurguerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

//DOWLOADING ORDERS FROM OUR BACKEND
const downloadOrdersInit = () => {
    return {
        type: actionTypes.DOWLOAD_ORDERS_INIT
    };
}

const downloadOrdersSuccess = (orders) => {
    return {
        type: actionTypes.DOWLOAD_ORDERS_SUCESS,
        orders: orders,
    };
}

const downloadOrdersFail = (error) => {
    return {
        type: actionTypes.DOWLOAD_ORDERS_FAIL,
        error: error
    };
}

export const downloadOrders = () => {
    return dispatch => {
        dispatch(downloadOrdersInit());
        axios.get('/orders.json')
            .then(response => {
                console.log('[ORDERS_SUCCESS]')
                const fetchData = [];
                for (let key in response.data) {
                    fetchData.push({
                        id: key,
                        ...response.data[key],
                    });
                }
                console.log(fetchData)
                dispatch(downloadOrdersSuccess(fetchData));
            })
            .catch(err => {
                console.log('[ORDERS_FAIL]')
                dispatch(downloadOrdersFail(err));
            });
    }
}

