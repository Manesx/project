import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import {amountFormat} from "../../../../utils";
import {TimeLeft} from "../../../../Components/TimeLeft";
import {AuctionControl} from "./Components/AuctionControl";
import {Lock} from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

export class Auction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auction: null
        }
    }

    render() {
        const data = this.props.data;
        return <Card className={"task m-1"}>
            <Card.Header className={"d_flex"}>
                {data.id != null ? <button type={"button"} onClick={() => this.props.selectedAuction(data.auction)}>Котировочная сессия {data.auction}</button> : "Котировочная сессия " + data.auction}
                {data.id != null ? <div className={"d_flex no_sel d_hide ml-2"}><p>Задача</p><p className={"ml-1"}>{data.is_locked != null ? (data.is_locked ? <Lock/> : '') : ''}</p></div> : ''}
            </Card.Header>
            <Card.Body>
                <Card.Title><a rel="noopener noreferrer" target="_blank" title={"Название аукциона"} href={"https://zakupki.mos.ru/auction/" + data.auction}>{data.name}</a></Card.Title>
                <Card.Text>
                    {data.region != null ? (<div className={"d_flex"}><div className={"region"}/><p>{data.region}</p></div>) : ''}
                    {data.start_price != null ? (<p>Начальная стоимость: {amountFormat(data.start_price)}</p>) : ''}
                    {data.end_date != null ? (<p>Дата окончания сессии {data.end_date}</p>) : ''}
                    {data.time_left != null ? (<p>Делать ставку через {TimeLeft(data.time_left)}</p>) : ''}
                    {data.min_cost != null ? (<p>Минимальная сумма ставки {amountFormat(data.min_cost)}</p>) : ''}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <div className={"d_flex"}>
                    {data.last_change != null ? (<p className={"d_hide"}>Изменён {new Date(data.last_change * 1000).toLocaleString()}</p>) : data.begin_date != null ? <p className={"d_hide"}>Добавлен {data.begin_date}</p> : ''}
                    {data.federal_law_name != null ? (<div className={"d_flex ml-1"}><div className={"document_low"}/><p>{data.federal_law_name}</p></div>) : ''}
                    {/*{data.id != null ? <div className={"ml-1"}><AuctionControl dispatch={this.props.dispatch} data={data}/></div> : ''}*/}
                    {data.id == null ? <Button className={"ml-auto"} variant={"primary"}
                                               onClick={() => this.props.addAuction(data.auction)}>Создать задачу</Button>
                        :
                        <div className={"ml-auto"}><AuctionControl showedModal={this.props.showedModal} showTaskRemove={this.props.showTaskRemove} showTaskEdit={this.props.showTaskEdit} dispatch={this.props.dispatch} data={this.props.data}/></div>}
                </div>
            </Card.Footer>
        </Card>;
    }
}