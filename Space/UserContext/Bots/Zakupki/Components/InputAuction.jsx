import React, {Component} from 'react';

export class InputAuction extends Component {

    constructor(props) {
        super(props);
        this.changeAuction = this.changeAuction.bind(this);
    }

    state = {
        auction: ''
    };

    changeAuction(event) {
        const a = /(?:^|\D)(\d{7})$/gm.exec(event.target.value);
        if (a != null) {
            this.props.setAuction(a[1]);
        } else {
            this.props.setAuction(null);
        }
        this.setState({auction: event.target.value});

    }

    render() {
        return <input type="text" placeholder={this.props.placeholder} value={this.state.auction} onChange={this.changeAuction}/>;
    }
}