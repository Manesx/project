import {zakupkiLoad} from "../../Store/actions";


export const stopTask = (id, handler) => {
    return zakupkiLoad("tasks.stop", handler, {
        id: id
    })
};

export const startTask = (id, handler) => {
    return zakupkiLoad("tasks.start", handler, {
        id: id
    })
};

export const removeTask = (id, handler) => {
    return zakupkiLoad("tasks.remove", handler, {
        id: id
    })
};

export const REMOVE_TASK_BY_ID = "REMOVE_TASK_BY_ID";

export const deleteTask = (id) => {
    return {
        type: REMOVE_TASK_BY_ID,
        id: id
    }
};

export const zakupkiLogin = (login, password, handler) => {
    return zakupkiLoad("login", handler, {
        username: login,
        password: password
    }, "POST");
};

export const zakupkiLogout = (handler) => {
    return zakupkiLoad("logout", handler);
};

export const zakupkiCheck = (handler) => {
    return zakupkiLoad("check", handler);
};

export const ZAKUPKI_SET_COMPANY_NAME = "ZAKUPKI_SET_COMPANY_NAME";

export const setUser = company_name => {
    return {
        type: ZAKUPKI_SET_COMPANY_NAME,
        company_name: company_name
    }
};