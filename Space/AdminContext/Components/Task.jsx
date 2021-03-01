import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import {TaskControl} from "./TaskControl";
import {TaskStatus} from "../../UserContext/Bots/Zakupki/Components/TaskStatus";
import {TimeLeft} from "../../../Components/TimeLeft";
import {amountFormat} from "../../../utils";


export class Task extends Component {

    constructor(props) {
        super(props);
        this.user_id = props.user_id;
        this.task = props.task;
        this.dispatch = props.dispatch;
    }

    render() {
        return <Card className={"task m-1"}>

            <Card.Header className={"d_flex"}>
                Задача
            </Card.Header>

            <Card.Body>
                <Card.Title><a rel="noopener noreferrer" target="_blank" title={"Название аукциона"} href={"https://zakupki.mos.ru/auction/" + this.task.auction}>{this.task.name}</a></Card.Title>

                <Card.Text>
                    Делать ставку за {TimeLeft(this.task.time_left)} до {amountFormat(this.task.min_cost)}.
                </Card.Text>
            </Card.Body>

            <Card.Footer className={"d_flex"}>
                <small className="text-muted"><TaskStatus task={this.task}/></small>
                <TaskControl task={this.task} user_id={this.user_id} dispatch={this.dispatch}/>
            </Card.Footer>
        </Card>;
    }
}