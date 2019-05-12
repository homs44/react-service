import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import signupReducer from './signupReducer'
import loginReducer from './loginReducer'

export function configureStore() {
    return createStore(
        combineReducers({
            auth: authReducer,
            signup: signupReducer,
            login: loginReducer
        }),
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            
        )
    )
}
