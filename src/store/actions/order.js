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

//tenho que utilizar os queryparams para fazer com que a informacao seja guardada para 1 determindao utilizador
export const purchaseBurguer = (orderData , token ) => {
    return dispatch => {
        dispatch(purchaseBurguerStart());
        axios.post('/orders.json?auth='+ token, orderData)
            .then(response => {
                console.log('[AC PURCHASE_BURGER_SUCESS]');
                dispatch(purchaseBurguerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                console.log('[AC PURCHASE_BURGER_FAIL]');
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
//orders will only be dispatched if the user is authenticated and as a token so that you coudl actually render the user orders
export const downloadOrders = (token , userId) => {
    return dispatch => {
        dispatch(downloadOrdersInit());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
         axios.get('/orders.json' + queryParams )
            .then(response => {
                console.log('AC[ORDERS_SUCCESS]')
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
                console.log('AC[ORDERS_FAIL]')
                dispatch(downloadOrdersFail(err));
            });
    }
}

