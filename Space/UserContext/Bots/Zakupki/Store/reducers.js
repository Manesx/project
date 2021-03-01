import {SET_AUCTION_INFO} from "../Modals/Store/actions";
import {SET_DATA, SET_UPDATES} from "./actions";
import {REMOVE_TASK_BY_ID, ZAKUPKI_SET_COMPANY_NAME} from "../Components/Store/actions";
import {CLEAR} from "../../../../../actions";

const initialState = {
    info: null,
    updates: {
        count: null,
        data: null
    },
    user: {
        name: null
    }
};

export const zakupkiReducer = (state = initialState, action) => {
    if (action.type === CLEAR) {
        return initialState;
    } else if (action.type === SET_AUCTION_INFO) {
        return {
            ...state,
            info: action.info
        }
    } else if (action.type === SET_DATA) {

        return {
            ...state,
            updates: {
                count: action.count,
                data: action.data,
            }
        }
    } else if (action.type === SET_UPDATES) {
        return {
            ...state,
            updates: {
                ...state.updates,
                data: state.updates.data != null ? state.updates.data.map(auction => {
                    if (action.updates != null) {
                        action.updates.forEach(update => {
                            if (update.id != null && update.id === auction.id) {
                                if (update.message != null) {
                                    if (auction.logs == null) {
                                        auction['logs'] = [];
                                    }
                                    auction['logs'].unshift({time: update.time, text: update.message});
                                    if (auction.logs.length > 100) {
                                        auction.logs.pop();
                                    }
                                    delete update['message'];
                                    delete update['time'];
                                }
                                auction = Object.assign({}, auction, update);
                            }
                        });
                    }
                    return auction;
                }) : null
            }
        }
    } else if (action.type === ZAKUPKI_SET_COMPANY_NAME) {
        return {
            ...state,
            user: {
                name: action.company_name
            }
        }
    } else if (action.type === REMOVE_TASK_BY_ID) {
        return {
            ...state,
            updates: {
                ...state.updates,
                data: Array.isArray(state.updates.data) ? state.updates.data.map(item => {
                    if (item.id === action.id) {
                        if (item.id != null) {
                            delete item['id']
                        }
                        if (item.last_change != null) {
                            delete item['last_change']
                        }
                        if (item.is_locked != null) {
                            delete item['is_locked']
                        }
                        if (item.time_left != null) {
                            delete item['time_left']
                        }
                        if (item.min_cost != null) {
                            delete item['min_cost']
                        }
                        if (item.is_running != null) {
                            delete item['is_running']
                        }
                        if (item.logs != null) {
                            delete item['logs']
                        }
                    }
                    return item;
                }) : state.updates.data
            }
        }
    }
    return state;
};