import Alert from "react-bootstrap/Alert";
import React, {Component} from "react";
import {connect} from "react-redux";
import {Clear} from "./Store/actions";

class CustomAlert extends Component {

    state = {
        timeoutId: null,
        text: null
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.level === nextProps.message.level) {
            const text = nextProps.message.text;
            let timeoutId = null;
            if (text != null && text !== this.state.text) {
                timeoutId = this.state.timeoutId;
                if (timeoutId != null) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(() => {
                    this.props.dispatch(Clear());
                    this.setState({timeoutId: null, text: null});
                }, 3000);
                this.setState({timeoutId: timeoutId, text: text});
                return true;
            }
            return this.state !== nextState;
        }
        return false;
    }

    render() {
        if (this.state.text != null) {
            return <Alert variant={this.props.message.variant}>{this.props.message.text}</Alert>;
        }
        return '';
    }
}

export const WrappedCustomAlert = connect(state => {
    return {
        message: state.message
    }
})(CustomAlert);