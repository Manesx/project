import React, {Component} from "react";
import Spinner from "react-bootstrap/Spinner";
import {Auction} from "./Auction";
import {ConfirmTaskRemove} from "./Modals/ConfirmTaskRemove";
import {ChangeAuction} from "./Modals/ChangeAuction";
import {deleteTask, removeTask} from "./Components/Store/actions";
import {Danger} from "../../../../Components/Alert/Store/actions";

export class ListAuctions extends Component {

    constructor(props) {
        super(props);
        this.auctionList = this.auctionList.bind(this);
        this.closeTaskRemove = this.closeTaskRemove.bind(this);
        this.showTaskRemove = this.showTaskRemove.bind(this);
        this.closeTaskEdit = this.closeTaskEdit.bind(this);
        this.showTaskEdit = this.showTaskEdit.bind(this);
        this.showedModal = this.showedModal.bind(this);
        this.remove = this.remove.bind(this);
        this.state = {
            isOpenTaskRemove: false,
            isOpenTaskEdit: false,
            data: null
        };
    }

    closeTaskRemove() {
        this.setState({
            ...this.state,
            data: null,
            isOpenTaskRemove: false
        })
    }

    showTaskRemove(data) {
        this.setState({
            ...this.state,
            data: data,
            isOpenTaskRemove: true
        })
    }

    closeTaskEdit() {
        this.setState({
            ...this.state,
            data: null,
            isOpenTaskEdit: false
        })
    }

    showTaskEdit(data) {
        this.setState({
            ...this.state,
            data: data,
            isOpenTaskEdit: true
        })
    }

    remove(data) {
        this.props.dispatch(removeTask(data.id, d => {
            if (d.status === 'success') {
                return deleteTask(data.id);
            }
            return Danger(d.message);
        }))
    }

    showedModal() {
        if (this.state.isOpenTaskRemove) {
            return <ConfirmTaskRemove title={this.state.data.name} remove={() => this.remove(this.state.data)} cancel={this.closeTaskRemove}/>;
        } else if (this.state.isOpenTaskEdit) {
            return <ChangeAuction data={this.state.data} cancel={this.closeTaskEdit} dispatch={this.props.dispatch}/>
        }
        return '';
    }

    auctionList() {
        const items = this.props.items;
        if (items != null && items.length > 0) {
            return <div>
                {this.showedModal()}
                {items.map(item => {
                return <Auction showedModal={() => {}}
                                showTaskRemove={this.showTaskRemove}
                                showTaskEdit={this.showTaskEdit}
                                addAuction={this.props.addAuction} selectedAuction={this.props.selectedAuction} key={Math.random()} dispatch={this.props.dispatch} data={item}/>;
            })}</div>
        }
        return items == null ? <Spinner animation="border"/> : '';
    }

    render() {
        return this.auctionList();
    }
}