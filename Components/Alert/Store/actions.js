export const SET_ALERT = "SET_ALERT";

export const Warning = (message, level=0) => {
    return {
        type: SET_ALERT,
        variant: "warning",
        text: message,
        level: level
    }
};

export const Danger = (message, level=0) => {
    return {
        type: SET_ALERT,
        variant: "danger",
        text: message,
        level: level
    }
};

export const Success = (message, level=0) => {
    return {
        type: SET_ALERT,
        variant: "success",
        text: message,
        level: level
    }
};

export const Clear = () => {
    return {
        type: SET_ALERT,
        variant: null,
        text: null
    }
};