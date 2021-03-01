import {connect} from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import {logout} from "./Store/actions";
import {Clear} from "../../actions";

export const Logout = connect(state => {
   return {user: state.user}
})(props => {
    return <DropdownButton variant="link" title={props.user.name} menuAlign={"right"}>
        <Dropdown.Header>{props.user.company_name}</Dropdown.Header>
        <Dropdown.Item as="button" onClick={() => props.dispatch(logout(d => Clear()))}>Выйти</Dropdown.Item>
    </DropdownButton>;
});