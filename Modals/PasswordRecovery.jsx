import React, {Component} from "react";
import {PortalModal} from "../PortalModal";
import {connect} from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {WrappedCustomAlert} from "../Components/Alert/WrappedCustomAlert";
import {Warning} from "../Components/Alert/Store/actions";
import {changePassword} from "./Store/actions";
import {handlerData} from "../utils";
import {setUser} from "../Auth/Store/reducer";

class PasswordRecovery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            password_retry: ''
        };
        this.beginChangePassword = this.beginChangePassword.bind(this);
    }

    beginChangePassword() {
        console.log('Hello');
        if (this.state.password.length === 0) {
            this.props.dispatch(Warning("Укажите пароль", 1));
        } else if (this.state.password.length < 6) {
            this.props.dispatch(Warning("Короткий пароль", 1))
        } else if (this.state.password_retry !== this.state.password) {
            this.props.dispatch(Warning("Повторите пароль", 1))
        } else {
            this.props.dispatch(changePassword(this.state.password, data => handlerData(data, () => setUser(null), 1)))
        }
    }

    render() {
        return <PortalModal>
            <Modal show={true} onHide={() => {}}>
                <WrappedCustomAlert level={1}/>
                <Modal.Body>
                    <p>Восстановление пароля</p>
                    <div className="text-center">
                        <input value={this.state.password} onChange={event => this.setState({...this.state, password: event.target.value})} type={"password"} placeholder={"Введите пароль"}/>
                        <br/>
                        <input value={this.state.password_retry} onChange={event => this.setState({...this.state, password_retry: event.target.value})} className={"mt-3"} type={"password"} placeholder={"Повторите пароль"}/>
                    </div>
                    <div className={"d_flex mt-3"}>
                        <Button onClick={this.beginChangePassword} className={"ml-auto"} variant={"success"}>Изменить</Button>
                    </div>
                    </Modal.Body>
            </Modal>
        </PortalModal>;
    }
}

export const WrappedPasswordRecovery = connect()(PasswordRecovery);