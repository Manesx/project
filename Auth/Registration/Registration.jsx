import React, {Component} from "react";
import {Button} from 'react-bootstrap';
import IdentificationInput from "../Components/IdentificationInput";
import {beginRegistration} from "./Store/actions";
import {Success, Warning} from "../../Components/Alert/Store/actions";
import {WrappedCustomAlert} from "../../Components/Alert/WrappedCustomAlert";

export class Registration extends Component {
    state = {
        username: '',
        tin: null,
        email: null,
        bin: null,
        password: '',
        password_retry: ''
    };

    constructor(props) {
        super(props);
        this.registration = this.registration.bind(this);
    }

    registration() {
        if (this.state.username != null && this.state.username.length < 4) {
            this.props.dispatch(Warning("Слишком короткое имя"));
            return;
        } else if (this.state.tin === null && this.state.bin === null) {
            this.props.dispatch(Warning("Не указан ИНН или ОГРН"));
            return;
        }
        if (this.state.password != null && this.state.password.length < 6) {
            this.props.dispatch(Warning("Слишком короткий пароль"));
            return;
        }
        if (this.state.password_retry != null && this.state.password_retry.length < this.state.password.length) {
            this.props.dispatch(Warning("Повторите пароль"));
            return;
        }
        if (this.state.email.length.length === 0) {
            this.props.dispatch(Warning("Укажите почту"));
            return;
        }
        if (this.state.password !== this.state.password_retry) {
            this.props.dispatch(Warning("Пароли не равны"));
            return;
        }
        this.props.dispatch(beginRegistration(this.state.username, this.state.email, this.state.tin, this.state.bin, this.state.password, data => {
            if (data.status === 'success') {
                return Success("Успешная регистрация");
            }
            return Warning(data.message);
        }));
    }

    render() {
        return <div>
            <h2 className="m-5">Регистрация</h2>
            <WrappedCustomAlert level={0}/>
            <div className="m-5">
                <input autoComplete={"off"} className="mt-2" type="text" onChange={event => this.setState({...this.state, username: event.target.value})} placeholder="Ваше имя"/>
                <input autoComplete={"off"} className="mt-2" type="text" onChange={event => this.setState({...this.state, email: event.target.value})} placeholder="Email"/>
                <IdentificationInput className="mt-2" setTin={tin => this.setState({...this.state, bin: null, tin: tin})} setBin={bin => this.setState({...this.state, tin: null, bin: bin})} placeholder="ИНН или ОГРН"/>
                <input autoComplete={"off"} className="mt-2" type="password" onChange={event => this.setState({...this.state, password: event.target.value})} placeholder="Пароль"/>
                <input autoComplete={"off"} className="mt-2" type="password" onChange={event => this.setState({...this.state, password_retry: event.target.value})} placeholder="Повторить пароль"/>
                <div>
                    <Button className="m-2" variant="secondary" onClick={() => this.props.changeContext(null)}>Авторизация</Button>
                    <Button className="m-2" variant="primary" onClick={this.registration}>Создать аккаунт</Button>
                </div>
            </div>
        </div>;
    }
}