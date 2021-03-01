import {SET_LOGS, SET_TASK_UPDATES, SET_TASKS, SET_USERS} from "./actions";

export const initialState = {
      tasks: null,
      logs: null,
      users: null
};

export const updatesReducer = (state = initialState, action) => {
      if (action.type === SET_USERS) {
            return {
                  ...state,
                  users: action.users
            }
      } else if (action.type === SET_TASKS) {
            return {
                  ...state,
                  tasks: action.tasks
            }
      } else if (action.type === SET_LOGS) {
            return {
                  ...state,
                  logs: action.logs
            }
      } else if (action.type === SET_TASK_UPDATES) {
            return {
                  ...state,
                  tasks: state.tasks.map(task => {
                        if (action.tasks != null) {
                              action.tasks.forEach(t => {
                                    if (task.id === t.id) {
                                          if (t.min_cost !== undefined) {
                                                task['min_cost'] = t.min_cost;
                                          } else if (t.time_left !== undefined) {
                                                task['time_left'] = t.time_left;
                                          } else if (t.last_change !== undefined) {
                                                task['last_change'] = t.last_change;
                                          } else if (t.is_running !== undefined) {
                                                task['is_running'] = t.is_running;
                                          } else if (t.locked !== undefined) {
                                                task['locked'] = t.locked;
                                          }
                                    }
                              });
                        }
                        return task;
                  })
            }
      }
      return state;
};