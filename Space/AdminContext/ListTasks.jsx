import {connect} from "react-redux";
import React, {Component} from "react";
import {loadTasks} from "./Store/actions";
import {Task} from "./Components/Task";
import Spinner from "react-bootstrap/Spinner";
import {setData} from "../UserContext/Bots/Zakupki/Store/actions";
import {handlerData} from "../../utils";

class ListTasks extends Component {


    constructor(props) {
        super(props);
        this.user_id = props.user_id;
        this.dispatch = props.dispatch;
    }


    componentDidMount() {
        this.props.dispatch(loadTasks(this.props.user_id, 0, 10, data => handlerData(data, d => setData(d.count, d.data), 0)));
    }

    render() {
        if (this.props.data == null) {
            return <Spinner animation="border"/>;
        }
        if (this.props.data.length === 0) {
            return <h5>Нет задач</h5>;
        }
        return <div>
            {this.props.data.map(task => {
                return <Task key={Math.random()} task={task} user_id={this.user_id} dispatch={this.dispatch}/>
            })}
        </div>;
    }
}

export const WrappedListTasks = connect(state => {return {data: state.zakupki.updates.data}})(ListTasks);