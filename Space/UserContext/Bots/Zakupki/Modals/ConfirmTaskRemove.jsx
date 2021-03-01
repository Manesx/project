import {PortalModal} from "../../../../../PortalModal";
import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export class ConfirmTaskRemove extends Component {


    render () {
        return <PortalModal>
            <Modal size="lg" onHide={this.props.cancel} aria-labelledby="contained-modal-title-vcenter" centered show={true} >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Подтверждение операции
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>{this.props.title}</h5>
                    <p>
                        Вы действительно хотите удалить задачу?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={this.props.cancel}>Отмена</Button>
                    <Button variant={"danger"}  onClick={this.props.remove}>Удалить</Button>
                </Modal.Footer>
            </Modal>
        </PortalModal>;
    }
}