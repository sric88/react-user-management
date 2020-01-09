import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducer';
import { getUserSaga, postUserSaga, deleteUserSaga, editUserSaga } from '../sagas/usersaga';

export const getStore = () => {
    const initialState = {};
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(getUserSaga);
    sagaMiddleware.run(postUserSaga);
    sagaMiddleware.run(deleteUserSaga);
    sagaMiddleware.run(editUserSaga);
    return store;
}