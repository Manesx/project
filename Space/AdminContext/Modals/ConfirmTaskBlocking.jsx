import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, {Component} from "react";
import {PortalModal} from "../../../PortalModal";

export class ConfirmTaskBlocking extends Component {

    render() {
        return <PortalModal>
            <Modal onHide={this.props.cancel} show={true} size="lg"
                                   aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Подтверждение операции
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Вы действительно хотите заблокировать задачу "{this.props.task.name}"
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.cancel}>Отмена</Button>
                <Button onClick={this.props.lock} variant={"danger"}>Заблокировать</Button>
            </Modal.Footer>
        </Modal>
        </PortalModal>;
    }
}