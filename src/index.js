import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import { configureStore } from './store/index'
import { Provider } from 'react-redux'
import { auth } from './store/authReducer'
import ReactGA from 'react-ga';

//GA 초기화
ReactGA.initialize('UA-141248886-1');

//Firebase 초기화
firebase.initializeApp({
    apiKey: "AIzaSyC8S96Ffg2lYV9MVcNgU5stPNbSGMA7yKE",
    authDomain: "react-board-99650.firebaseapp.com",
    databaseURL: "https://react-board-99650.firebaseio.com",
    projectId: "react-board-99650",
    storageBucket: "react-board-99650.appspot.com",
    messagingSenderId: "278937540144",
    appId: "1:278937540144:web:4f50878d35b14e78"
});

const store = configureStore();

store.dispatch(auth())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
