import React, {Component} from "react";
import {startUpdatesSync, stopUpdatesSync} from "./Store/actions";
import {connect} from "react-redux";
import {ZakupkiAuthStatus} from "./Components/ZakupkiAuthStatus";
import {WrappedOnlyAddedAuctions} from "./OnlyAddedAuctions";
import {WrappedAllAuctions} from "./AllAuctions";
import {WrappedAuctionAbout} from "./AuctionAbout";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {ChevronLeft, ChevronRight} from "react-bootstrap-icons";


class ZakupkiContext extends Component {

    state = {
        action: null,
        useOnlyAdded: false,
        offset: 0,
        auction: null,
        tabId: "all_auctions",
        update: false
    };

    constructor(props) {
        super(props);
        this.selectedContext = this.selectedContext.bind(this);
        document.title = "Бот закупки";
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // if (nextState.offset !== this.state.offset) {
        //     return true;
        // }
        // if (nextState.auction !== this.state.auction) {
        //     return true;
        // }
        // return this.state.useOnlyAdded !== nextState.useOnlyAdded;
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.authorized) {
            if (!this.state.update) {
                this.props.dispatch(startUpdatesSync());
                this.setState({...this.state, update: true});
            }
        } else if (this.state.update) {
            this.props.dispatch(stopUpdatesSync());
            this.setState({...this.state, update: false});
        }
    }

    componentWillUnmount() {
        if (this.state.update) {
            this.props.dispatch(stopUpdatesSync());
        }
    }

    selectedContext() {
        if (this.state.auction != null) {
            return <WrappedAuctionAbout cancel={() => this.setState({...this.state, auction: null})}
                                        auction={this.state.auction}/>;
        }
        // return <Auctions checked={this.state.useOnlyAdded} prev={() => {
        //     if (this.state.offset >= 10) {
        //         this.setState({...this.state, offset: this.state.offset - 10});
        //     }
        // }} next={() => {
        //     if (this.state.offset < this.props.count) {
        //         this.setState({...this.state, offset: this.state.offset + 10});
        //     }
        // }} onlyAdded={checked => this.setState({...this.state, useOnlyAdded: checked, offset: 0, auction: null})}>
        //     {this.state.useOnlyAdded ?
        //         <WrappedOnlyAddedAuctions offset={this.state.offset} selectedAuction={auction => this.setState({...this.state, auction: auction})}/>
        //         :
        //         <WrappedAllAuctions offset={this.state.offset} selectedAuction={auction => this.setState({...this.state, auction: auction})}/>}
        // </Auctions>;
        return <div>
            <div>Filters</div>
            <Tabs defaultActiveKey={this.state.tabId} id="uncontrolled-tab-example"
                  onSelect={k => this.setState({...this.state, tabId: k, offset: 0})}>
                <Tab eventKey="all_auctions" title="Аукционы">
                    {this.state.tabId === "all_auctions" ?
                        <div className={"m_t"}><WrappedAllAuctions offset={this.state.offset}
                                                                   selectedAuction={auction => this.setState({
                                                                       ...this.state,
                                                                       auction: auction
                                                                   })}/></div> : ""}


                </Tab>
                <Tab eventKey="only_added_auctions" title="Задачи">
                    {this.state.tabId === "only_added_auctions" ?
                        <div className={"m_t"}><WrappedOnlyAddedAuctions offset={this.state.offset}
                                                                         selectedAuction={auction => this.setState({
                                                                             ...this.state,
                                                                             auction: auction
                                                                         })}/></div> : ""}
                </Tab>
            </Tabs>
            <div className={"d_flex m-2"}>
                <button onClick={() => {
                    if (this.state.offset >= 10) {
                        this.setState({...this.state, offset: this.state.offset - 10});
                    }
                }}><ChevronLeft/></button>
                <button className={"ml-2"} onClick={() => {
                    if (this.state.offset < this.props.count) {
                        this.setState({...this.state, offset: this.state.offset + 10});
                    }
                }}><ChevronRight/></button>
            </div>
        </div>;
    }

    render() {
        return <div>
            <ZakupkiAuthStatus/>
            {this.selectedContext()}
        </div>;
    }
}

export const WrappedZakupkiContext = connect(state => {
    return {count: state.zakupki.updates.count, authorized: state.zakupki.user.name != null}
})(ZakupkiContext);