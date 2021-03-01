import React, {Component} from "react";
import {loadAuctions, setData} from "./Store/actions";
import {handlerData} from "../../../../utils";
import {ListAuctions} from "./ListAuctions";
import {connect} from "react-redux";
import {Loading} from "../../../../Loading";
import {WrappedAddAuction} from "./Modals/AddAuction";

class AllAuctions extends Component {

    state = {
        auction: null
    };

    componentDidMount() {
        console.log("componentDidMount");
        this.props.dispatch(loadAuctions(null, this.props.offset, this.props.offset + 10, data => handlerData(data, d => setData(d.count, d.data), 0)));
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextProps.offset);
        console.log(this.props.offset);
        if (this.props.offset !== nextProps.offset) {
            this.props.dispatch(loadAuctions(null, this.props.offset, this.props.offset + 10, data => handlerData(data, d => setData(d.count, d.data), 0)));
        }
        return true;
    }

    render() {
        // window.scrollTo(0, 0);
        if (this.props.updates.data == null) {
            return <Loading/>;
        }
        if (this.props.updates.data.length === 0) {
            return 'Список активных аукционов пуст';
        }
        return <div>
            {this.state.auction != null ?
                <WrappedAddAuction cancel={() => this.setState({...this.state, auction: null})}
                                   auction={this.state.auction}/> : ''}
            <ListAuctions dispatch={this.props.dispatch} addAuction={auction => this.setState({auction: auction})} items={this.props.updates.data} selectedAuction={this.props.selectedAuction}/></div>;
    }
}

export const WrappedAllAuctions = connect(state => {
    return {updates: state.zakupki.updates}
})(AllAuctions);