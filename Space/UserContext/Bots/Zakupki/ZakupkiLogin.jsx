import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {PortalModal} from "../../../../PortalModal";
import {WrappedCustomAlert} from "../../../../Components/Alert/WrappedCustomAlert";

export class ZakupkiLogin extends Component {

    state = {
        login: '',
        password: ''
    };

    render() {
        return <PortalModal><Modal onHide={this.props.close} show={this.props.show}>
            <Modal.Header>
                <Modal.Title>Авторизация (Портал поставщиков)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <WrappedCustomAlert level={1}/>
                <label>Введите данные авторизации</label>
                <div className="text-center">
                    <input type="text" placeholder="Логин" value={this.state.login} onChange={event => this.setState({...this.state, login: event.target.value})}/>
                    <br/>
                    <input type="password" className="mt-2" value={this.state.password} placeholder="Пароль" onChange={event => this.setState({...this.state, password: event.target.value})}/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.close}>Отмена</Button>
                <Button variant="success" onClick={() => this.props.login(this.state.login, this.state.password)}>Авторизоваться</Button>
            </Modal.Footer>
        </Modal></PortalModal>;
    }
}