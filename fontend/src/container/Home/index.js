import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap'
import SideBar from '../../container/SideBar/'
import '../../App.css';
export default function Home() {
    const history = useHistory()
    const auth = useSelector(state => state.auth)
    console.log(auth.autenticate)

    if (!auth.autenticate) {
        history.push("/signin");
    }


    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={2}>
                        <SideBar />
                    </Col>
                    <Col md={10}>
                        Hi Home
                    </Col>
                </Row>
            </Container>
        </>
    )
}
