import * as actionTypes from './actionTypes';
import axios from 'axios';


//this normally is only used for start and show a spinner to show the user something is happening 
const authStart = () => {
    return { 
        type: actionTypes.AUTH_START
    };
}
 
const authSuccess = ( token , userId ) => {
    return { 
        type: actionTypes.AUTH_SUCESS,
        idToken: token, 
        userId: userId
    };
}

const authFail = (error) => {
    return { 
        type: actionTypes.AUTH_FAIL,
        error: error    
    };
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBSzC2GD3NGTfi0S-dvOwo1xebMKyF95g8';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBSzC2GD3NGTfi0S-dvOwo1xebMKyF95g8';
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                console.log(err.response)
                dispatch(authFail(err.response.data.error.message));
            });
    };
};
