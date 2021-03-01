import {call, put, takeEvery} from "@redux-saga/core/effects";

export const LOAD = "LOAD";

function* load (action) {
    try {
        const resp = yield call(() => {
            return fetch("http://localhost/" + action.path, {
                method: action.method,
                body: action.body
            });
        });
        if (resp.status === 200 || resp.status === 400 || resp.status === 401) {
            const data = yield resp.json();
            yield put(action.handler(data));
        }
    } catch (e) {
    }
}

export function* watchLoad() {
    yield takeEvery(LOAD, load);
}