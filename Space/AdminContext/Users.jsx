import React, {Component} from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {connect} from "react-redux";
import {loadUsers, setUsers} from "./Store/actions";
import {Danger} from "../../Components/Alert/Store/actions";
import {Loading} from "../../Loading";
import {handlerData} from "../../utils";

class Users extends Component {

    componentDidMount() {
        this.props.chooseUser(null);
        this.props.dispatch(loadUsers(null, 0, 10, data => handlerData(data, setUsers)));
    }

    render() {
        if (this.props.users == null) {
            return Loading();
        }
        if (this.props.users.length === 0) {
            return <h3>Нету пользователей</h3>;
        }
        return <BootstrapTable data={this.props.users} options={{
            onRowClick: user => this.props.chooseUser(user)
        }}>
            <TableHeaderColumn dataField='id' isKey={ true }>#</TableHeaderColumn>
            <TableHeaderColumn dataField='company_name'>Название компании</TableHeaderColumn>
            <TableHeaderColumn dataField='username'>Имя пользователя</TableHeaderColumn>
            <TableHeaderColumn dataField='tin'>ИНН</TableHeaderColumn>
            <TableHeaderColumn dataField='bin'>ОГРН</TableHeaderColumn>
        </BootstrapTable>;
    }
}

export const WrappedListUsers = connect(state => {return {users: state.updates.users}})(Users);


