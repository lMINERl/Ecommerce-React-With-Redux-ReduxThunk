import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import productReducer from './store/reducer';


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const myStore = createStore(productReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={myStore}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
