import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { AppContainer } from 'react-hot-loader';
import mainReducer from './chat/redux/reducers.js';
import App from './chat/App.jsx';

const reducer = combineReducers({
    mainState: mainReducer
});

const logger = createLogger();
const store = createStore(reducer, applyMiddleware(logger));

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
        <AppContainer>
            <Component/>
        </AppContainer>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./chat/App.jsx', () => {
    const NewApp = require('./chat/App.jsx').default;
    render(NewApp)
  });
}