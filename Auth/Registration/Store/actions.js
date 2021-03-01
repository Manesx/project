import {apiLoad} from "../../../actions";
import * as md5 from "md5";

export const beginRegistration = (username, email, tin, bin, password, handler) => {
    return apiLoad("registration", handler, {
        username: username,
        email: email,
        tin: tin,
        bin: bin,
        pass_hash: md5(password)
    }, "POST");
};