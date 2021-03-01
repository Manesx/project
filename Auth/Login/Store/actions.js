import * as md5 from "md5";
import {apiLoad} from "../../../actions";

export const loginAuthorization = (tin, bin, password, handler) => {
    return apiLoad("login", handler, {
        tin: tin,
        bin: bin,
        pass_hash: md5(password)
    }, "POST");
};