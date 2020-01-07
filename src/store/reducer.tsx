import { IState } from "../interface/interface";

const initialState = {
    users: [{
        firstname: "Dell",
        lastname: "EMC",
        id: 5223323,
        email: "dell@hcl.com",
        DOB: "2019-04-28T14:45:15",
        gender: "male",
        isadmin: true,
        businessunit: "Administrator"
    }]
}

const reducer = (state: IState = initialState, action: any) => {
    if (action.type === 'LOAD_USERLIST') {
        return {
            ...state
        }
    }
    return state;
}

export default reducer;