import * as actionTypes from '../actions';
import { IUser } from '../interface/interface';

const reducer = (state: Array<IUser> = [], action: any) => {
    switch (action.type) {
        case actionTypes.MERGE_USERLIST: return [...state, ...action.value];
        case actionTypes.ADD_USERLIST: return [action.value, ...state];
        default: return state;
    }
}

export default reducer;