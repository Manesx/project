import React, {Component} from "react";
import {Lock, Unlock} from "react-bootstrap-icons";
import {lockTask, unlockTask} from "../Store/actions";
import {ConfirmTaskBlocking} from "../Modals/ConfirmTaskBlocking";
import {setUpdate} from "../../UserContext/Bots/Zakupki/Store/actions";
import {handlerData} from "../../../utils";

export class TaskControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenBlockedTask: false
        };
        this.dispatch = props.dispatch;
        this.lock = this.lock.bind(this);
        this.unlock = this.unlock.bind(this);
        this.showedModal = this.showedModal.bind(this);
        this.closeBlockedTask = this.closeBlockedTask.bind(this);
        this.showBlockedTask = this.showBlockedTask.bind(this);
        this.lockOrUnlock = this.lockOrUnlock.bind(this);
    }

    unlock() {
        this.dispatch(unlockTask(this.props.user_id, this.props.task.id, data => handlerData(data, d => setUpdate(d), 0)));
    }

    lock() {
        this.dispatch(lockTask(this.props.user_id, this.props.task.id, data => handlerData(data, d => setUpdate(d), 0)));
    }

    closeBlockedTask() {
        this.setState({
            ...this.state,
            isOpenBlockedTask: false
        })
    }

    showBlockedTask() {
        this.setState({
            ...this.state,
            isOpenBlockedTask: true
        })
    }

    showedModal() {
        if (this.state.isOpenBlockedTask) {
            return <ConfirmTaskBlocking task={this.props.task} lock={this.lock} cancel={this.closeBlockedTask}/>;
        }
        return '';
    }

    lockOrUnlock() {
        if (this.props.task.is_locked) {
            return <button onClick={this.unlock} title={"Разблокировать"}><Unlock/></button>;
        }
        return <button onClick={this.showBlockedTask} title={"Заблокировать"}><Lock/></button>;
    }

    render() {
        return <div className={"ml-auto"}>
            {this.lockOrUnlock()}
            {this.showedModal()}
        </div>;
    }
}