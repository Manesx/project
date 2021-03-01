import {LOAD} from "./sagas";
import {CHANGE_CONTEXT} from "./reducer";

export const check = (handler) => {
    return apiLoad("check", handler);
};
export const changeContext = ctx_name => {
    return {
        type: CHANGE_CONTEXT,
        context: ctx_name
    }
};

export const CLEAR = "CLEAR";

export const Clear = () => {
    return {
        type: CLEAR
    }
};

export const apiLoad = (path, handler, body=null, method=undefined) => {
    return loadData("api/" + path, handler, body, method);
};

export const loadData = (path, handler, body=null, method="GET") => {
    if (body != null) {
        for (let key in body) {
            if (body[key] === null) {
                delete body[key];
            }
        }
    }
    if (body != null) {
        if (method === "POST") {
            body = JSON.stringify(body);
        } else {
            let params = new URLSearchParams();
            for (let key in body) {
                params.append(key, body[key]);
            }
            path += "?" + params.toString();
            body = undefined;
        }
    }
    return {
        type: LOAD,
        method: method,
        body: body,
        path: path,
        handler: handler
    }
};