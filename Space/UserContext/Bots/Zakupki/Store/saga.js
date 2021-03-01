import {call, cancel, delay, fork, put, take} from "@redux-saga/core/effects";
import {setUpdates} from "./actions";

export const START_WAIT_UPDATES = "START_WAIT_UPDATES";
export const STOP_WAIT_UPDATES = "STOP_WAIT_UPDATES";

export function* updates() {
    while (true) {
        try {
            const resp = yield call(() => {
                return fetch("http://localhost/bots/zakupki/tasks.updates");
            });
            if (resp.status === 200) {
                const data = yield resp.json();
                if (data != null && data.length > 0) {
                    yield put(setUpdates(data));
                } else {
                    yield delay(5000);
                }
            } else {
                yield delay(8000);
            }
        } catch (e) {}
        yield delay(1000);
    }

}

export function* watchUpdates() {
    while (yield take(START_WAIT_UPDATES)) {
        const bg = yield fork(updates);
        yield take(STOP_WAIT_UPDATES);
        yield cancel(bg);
    }
}