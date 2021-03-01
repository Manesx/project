import React, {Component} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Logout} from "../../Components/Logout/Logout";
import {WrappedZakupkiContext} from "./Bots/Zakupki/Zakupki";
import {WrappedCustomAlert} from "../../Components/Alert/WrappedCustomAlert";
import Col from "react-bootstrap/Col";
import {Navigation} from "react-minimal-side-navigation";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
// import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';


export const CTX_BOT_ZAKUPKI = "CTX_BOT_ZAKUPKI";

export class UserContext extends Component {

    state = {
        context: null
    };

    constructor(props) {
        super(props);
        this.selectedContext = this.selectedContext.bind(this);
    }

    selectedContext() {
        if (this.state.context === CTX_BOT_ZAKUPKI) {
            return <WrappedZakupkiContext/>;
        }
        return <h3 className={"text-center no_sel"}>Выберите бота, авторизуйтесь и пользуйтесь</h3>;
    }

    render() {
        return <div>
            <header><Navbar bg="light" variant="light">
                <Navbar.Brand className={"no_sel"} onClick={() => this.setState({context: null})}>Управление</Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                <Logout/>
            </Navbar></header>
            <WrappedCustomAlert level={0}/>
            <main>
                <Container fluid>
                    <Row>
                        <Col xl={3} md={4} sm={12}>
                            <div className={"mt-3 no_sel navig"}>
                                <Navigation
                                    activeItemId="/management/members"
                                    onSelect={({itemId}) => {
                                        if (itemId === 'zakupki_auctions') {
                                            this.setState({context: CTX_BOT_ZAKUPKI})
                                        }
                                    }}
                                    items={[
                                        {
                                            title: 'Портал поставщиков',
                                            itemId: 'zakupki',
                                            subNav: [
                                                {
                                                    title: 'Аукционы',
                                                    itemId: 'zakupki_auctions',
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Сбербанк АСТ',
                                            itemId: 'sberbank_ast',
                                            subNav: [
                                                {
                                                    title: 'Авторизация',
                                                    itemId: 'sberbank_ast_auth',
                                                },
                                                {
                                                    title: 'Аукционы',
                                                    itemId: 'sberbank_ast_auctions',
                                                },
                                                {
                                                    title: 'VR менеджер',
                                                    itemId: 'sberbank_ast_manager',
                                                }
                                            ]
                                        },
                                        {
                                            title: 'Росельторг',
                                            itemId: 'roseltorg',
                                            subNav: [
                                                {
                                                    title: 'Авторизация',
                                                    itemId: 'roseltorg_auth',
                                                },
                                                {
                                                    title: 'Аукционы',
                                                    itemId: 'roseltorg_auctions',
                                                },
                                                {
                                                    title: 'VR менеджер',
                                                    itemId: 'roseltorg_manager',
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </div>
                        </Col>
                        <Col xl={9} md={8} sm={12}>
                            {this.selectedContext()}
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>;
    }
}