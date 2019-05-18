import firebase from 'firebase'

/**
 *  액션 라이브러리
 *  redux-actions
 * 
 *  비동기 작업 라이브러리
 *  redux-thunk *
 *  redux-promise *
 *  redux-saga ***
 *  redux-pender *
 */
const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILED = 'LOGIN_FAILED'
const LOGIN_VALIDATION_FAILED = 'LOGIN_VALIDATION_FAILED'

function loginRequest() {
    return {
        type: LOGIN_REQUEST
    }
}

function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}

function loginFailed(error) {
    return {
        type: LOGIN_FAILED,
        payload: error
    }
}

export function login(email, password) {
    return (dispatch) => {

        dispatch(loginRequest());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                dispatch(loginSuccess());
            })
            .catch((error) => {
                dispatch(loginFailed(error));
            });

    }
}


export function loginValidationFailed(error) {
    return {
        type: LOGIN_VALIDATION_FAILED,
        payload: error
    }
}

const initialState = {
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    error: null,
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
                error: null,
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
            })
        case LOGIN_FAILED:
            const error = action.payload
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error: error,
            })
        case LOGIN_VALIDATION_FAILED:
            return Object.assign({}, state, {
                error: action.payload,
            })
        default:
            return state;
    }
}