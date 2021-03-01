import {Danger, Warning} from "./Components/Alert/Store/actions";

export const amountFormat = value => {
    if (typeof value === 'number') {
        return value / 100 + '₽';
    }
    return '';
};

export const handlerData = (data, result, level=0, action_if_data_is_null=null, action_is_failed=null) => {
    if (data == null && action_if_data_is_null != null) {
        return action_if_data_is_null;
    }
    if (Array.isArray(data)) {
        return result(data);
    } else {
        const status = data.status;
        if (status != null) {
            delete data['status'];
            const message = data.message;
            if (status === 'success') {
                let res = result(data);
                if (res == null) {
                    res = action_if_data_is_null;
                }
                return res;
            } else if (message != null) {
                if (status === 'failed') {
                    return action_is_failed != null ? action_is_failed : Warning(message, level);
                } else if (status === 'error') {
                    return Danger(message, level);
                }
            }
        } else {
            let res = result(data);
            if (res == null) {
                res = action_if_data_is_null;
            }
            return res;
        }
    }
};

export class Time {

    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;

    constructor(seconds) {
        if (seconds >= 86400) {
            this.days = Math.trunc(seconds / 86400);
            seconds -= this.days * 86400;
        }
        if (seconds >= 3600) {
            this.hours = Math.trunc(seconds / 3600);
            seconds -= this.hours * 3600;
        }
        if (seconds >= 60) {
            this.minutes = Math.trunc(seconds / 60);
            seconds -= this.minutes * 60;
        }
        if (seconds > 0) {
            this.seconds = Math.trunc(seconds);
        }
    }
}

export const timeLeft = value => {
    if (typeof value === 'number') {
        const supplement = value => {
            if (value > 9) {
                return value;
            }
            return "0" + value;
        };
        const time = new Time(value);
        return supplement(time.hours) + " ч. " + supplement(time.minutes) + " м. " + supplement(time.seconds) + " с.";
    }
    return value;
};