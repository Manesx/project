import {apiLoad} from "../../actions";
import * as md5 from "md5";

export const changePassword = (password, handler) => {
    return apiLoad("recovery", handler, {
        pass_hash: md5(password)
    }, "POST");
};

export const beginRecoveryPassword = (email, handler) => {
    return apiLoad("recovery", handler, {
        email: email
    });
};