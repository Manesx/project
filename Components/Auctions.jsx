import React, {Component} from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import {ChevronLeft, ChevronRight} from "react-bootstrap-icons";

export class Auctions extends Component {

    render() {
        return <div>
            <div className={"d_flex"}>
                <div className={"pl-3 pr-3 pt-2 pb-2 m_b no_sel"}>
                    <h3>Аукционы</h3>
                </div>
                <div className={"d_flex pl-4 pt-2"}>
                    <p className={"d_hide no_sel"}>Только добавленные</p>
                    <div className={"ml-2"}>
                        <BootstrapSwitchButton onlabel={"Да"} onChange={checked => this.props.onlyAdded(checked)}
                                               offlabel={"Нет"} checked={this.props.checked} size="xs"/>
                    </div>
                </div>
            </div>
            <div className={"m_t p-1"}>
                {this.props.children}
            </div>
            <div className={"d_flex m-2"}>
                <button onClick={this.props.prev}><ChevronLeft/></button>
                <button className={"ml-2"} onClick={this.props.next}><ChevronRight/></button>
            </div>
        </div>
    }
}