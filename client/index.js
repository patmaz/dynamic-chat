import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import mainReducer from './chat/redux/reducers.js';
import App from './chat/App.jsx';

const reducer = combineReducers({
    mainState: mainReducer
});

const store = createStore(reducer);

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
        <Component/>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);