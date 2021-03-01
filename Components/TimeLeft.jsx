import {Time} from "../utils";


export const TimeLeft = value => {
    if (typeof value === 'number') {
        const time = new Time(value);
        return (time.hours > 0 ? time.hours + " час. " : "") + (time.minutes > 0 ? time.minutes + " мин. " : "") + (time.seconds > 0 ? time.seconds + " сек. " : "");
    }
};