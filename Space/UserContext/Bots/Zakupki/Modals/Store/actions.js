import {setUpdate, zakupkiLoad} from "../../Store/actions";

export const createTask = (auction, min_cost, time_left, handler) => {
    return zakupkiLoad("tasks.add", handler, {
        auction: auction,
        min_cost: min_cost,
        time_left: time_left
    })
};

export const addTask = (task) => {
    return setUpdate(task);
};

export const SET_AUCTION_INFO = "SET_AUCTION_INFO";

export const setAuctionInfo = info => {
    return {
        type: SET_AUCTION_INFO,
        info: info
    }
};