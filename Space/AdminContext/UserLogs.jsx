import {loadLogs, setLogs} from "./Store/actions";
import {connect} from "react-redux";
import React, {Component} from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {Danger} from "../../Components/Alert/Store/actions";

class UserLogs extends Component {

    componentDidMount() {
        this.props.dispatch(loadLogs(this.props.user_id, 0, 40, data => {
            if (data != null) {
                return setLogs(data.logs);
            }
            return Danger("Не удалось загрузить логи пользователя");
        }))
    }

    render() {
        const reformat = logs => {
            return logs != null ? logs.map((item, index) => {
                return {
                    ...item,
                    id: index + 1,
                    time: new Date(item.time * 1000).toLocaleString()
                }
            }) : []
        };
        return <BootstrapTable data={reformat(this.props.logs)}>
            <TableHeaderColumn dataField='id' isKey={ true }>#</TableHeaderColumn>
            <TableHeaderColumn dataField='time'>Время</TableHeaderColumn>
            <TableHeaderColumn dataField='description'>Действие пользователя</TableHeaderColumn>
        </BootstrapTable>;
    }
}

export const WrappedUserLogs = connect(state => {
    return {
        logs: state.updates.logs
    }})(UserLogs);