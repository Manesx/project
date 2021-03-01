import Alert from "react-bootstrap/Alert";
import React, {Component} from "react";
import {connect} from "react-redux";
import {ZakupkiLogin} from "../ZakupkiLogin";
import {setUser, zakupkiCheck, zakupkiLogin, zakupkiLogout} from "./Store/actions";
import {Warning} from "../../../../../Components/Alert/Store/actions";
import {BoxArrowInLeft, BoxArrowRight} from "react-bootstrap-icons";
import {handlerData} from "../../../../../utils";

class AuthStatus extends Component {

    state = {
        loginIsOpen: false
    };

    constructor(props) {
        super(props);
        this.showLogin = this.showLogin.bind(this);
        this.closeLogin = this.closeLogin.bind(this);
        this.profileAbout = this.profileAbout.bind(this);
    }

    showLogin() {
        this.setState({loginIsOpen: !this.state.loginIsOpen});
    }

    closeLogin() {
        this.setState({loginIsOpen: false});
    }

    componentDidMount() {
        this.props.dispatch(zakupkiCheck(data => {
            if (data.authorized) {
                return setUser(data.company_name);
            }
            return Warning("Необходимо авторизоваться на сайте закупок", 1);
        }));
    }

    profileAbout() {
        if (this.props.user.name != null) {
            return <div className={"d_flex w-100"}>
                <p>{this.props.user.name}</p>
                <button type={"button"} className={"ml-auto"}
                        onClick={() => this.props.dispatch(zakupkiLogout(data => handlerData(data, () => setUser(null), 0)))}><BoxArrowRight/></button>
            </div>;
        }
        return <div className={"d_flex w-100"}>
            <p className={"d_hide"}>Необходима авторизация на портале поставщиков</p>
            <button className={"ml-auto"} onClick={this.showLogin}><BoxArrowInLeft/></button>
        </div>
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextState.loginIsOpen){
            if (nextProps.user.name != null) {
                this.setState({loginIsOpen: false});
            }
        }
        return true;
    }

    render() {
        return <div className={"no_sel"}>
            {this.state.loginIsOpen ?
                <ZakupkiLogin close={this.closeLogin} show={this.state.loginIsOpen} login={(login, password) => {
                    this.props.dispatch(zakupkiLogin(login, password, data => handlerData(data, d => setUser(d.company_name), 1)))
                }}/> : ''}
            <Alert className={"d_flex"} variant={this.props.user.name != null ? "success" : "secondary"}>
                {this.profileAbout()}
            </Alert>
        </div>;
    }
}

export const ZakupkiAuthStatus = connect(state => {
    return {
        user: state.zakupki.user
    }
})(AuthStatus);