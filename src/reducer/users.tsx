// import { IState } from "../interface/interface";
import * as actionTypes from '../actions';
import { IUserList } from '../interface/interface';

const reducer = (state: Array<IUserList> = [], action: any) => {
    switch (action.type) {
        case actionTypes.SET_USERLIST:
            return [...action.value];
        default: return state;
    }
}

export default reducer;