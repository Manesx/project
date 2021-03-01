import {createPortal} from "react-dom";

export const PortalModal = props => {
    return createPortal(
        props.children,
        document.getElementById('modal'));
};