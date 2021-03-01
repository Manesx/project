import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginManager from "./Auth/LoginManager";
import {Loading} from "./Loading";
import {changeContext, check} from "./actions";
import {UserContext} from "./Space/UserContext/UserContext";
import {setUser} from "./Auth/Store/reducer";
import {AdminContext} from "./Space/AdminContext/AdminContext";
import {MessageModal} from "./Modals/MessageModal";
import {handlerData} from "./utils";
import {WrappedPasswordRecovery} from "./Modals/PasswordRecovery";
const CONN_ERROR = "CONN_ERROR";
const LOGIN = "LOGIN";

export class App extends Component {

    constructor(props) {
        super(props);
        this.selectedContext = this.selectedContext.bind(this);
    }

    selectedContext() {
        if (this.props.context === LOGIN) {
            return <LoginManager dispatch={this.props.dispatch}/>;
        } else if (this.props.context === CONN_ERROR) {
            return <MessageModal title={"Ошибка соединения с сервером"} body={"Проверьте соединение с интернет"}/>;
        }
        return <Loading/>;
    }

    render () {
        const dispatch = this.props.dispatch;
        const user = this.props.user;
        if (user.authorized) {
            if (user.recovery) {
                return <WrappedPasswordRecovery/>;
            } else if (user.role === 'admin') {
                return <AdminContext/>;
            } else if (user.role === 'user') {
                return <UserContext/>;
            }
        } else if (this.props.context !== CONN_ERROR) {
            dispatch(check(data => handlerData(data, d => {
                if (d.authorized) {
                    return setUser(d);
                }
            }, 0, changeContext(CONN_ERROR), changeContext(LOGIN))));
        }
        return this.selectedContext();
    }

}

export const WrappedApp = connect(state => {
    return {
        user: state.user,
        context: state.main.context
    }
})(App);

