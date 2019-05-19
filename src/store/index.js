import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import signupReducer from './signupReducer'
import loginReducer from './loginReducer'
import logoutReducer from './logoutReducer';
import displayNameReducer from './displayNameReducer';
import addMovieReducer from './addMovieReducer';

export function configureStore() {
    return createStore(
        combineReducers({
            auth: authReducer,
            signup: signupReducer,
            login: loginReducer,
            logout: logoutReducer,
            displayName: displayNameReducer,
            addMovie: addMovieReducer,
        }),
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

        )
    )
}
