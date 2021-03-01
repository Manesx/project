import React, {Component} from "react";
import {Button} from 'react-bootstrap';
import IdentificationInput from "../Components/IdentificationInput";
import Alert from "react-bootstrap/Alert";
import {CTX_RECOVERY_PASSWORD, CTX_REGISTRATION} from "../LoginManager";
import {loginAuthorization} from "./Store/actions";
import {setUser} from "../Store/reducer";
import {Warning} from "../../Components/Alert/Store/actions";
import {handlerData} from "../../utils";

export class Login extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    state = {
        tin: null,
        bin: null,
        password: ''
    };

    login() {
        if (this.state.password != null && this.state.password.length > 5) {
            if (this.state.tin != null || this.state.bin != null) {
                this.props.dispatch(loginAuthorization(this.state.tin, this.state.bin, this.state.password, data => handlerData(data, setUser, 1)));
            } else {
                this.props.dispatch(Warning('Укажите ИНН или ОГРН', 1));
            }
        } else {
            this.props.dispatch(Warning('Указанный пароль не может быть меньше 5 символов', 1));
        }
    }

    render() {
        return <div>
            <h2 className="m-5">Авторизация</h2>
            <div className="m-5">
                {
                    this.props.message != null ? <Alert variant={"danger"}>{this.props.message}</Alert> : ''
                }
                <IdentificationInput setTin={tin => this.setState({...this.state, bin: null, tin: tin})} setBin={bin => this.setState({...this.state, tin: null, bin: bin})}
                                     placeholder="ИНН или ОГРН"/>
                <input className="mt-3" type="password" onChange={event => this.setState({...this.state, password: event.target.value})}
                       placeholder="Пароль"/>
                <div className="mt-3">
                    <Button variant="primary" onClick={this.login}>Войти</Button>
                    <Button variant="link" onClick={() => this.props.changeContext(CTX_REGISTRATION)}>Регистрация</Button>
                </div>
                <Button className="mt-3" variant="secondary" onClick={() => this.props.changeContext(CTX_RECOVERY_PASSWORD)}>Забыл пароль</Button>
            </div>
        </div>;
    }
}