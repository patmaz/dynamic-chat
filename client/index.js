import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { AppContainer } from 'react-hot-loader';
import reducer from './reducers/index';
import App from './containers/AppContainer.jsx';

if (process.env.NODE_ENV === 'development') {
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
        module.hot.accept('./containers/AppContainer.jsx', () => {
            const NewApp = require('./containers/AppContainer.jsx').default;
            render(NewApp)
        });
    }
} else {
    const store = createStore(reducer);

    ReactDOM.render(
        <Provider store={store}>
                <App/>
        </Provider>,
        document.getElementById('root')
    );
}