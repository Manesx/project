import Modal from "react-bootstrap/Modal";
import {PortalModal} from "../PortalModal";
import React from "react";

export const MessageModal = props => {
    return <PortalModal><Modal  onHide={() => {}} show={true}>
        <Modal.Header>
            <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
    </Modal></PortalModal>;
};