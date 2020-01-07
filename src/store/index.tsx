import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { getUserSaga } from '../sagas';
import rootReducer from '../reducer';

export const getStore = () => {
    const initialState = {};
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(getUserSaga);
    return store;
}