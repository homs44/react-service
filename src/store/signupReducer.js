import firebase from 'firebase'

const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_FAILED = 'SIGNUP_FAILED'

const SIGNUP_VALIDATION_FAILED = 'SIGNUP_VALIDATION_FAILED'

function signupRequest() {
    return {
        type: SIGNUP_REQUEST
    }
}

function signupSuccess() {
    return {
        type: SIGNUP_SUCCESS
    }
}

function signupFailed(error) {
    return {
        type: SIGNUP_FAILED,
        payload: error,
    }
}

export function signup(email, password) {
    return (dispatch) => {

        dispatch(signupRequest());

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                dispatch(signupSuccess());
            })
            .catch(function (error) {
                dispatch(signupFailed(error));
            });
    }
}

export function signupValidationFailed(error) {
    return {
        type: SIGNUP_VALIDATION_FAILED,
        payload: error
    }
}

const initialState = {
    isLoading: false,
    isSuccess: false,
    isFailed: false,
}

export default function signupReducer(state = initialState, action) {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
            })
        case SIGNUP_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
            })
        case SIGNUP_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error: action.payload
            })
        case SIGNUP_VALIDATION_FAILED:
            return Object.assign({}, state, {
                error: action.payload
            })
        default:
            return state;
    }
}