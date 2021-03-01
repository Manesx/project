import React, {Component} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {WrappedListUsers} from "./Users";
import {Logout} from "../../Components/Logout/Logout";
import {WrappedCustomAlert} from "../../Components/Alert/WrappedCustomAlert";
import {AboutUser} from "./AboutUser";

export const CTX_LIST_USERS = "CTX_LIST_USERS";
export const CTX_ABOUT_USER = "CTX_ABOUT_USER";

export class AdminContext extends Component {

    constructor(props) {
        super(props);

        this.state = {
            context: CTX_LIST_USERS,
            user: null
        };
        this.chooseUser = this.chooseUser.bind(this);
        this.selectedContext = this.selectedContext.bind(this);
        document.title = "Админ панель";
    }

    chooseUser(user) {
        if (user != null) {
            this.setState({
                context: CTX_ABOUT_USER,
                user: user
            });
        } else {
            this.setState({
                context: CTX_LIST_USERS,
                user: null
            });
        }
    }

    selectedContext() {
        if (this.state.context === CTX_LIST_USERS) {
            return <WrappedListUsers chooseUser={this.chooseUser}/>
        } else if (this.state.context === CTX_ABOUT_USER) {
            return <AboutUser user={this.state.user}/>
        }
        return '';
    }

    render() {
        return <div>
            <header>
                <Navbar bg="dark" variant="dark">

                    <Navbar.Brand href="">Админ панель</Navbar.Brand>

                    <Nav className="mr-auto">
                        <Nav.Link href="#"
                                  onClick={ctx_name => this.chooseUser(null)}>Пользователи</Nav.Link>
                    </Nav>
                    <Logout/>
                </Navbar>
            </header>
            <main>
                <WrappedCustomAlert level={0}/>
                <Container className={"mt-4"} fluid>
                    <Row>
                        <Col xl={2} md={4} sm={12}>

                        </Col>
                        <Col xl={10} md={8} sm={12}>
                            {this.selectedContext()}
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>;
    }
}