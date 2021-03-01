import {PortalModal} from "../../../../../PortalModal";
import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Col, Container, Row} from "react-bootstrap";
import {InputAmount} from "../Components/InputAmount";
import InputMask from "react-input-mask";
import {connect} from "react-redux";
import {addTask, createTask, setAuctionInfo} from "./Store/actions";
import {Warning} from "../../../../../Components/Alert/Store/actions";
import {WrappedCustomAlert} from "../../../../../Components/Alert/WrappedCustomAlert";
import {amountFormat, handlerData} from "../../../../../utils";
import {loadAuctions} from "../Store/actions";
import {Loading} from "../../../../../Loading";

class AddAuction extends Component {

    state = {
        min_cost: null,
        time_left: null
    };

    constructor(props) {
        super(props);
        this.createTask = this.createTask.bind(this);
        this.auctionInfo = this.auctionInfo.bind(this);
    }

    componentWillUnmount() {
        this.props.dispatch(setAuctionInfo(null));
    }

    componentDidMount() {
        this.props.dispatch(loadAuctions(this.props.auction, null, null, data => handlerData(data, setAuctionInfo, 1)));
    }

    createTask() {
        if (this.state.min_cost === null) {
            return this.props.dispatch(Warning("Не указана минимальная стоимость", 1));
        }
        let time = /(\d{2})\sч.\s(\d{2})\sм.\s(\d{2}) с./.exec(this.state.time_left);
        if (time != null) {
            let hours = parseInt(time[1]);
            let minute = parseInt(time[2]);
            let second = parseInt(time[3]);
            time = hours * 60 * 60 + minute * 60 + second;
            this.props.dispatch(createTask(this.props.auction, this.state.min_cost, time, data => handlerData(data, addTask, 1)))
        } else {
            return this.props.dispatch(Warning("Не указано время ставки", 1));
        }
    }

    auctionInfo() {
        const info = this.props.info;
        if (info == null) {
            return <Loading/>;
        }
        let body = null;
        let about_company = '';
        if (info.last_bet_supplier != null) {
            about_company = 'Компания: ' + info.last_bet_supplier.companyName + <br/>;
        }
        let current_cost = '';
        if (info.last_bet_cost != null) {
            current_cost = 'Текущая стоимость: ' + amountFormat(info.last_bet_cost);
        }
        let start_cost = '';
        if (info.start_cost != null) {
            start_cost = 'Начальная стоимость: ' + amountFormat(info.start_cost);
        }
        const code = info.state.code;
        if (code === 'Active') {
            body = <div>
                {about_company}
                {start_cost}<br/>
                {current_cost}<br/>
                Ставка произойдёт: {info.end_date}</div>;
        } else if (code === 'Finished') {
            body = "Аукцион завершён";
        } else if (code === 'Canceled') {
            body = "Аукцион не состоялся";
        }
        return <Row className="auction_info pt-2 pb-2 mt-2"><Col>
            <h5><a rel="noopener noreferrer" target="_blank" href={'https://zakupki.mos.ru/auction/' + this.props.auction}>{info.name}</a></h5>{body}</Col></Row>;
    }

    render () {
        return <PortalModal>
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" onHide={this.props.cancel} centered show={true}>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Саздание задачи
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <WrappedCustomAlert level={1}/>
                    <Container>
                        {this.auctionInfo()}
                        <Row className="mt-2">
                            <Col>Минимальная стоимость</Col>
                            <Col><InputAmount setMinCost={min_cost => this.setState({
                                ...this.state,
                                    min_cost: min_cost
                                })} placeholder="2000.00"/></Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>Делать ставку за</Col>
                            <Col><InputMask mask="99 ч. 99 м. 99 с."  onChange={event => this.setState({
                                    ...this.state,
                                    time_left: event.target.value
                                })}/></Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        this.props.cancel();
                    }}>Закрыть</Button>
                    <Button variant="primary" onClick={this.createTask}>Создать</Button>
                </Modal.Footer>
            </Modal>
        </PortalModal>;
    }
}

export const WrappedAddAuction = connect(state => {
    return {
        info: state.zakupki.info
    }
})(AddAuction);