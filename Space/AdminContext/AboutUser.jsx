import React, {Component} from "react";
import {WrappedListTasks} from "./ListTasks";
import {WrappedUserLogs} from "./UserLogs";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

export class AboutUser extends Component {

    render() {
        return <div>
            <h3>Информация о пользователе</h3>
            <h5><b>Имя:</b> {this.props.user.username}</h5>
            <br/>
            <h6><b>Название компании:</b> {this.props.user.company_name}</h6>
            <h6><b>Регион:</b> {this.props.user.region}</h6>
            <h6><b>ИНН:</b> {this.props.user.tin != null ? this.props.user.tin : "Не указан"} <b>ОГРН:</b> {this.props.user.bin != null ? this.props.user.bin : "Не указан"}</h6>
            <br/>
            <Tabs defaultActiveKey="tasks" id="uncontrolled-tab-example">
                <Tab eventKey="tasks" title="Бот закупки">
                    <WrappedListTasks user_id={this.props.user.id}/>
                </Tab>
                <Tab eventKey="logs" title="Логи">
                    <WrappedUserLogs user_id={this.props.user.id}/>
                </Tab>
            </Tabs>
        </div>;
    }
}