import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import {WrappedCustomAlert} from "../Components/Alert/WrappedCustomAlert";
import {Success, Warning} from "../Components/Alert/Store/actions";
import {handlerData} from "../utils";
import {beginRecoveryPassword} from "../Modals/Store/actions";

export class Recovery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
        this.beginRecovery = this.beginRecovery.bind(this);
    }

    beginRecovery() {
        if (this.state.email.length === 0) {
            this.props.dispatch(Warning("Укажите email", 0));
        } else if (this.state.email.length < 6) {
            this.props.dispatch(Warning("Короткий email", 0))
        } else {
            this.props.dispatch(beginRecoveryPassword(this.state.email, data => handlerData(data, d => Success(data.message, 0), 0)))
        }
    }

    render() {
        return <div>
            <h2 className="m-5">Восстановление пароля</h2>
            <div className="m-5">
                <WrappedCustomAlert level={0}/>
                <input className="mt-3" type="text" onChange={event => this.setState({...this.state, email: event.target.value})}
                       placeholder="Почта"/>
                <div className="mt-3">
                    <Button variant="primary" onClick={this.beginRecovery}>Продолжить</Button>
                    <Button variant="link" onClick={() => this.props.changeContext(null)}>Отмена</Button>
                </div>
            </div>
        </div>;
    }
}