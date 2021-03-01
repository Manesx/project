import {CLEAR} from "../../actions";

export const SET_LOCAL_USER = "SET_LOCAL_USER";

export const initialState = {
    role: null,
    name: null,
    authorized: false,
    company_name: null,
    recovery: false
};

export const setUser = (data) => {
    return {
        type: SET_LOCAL_USER,
        data: data
    }
};

export const authReducer = (state = initialState, action) => {
    if (action.type === CLEAR) {
        return initialState;
    }
    if (action.type === SET_LOCAL_USER) {
        return {
            ...state,
            name: action.data != null ? action.data.username : null,
            role: action.data != null ? action.data.role : null,
            authorized: action.data != null ? action.data.authorized : null,
            company_name: action.data != null ? action.data.company_name : null,
            recovery: action.data != null ? action.data.recovery : null
        }
    }
    return state;
};