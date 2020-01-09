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


function* workerGetUsers() {
    try {
        const uri = 'https://api.jsonbin.io/b/5e144f8c8d761771cc8c92ce/latest';
        const result = yield call(Axios.get, uri);
        result['data'].map((item: IUser) => {
            console.log(item);
            return item['formattedDate'] = format(new Date(item['dob']), 'dd/MM/yyyy')
        });
        console.log(result.date);
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
        yield put({ type: actionTypes.ADD_USERLIST, value: action.payload });
    }
    catch {
        console.log('Failed');
    }
}