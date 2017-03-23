import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { AppContainer } from 'react-hot-loader';
import reducer from './reducers';
import App from './containers/AppContainer';

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
    const NewApp = require('./components/App/App.jsx').default;
    render(NewApp)
  });
}