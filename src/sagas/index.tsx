import { takeEvery, call, put } from 'redux-saga/effects';
import * as actionTypes from '../actions';
import Axios from 'axios';

export function* getUserSaga() {
    yield takeEvery(actionTypes.GET_USERLIST, workerGetUsers);
}


function* workerGetUsers() {
    console.log('get users')
    try {
        const uri = 'https://api.jsonbin.io/b/5e144f8c8d761771cc8c92ce/latest';
        const result = yield call(Axios.get, uri);
        console.log(result);
        yield put({ type: actionTypes.SET_USERLIST, value: result.data });
    }
    catch {
        console.log('Failed');
    }
} 