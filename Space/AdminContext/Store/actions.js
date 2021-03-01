import {apiLoad} from "../../../actions";

export const SET_USERS = "SET_USERS";
export const SET_TASKS = "SET_TASKS";
export const SET_LOGS = "SET_LOGS";
export const SET_TASK_UPDATES = "SET_TASK_UPDATES";

export const setUsers = users => {
    return {
        type: SET_USERS,
        users: users
    }
};

export const setTaskUpdates = tasks => {
    return {
        type: SET_TASK_UPDATES,
        tasks: tasks
    }
};

export const setTaskUpdate = task => {
    return setTaskUpdates([task]);
};

export const setTasks = tasks => {
    return {
        type: SET_TASKS,
        tasks: tasks
    }
};

export const setLogs = logs => {
    return {
        type: SET_LOGS,
        logs: logs
    }
};

export const lockTask = (user_id, task_id, handler) => {
    return apiLoad("tasks.lock", handler, {
        user_id: user_id,
        id: task_id
    })
};

export const unlockTask = (user_id, task_id, handler) => {
    return apiLoad("tasks.unlock", handler, {
        user_id: user_id,
        id: task_id
    })
};



export const loadUsers = (user_id, offset, count, handler) => {
    return apiLoad("users", handler, {
        id: user_id,
        offset: offset,
        count: count
    })
};

export const loadTasks = (user_id, offset, count, handler) => {
    return apiLoad("users.tasks", handler, {
        id: user_id,
        offset: offset,
        count: count
    })
};

export const loadLogs = (user_id, offset, count, handler) => {
    return apiLoad("users.logs", handler, {
        id: user_id,
        offset: offset,
        count: count
    })
};
