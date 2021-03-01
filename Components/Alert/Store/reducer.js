import {SET_ALERT} from "./actions";
import {CLEAR} from "../../../actions";

export const initialState = {
    text: null,
    variant: null,
    level: 0
};

export const messageReducer = (state = initialState, action) => {
    if (action.type === CLEAR) {
        return initialState;
    }
    if (action.type === SET_ALERT) {
        return {
            ...state,
            text: action.text,
            variant: action.variant,
            level: action.level === undefined ? state.level : action.level
        }
    }
    return state;
};