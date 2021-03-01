import React, {Component} from "react";
import {Gear, Pause, Play, X} from "react-bootstrap-icons";
import {ConfirmTaskRemove} from "../Modals/ConfirmTaskRemove";
import {deleteTask, removeTask, startTask, stopTask} from "./Store/actions";
import {setUpdate} from "../Store/actions";
import {Danger} from "../../../../../Components/Alert/Store/actions";
import {ChangeAuction} from "../Modals/ChangeAuction";

export class AuctionControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenTaskRemove: false,
            isOpenTaskEdit: false
        };
        this.dispatch = props.dispatch;
        this.edit = props.edit;
        this.stop = this.stop.bind(this);
        this.start = this.start.bind(this);
        this.remove = this.remove.bind(this);
        this.playOrStop = this.playOrStop.bind(this);
        this.showedModal = props.showedModal == null ? this.showedModal.bind(this) : () => {};
        this.closeTaskRemove = this.closeTaskRemove.bind(this);
        this.showTaskRemove = props.showTaskRemove == null ? this.showTaskRemove.bind(this) : props.showTaskRemove;
        this.closeTaskEdit = this.closeTaskEdit.bind(this);
        this.showTaskEdit = props.showTaskEdit == null ? this.showTaskEdit.bind(this) : props.showTaskEdit;
    }

    stop() {
        this.dispatch(stopTask(this.props.data.id, data => {
            if (data != null && data.status === 'success') {
                return setUpdate(data);
            }
            return Danger(data.message);
        }));
    }

    start() {
        this.dispatch(startTask(this.props.data.id, data => {
            if (data != null && data.status === 'success') {
                return setUpdate(data);
            }
            return Danger(data.message);
        }));
    }

    remove() {
        this.dispatch(removeTask(this.props.data.id, data => {
            if (data.status === 'success') {
                return deleteTask(data.id);
            }
            return Danger(data.message);
        }))
    }

    closeTaskRemove() {
        this.setState({
            ...this.state,
            isOpenTaskRemove: false
        })
    }

    showTaskRemove(a) {
        this.setState({
            ...this.state,
            isOpenTaskRemove: true
        })
    }

    closeTaskEdit() {
        this.setState({
            ...this.state,
            isOpenTaskEdit: false
        })
    }

    showTaskEdit(a) {
        this.setState({
            ...this.state,
            isOpenTaskEdit: true
        })
    }

    showedModal() {
        if (this.state.isOpenTaskRemove) {
            return <ConfirmTaskRemove title={this.props.data.name} remove={() => this.remove()} cancel={this.closeTaskRemove}/>;
        } else if (this.state.isOpenTaskEdit) {
            return <ChangeAuction data={this.props.data} cancel={this.closeTaskEdit} dispatch={this.dispatch}/>
        }
        return '';
    }

    playOrStop() {
        if (this.props.data.is_running) {
            return <button className={"stop_s"} onClick={this.stop} title={"Остановить"}><Pause size={25}/></button>;
        }
        return <button className={"play_s"} onClick={this.start} title={"Запустить"}><Play size={25}/></button>;
    }

    render() {
        const locked = this.props.data.is_locked ? " locked" : '';
        return <div className={"control_panel" + locked}>
            {this.playOrStop()}
            {this.showedModal()}
            <button className={"settings_s ml-2"} onClick={() => this.showTaskEdit(this.props.data)} title={"Редактировать"}>
                <Gear size={20}/></button>
            <button className={"delete_s ml-2"} onClick={() => this.showTaskRemove(this.props.data)} title={"Удалить"}>
                <X size={25}/></button>
        </div>;
    }
}