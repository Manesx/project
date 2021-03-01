import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import React from "react";

export const TaskLogs = props => {

    const reformatLogs = logs => {
        return logs != null ? logs.map((item, index) => {
            return {...item, id: index + 1, time: new Date(item.time * 1000).toLocaleString()}
        }) : [];
    };

    return <BootstrapTable data={reformatLogs(props.logs)}>
        <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='time'>Время</TableHeaderColumn>
        <TableHeaderColumn dataField='text'>Действие</TableHeaderColumn>
    </BootstrapTable>;
};