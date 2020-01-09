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


function* workerGetUsers() {
    try {
        const uri = 'https://api.jsonbin.io/b/5e144f8c8d761771cc8c92ce/latest';
        const result = yield call(Axios.get, uri);
        console.log(result);
        result['data'].map((item: IUser) => {
            return item['formattedDate'] = format(new Date(item['dob']), 'dd/MM/yyyy')
        });
        console.log(result.data);
        yield put({ type: actionTypes.MERGE_USERLIST, value: result.data });
    }
    catch{
        console.log('Failed');
    }
}


function* workerPostUser(action: IPostAction) {
    console.log('Adding a user');
    try {
        // const uri = 'https://jsonplaceholder.typicode.com/users';
        // const result = yield call(Axios.post, uri, action.payload);
        console.log(action.payload);
        action.payload['formattedDate'] = format(action.payload['dob'], 'dd/MM/yyyyy');
        action.payload['id'] = Math.floor(Math.random() * 10000);
        yield put({ type: actionTypes.ADD_USERLIST, value: action.payload });
    }
    catch {
        console.log('Failed');
    }
}
function* workerDeleteUser(action: IPostAction) {
    console.log('Delete a user');
    try {
        // const uri = 'https://jsonplaceholder.typicode.com/users';
        // const result = yield call(Axios.delete, uri, action.payload.id);
        console.log(action.payload);
        yield put({ type: actionTypes.REMOVE_USERLIST, value: action.payload.id });
    }
    catch {
        console.log('Failed');
    }
}

function* workerPutUser(action: IPostAction) {
    console.log('Adding a user');
    try {
        // const uri = 'https://jsonplaceholder.typicode.com/users';
        // const result = yield call(Axios.put, uri, action.payload);
        console.log(action.payload);
        action.payload['formattedDate'] = format(action.payload['dob'], 'dd/MM/yyyyy');
        yield put({ type: actionTypes.UPDATE_USERLIST, value: action.payload });
    }
    catch {
        console.log('Failed');
    }
}
