import React, {Component} from "react";
import {TaskLogs} from "./TaskLogs";
import {loadAuctions} from "./Store/actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {TaskStatus} from "./Components/TaskStatus";
import {TimeLeft} from "../../../../Components/TimeLeft";
import {ChevronLeft} from "react-bootstrap-icons";
import {amountFormat, handlerData} from "../../../../utils";
import Button from "react-bootstrap/Button";
import {WrappedAddAuction} from "./Modals/AddAuction";
import {AuctionControl} from "./Components/AuctionControl";
import {connect} from "react-redux";
import {setAuctionInfo} from "./Modals/Store/actions";

class AuctionAbout extends Component {
    data = null;

    constructor(props) {
        super(props);
        this.getSelectedAuction = this.getSelectedAuction.bind(this);
        this.state = {
            min_cost: null,
            time_left: null,
            auction: null
        };
    }

    componentWillUnmount() {
        this.props.dispatch(setAuctionInfo(null));
    }

    componentDidMount() {
        if (this.data != null) {
            if (this.data.id == null) {
                this.props.dispatch(loadAuctions(this.data.auction, null, null, data => handlerData(data, setAuctionInfo, 0)));
            }
        }
    }

    getSelectedAuction(items) {
        if (items != null) {
            return items.find(item => item.auction === this.props.auction);
        }
        return null;
    }

    render() {
        this.data = this.getSelectedAuction(this.props.data);
        if (this.data == null) {
            this.props.cancel()
        }
        return <div className={"about_task"}>
            {this.state.auction != null ?
                <WrappedAddAuction cancel={() => this.setState({...this.state, auction: null})}
                                   auction={this.state.auction}/> : ''}
            <Row><Col className={"d_flex"}>
                <button title={"Список задач"} onClick={this.props.cancel} type={"button"}><ChevronLeft className="mb-1"
                                                                                                        size={20}/>
                </button>
                <h4><a rel="noopener noreferrer" target="_blank" title={"Название аукциона"}
                       href={"https://zakupki.mos.ru/auction/" + this.data.auction}>{this.data.name}</a></h4>
            </Col></Row>
            {
                this.props.info != null ? <Row><Col>Начальная цена: {amountFormat(this.props.info.start_cost)}</Col></Row> : ''
            }
            {
                this.props.info != null ? <Row><Col>Стоимость покупки: {amountFormat(this.props.info.next_cost)}</Col></Row> : ''
            }
            {
                this.data.min_cost != null ?
                    <Row><Col>Минимальная стоимость аукциона {amountFormat(this.data.min_cost)}</Col></Row> : ''
            }
            {
                this.data.time_left != null ?
                    <Row><Col>Делать ставку за {TimeLeft(this.data.time_left)}</Col></Row> : ''
            }
            <Row>
                <Col>
                    <TaskStatus data={this.data}/>
                </Col>
            </Row>
            <div className={"mt-2"}>
                {this.data.id != null ? <AuctionControl dispatch={this.props.dispatch} data={this.data}/> : ''}
                {this.data.id != null ? <div className={"mt-2"}><TaskLogs logs={this.data.logs}/></div> : <Button variant={"secondary"}
                                                                                    onClick={() => this.setState({
                                                                                        ...this.state,
                                                                                        auction: this.data.auction
                                                                                    })}>Создать задачу</Button>}
            </div>

        </div>;
    }
}

export const WrappedAuctionAbout = connect(state => {
    return {data: state.zakupki.updates.data, info: state.zakupki.info}
})(AuctionAbout);