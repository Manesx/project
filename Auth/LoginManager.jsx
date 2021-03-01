import React, {Component} from "react";
import {Login} from "./Login/Login";
import {Registration} from "./Registration/Registration";
import {WrappedCustomAlert} from "../Components/Alert/WrappedCustomAlert";
import {Recovery} from "./Recovery";

export const CTX_REGISTRATION = "CTX_REGISTRATION";
export const CTX_RECOVERY_PASSWORD = "CTX_RECOVERY_PASSWORD";

export default class LoginManager extends Component {

    state = {
        context: null
    };

    constructor(props) {
        super(props);
        this.selectedContext = this.selectedContext.bind(this);
        this.changeContext = this.changeContext.bind(this);
    }


    selectedContext() {
        if (this.state.context === CTX_REGISTRATION) {
            return <Registration changeContext={this.changeContext} dispatch={this.props.dispatch}/>
        }
        if (this.state.context === CTX_RECOVERY_PASSWORD) {
            return <Recovery changeContext={this.changeContext} dispatch={this.props.dispatch}/>
        }
        return <Login changeContext={this.changeContext} dispatch={this.props.dispatch}/>;
    }

    changeContext(ctx_name) {
        this.setState({context: ctx_name});
    }

    render() {
        return <div className="login_fragment text-center">
            <WrappedCustomAlert level={1}/>
            {this.selectedContext()}
        </div>;
    }
}