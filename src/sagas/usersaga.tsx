import { takeEvery, call, put } from 'redux-saga/effects';
import * as actionTypes from '../actions';
import Axios from 'axios';
import { IUser } from '../interface/interface';
import { format } from 'date-fns'

interface IPostAction {
    type: string;
    payload: IUser;
}

export const getUserSaga = function* () {
    yield takeEvery(actionTypes.GET_USERLIST, workerGetUsers);
}

export const postUserSaga = function* () {
    yield takeEvery(actionTypes.POST_USERLIST, workerPostUser);
}

export const deleteUserSaga = function* () {
    yield takeEvery(actionTypes.DELETE_USERLIST, workerDeleteUser);
}
export const editUserSaga = function* () {
    yield takeEvery(actionTypes.PUT_USERLIST, workerPutUser);
}

const uri = 'http://lp-5cd911d362/Dell%20Demo/api/usermanagement/User';

function* workerGetUsers() {
    try {
        const result = yield call(Axios.get, uri);
        console.log(result);
        result.data = result.data === null ? [] : result.data;
        result['data'].map((item: IUser) => {
            return item['formattedDate'] = format(new Date(item['DOB']), 'dd/MM/yyyy')
        });
        yield put({ type: actionTypes.MERGE_USERLIST, value: result.data });
    }
    catch{
        console.log('Get data failed');
    }
}


function* workerPostUser(action: IPostAction) {
    try {
        const result = yield call(Axios.post, uri, action.payload);
        action.payload['formattedDate'] = format(action.payload['DOB'], 'dd/MM/yyyyy');
        action.payload['id'] = result.data;
        yield put({ type: actionTypes.ADD_USERLIST, value: action.payload });
    }
    catch {
        console.log('Post data failed');
    }
}
function* workerDeleteUser(action: IPostAction) {
    const deleteUri = `http://lp-5cd911d362/Dell%20Demo/api/usermanagement/User/${action.payload.id}`;
    try {
        yield call(Axios.delete, deleteUri);
        yield put({ type: actionTypes.REMOVE_USERLIST, value: action.payload.id });
    }
    catch {
        console.log('Failed');
    }
}

function* workerPutUser(action: IPostAction) {
    try {
        yield call(Axios.put, uri, action.payload);
        action.payload['formattedDate'] = format(new Date(action.payload['DOB']), 'dd/MM/yyyy');
        yield put({ type: actionTypes.UPDATE_USERLIST, value: action.payload });
    }
    catch {
        console.log('Failed');
    }
}
