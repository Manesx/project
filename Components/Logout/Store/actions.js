import {apiLoad} from "../../../actions";

export const logout = handler => {
    return apiLoad("logout", handler);
};