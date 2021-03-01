import React, {Component} from "react";
import {loadTasks, setData} from "./Store/actions";
import {handlerData} from "../../../../utils";
import {ListAuctions} from "./ListAuctions";
import {connect} from "react-redux";
import {Loading} from "../../../../Loading";

class OnlyAddedAuctions extends Component {

    componentDidMount() {
        this.props.dispatch(loadTasks(null, this.props.offset, this.props.offset + 10, data => handlerData(data, d => setData(d.count, d.data), 0)))
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.offset !== nextProps.offset) {
            this.props.dispatch(loadTasks(null, this.props.offset, this.props.offset + 10, data => handlerData(data, d => setData(d.count, d.data), 0)));
        }
        return true;
    }

    // componentWillUnmount() {
    //     this.props.dispatch(setData(0, null));
    // }

    render() {
        if (this.props.updates.data == null) {
            return <Loading/>;
        }
        if (this.props.updates.data.length === 0) {
            return <h5 className={"p-1"}>Список добавленных задач пуст</h5>;
        }
        return <ListAuctions dispatch={this.props.dispatch} items={this.props.updates.data.filter(item => item.id != null)} selectedAuction={this.props.selectedAuction}/>;
    }
}


export const WrappedOnlyAddedAuctions = connect(state => {
    return {updates: state.zakupki.updates}
})(OnlyAddedAuctions);