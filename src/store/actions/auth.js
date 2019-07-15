import * as actionTypes from './actionTypes';


//this normally is only used for start and show a spinner to show the user something is happening 
const authStart = () => {
    return { 
        type: actionTypes.AUTH_START
    };
}
 
const authSuccess = (authData) => {
    return { 
        type: actionTypes.AUTH_SUCESS,
        authData: authData    
    };
}

const authFail = (error) => {
    return { 
        type: actionTypes.AUTH_FAIL,
        error: error    
    };
}

export const auth = (email , password) => { 
    return dispatch => { 
        dispatch(authStart())
    }
}

