import * as actionTypes from '../actions';
import { IUser } from '../interface/interface';

const reducer = (state: Array<IUser> = [], action: any) => {
    switch (action.type) {
        case actionTypes.MERGE_USERLIST:
            console.log(...action.value);
            return [...state, ...action.value];
        case actionTypes.ADD_USERLIST: return [action.value, ...state];
        case actionTypes.REMOVE_USERLIST: return state.filter(el => el.id !== action.value);
        case actionTypes.UPDATE_USERLIST:
            const index = state.findIndex(el => el.id === action.value.id);
            console.log(index);
            return Object.assign([], state, { [index]: action.value });
        default: return state;
    }
}

export default reducer;