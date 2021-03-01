import {PortalModal} from "../../../../../PortalModal";
import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import InputMask from "react-input-mask";
import {setUpdate, taskChange} from "../Store/actions";
import {WrappedCustomAlert} from "../../../../../Components/Alert/WrappedCustomAlert";
import {InputAmount} from "../Components/InputAmount";
import {handlerData, timeLeft} from "../../../../../utils";

export class ChangeAuction extends Component {

    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.data = props.data;
        this.changeAuction = this.changeAuction.bind(this);
        this.state = {
            min_cost: null,
            time_left: timeLeft(this.data.time_left)
        };
    }

    changeAuction() {

        let min_cost = null;
        let time_left = null;
        if (this.state.min_cost != null && this.data.min_cost !== this.state.min_cost) {
            min_cost = this.state.min_cost;
        }
        if (this.state.time_left != null && this.data.time_left !== this.state.time_left) {
            time_left = this.state.time_left;
            let time = /(\d{2})\sч.\s(\d{2})\sм.\s(\d{2}) с./.exec(time_left);
            if (time != null) {
                let hours = parseInt(time[1]);
                let minute = parseInt(time[2]);
                let second = parseInt(time[3]);
                time_left = hours * 60 * 60 + minute * 60 + second;

            } else {
                time_left = null;
            }
        }
        if (min_cost != null || time_left != null) {
            this.dispatch(taskChange(this.data.id, min_cost, time_left, data => handlerData(data, setUpdate, 1)))
        }
    }

    render() {
        return <PortalModal>
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" onHide={this.props.cancel} centered show={true}>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Редактирование задачи
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <WrappedCustomAlert level={1}/>
                    <Container>
                        <Row>
                            <Col>Название аукциона</Col>
                            <Col><a rel="noopener noreferrer" target="_blank"
                                href={'https://zakupki.mos.ru/auction/' + this.data.auction}>{this.data.name}</a></Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>Минимальная стоимость</Col>
                            <Col><InputAmount min_cost={this.data.min_cost} setMinCost={min_cost => this.setState({
                                ...this.state.auction,
                                min_cost: min_cost
                            })} placeholder="2000.00"/></Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>Делать ставку за</Col>
                            <Col><InputMask mask="99 ч. 99 м. 99 с." value={this.state.time_left} onChange={event => this.setState({
                                ...this.state.auction,
                                time_left: event.target.value
                            })}/></Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={this.props.cancel}>Отмена</Button>
                    <Button variant={"primary"} onClick={this.changeAuction}>Сохранить</Button>
                </Modal.Footer>
            </Modal>
        </PortalModal>;
    }
}