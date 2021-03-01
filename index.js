import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {WrappedApp} from './App';
import React from "react";
import {watchLoad} from "./sagas";
import {updatesReducer} from "./Space/AdminContext/Store/reducer";
import {messageReducer} from "./Components/Alert/Store/reducer";
import {authReducer} from "./Auth/Store/reducer";
import {mainReducer} from "./reducer";
import {zakupkiReducer} from "./Space/UserContext/Bots/Zakupki/Store/reducers";
import {watchUpdates} from "./Space/UserContext/Bots/Zakupki/Store/saga";

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
    updates: updatesReducer,
    message: messageReducer,
    user: authReducer,
    main: mainReducer,
    zakupki: zakupkiReducer
});

const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchLoad);
sagaMiddleware.run(watchUpdates);

ReactDOM.render(<Provider store={store}><WrappedApp/></Provider>, document.getElementById('root'));