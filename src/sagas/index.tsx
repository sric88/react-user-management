import { getUserSaga, postUserSaga } from './usersaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        getUserSaga, // saga1 can also yield [ fork(actionOne), fork(actionTwo) ]
        postUserSaga
    ]);
}