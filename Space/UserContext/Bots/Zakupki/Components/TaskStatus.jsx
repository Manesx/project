import React from "react";

export const TaskStatus = props => {
    const data = props.data;
    if (data != null) {
        const status = data.is_running ? "Активно" : "Не запущен";
        const time = data.last_change != null ? new Date(data.last_change * 1000).toLocaleString() : '';
        return <div>
            Статус: {status} {time}
        </div>;
    }
    return '';
};