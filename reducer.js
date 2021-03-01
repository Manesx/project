import {CLEAR} from "./actions";

export const CHANGE_CONTEXT = "CHANGE_CONTEXT";

const initialState = {
    context: null
};

export const mainReducer = (state = initialState, action) => {
    if (action.type === CLEAR) {
        return initialState;
    }
    if (action.type === CHANGE_CONTEXT) {
        return {
            context: action.context
        }
    }
    return state;
};