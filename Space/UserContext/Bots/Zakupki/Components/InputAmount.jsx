import React, {Component} from 'react';
import {amountFormat} from "../../../../../utils";

export class InputAmount extends Component {

    constructor(props) {
        super(props);
        this.changeMinCost = this.changeMinCost.bind(this);
    }

    state = {
        min_cost: ''
    };

    componentDidMount() {
        this.setState({min_cost: this.props.min_cost});
    }

    changeMinCost(event) {
        const ret = /^(\d{1,7})([.,](\d{1,2}))*₽*$/.exec(event.target.value);
        if (ret != null) {
            let min_cost = ret[1];
            if (ret[3] !== undefined)
                min_cost += ret[3];
            else
                min_cost += "00";
            min_cost = parseInt(min_cost);
            this.props.setMinCost(min_cost);
            this.setState({min_cost: min_cost});
        }
    }

    render() {
        return <input type="text" value={amountFormat(this.state.min_cost)} onChange={this.changeMinCost}
                      placeholder={this.props.placeholder}/>;
    }
}