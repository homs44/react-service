
import firebase from 'firebase'


const UPDATE_USER = 'UPDATE_USER'
const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        payload: user,
    }
}

export const auth = () => {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                const newUser = {
                    displayName: user.displayName,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL,
                    isAnonymous: user.isAnonymous,
                    uid: user.uid,
                    providerData: user.providerData
                }
                dispatch(updateUser(newUser));
            } else {
                dispatch(updateUser(null));
            }
        });
    }
}

const initialState = {
    user: null,
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return Object.assign({}, state, {
                user: action.payload
            })
        default:
            return state;
    }
}