import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import rootReducer from './reducers/index'
import { createStore, applyMiddleware } from 'redux'
import { API_WS_ROOT } from './constants';
import { ActionCableProvider } from 'react-actioncable-provider';

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
    <ActionCableProvider url={API_WS_ROOT}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ActionCableProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
