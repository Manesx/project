import {loadData} from "../../../../../actions";
import {START_WAIT_UPDATES, STOP_WAIT_UPDATES} from "./saga";

export const zakupkiLoad = (path, handler, body=null, method=undefined) => {
    return loadData("bots/zakupki/" + path, handler, body, method);
};

export const loadTasks = (id, offset, count, handler) => {
    return zakupkiLoad("tasks", handler, {
        id: id,
        offset: offset,
        count: count
    })
};

export const loadAuctions = (id, offset, count, handler) => {
    return zakupkiLoad("auctions", handler, {
        id: id,
        offset: offset,
        count: count
    })
};

export const taskChange = (id, min_cost, time_left, handler) => {
    return zakupkiLoad("tasks.change", handler, {
        id: id,
        min_cost: min_cost,
        time_left: time_left
    })
};

export const startUpdatesSync = () => {
    return {
        type: START_WAIT_UPDATES
    }
};

export const stopUpdatesSync = () => {
    return {
        type: STOP_WAIT_UPDATES
    }
};

export const SET_DATA = "ZAKUPKI_SET_DATA";
export const SET_UPDATES = "ZAKUPKI_SET_UPDATES";

export const setData = (count, data) => {
    return {
        type: SET_DATA,
        count: count,
        data: data
    }
};

export const setUpdates = updates => {
    return {
        type: SET_UPDATES,
        updates: updates
    }
};

export const setUpdate = update => {
    return setUpdates([update])
};