import React, { useState,useEffect } from 'react'
import { Form, Button, Container, Row, Col,Alert } from 'react-bootstrap'
import login, { isUserLogin } from "../../actions/auth"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
export default function SignIn() {
      console.error = () => {};
    const dispatch = useDispatch()
    const [user, setUser] = useState({ username: '', password: '' })
    const history=useHistory()
   

    let name, value;
    const handelInputs = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
    }

    const userLogin = (e) => {
        e.preventDefault();
        const userdata = {
            username: user.username,
            password: user.password
        }
        dispatch(login(userdata))

        console.log(auth)
    }
    const auth=useSelector(state => state.auth)
    useEffect(() => {
        if(!auth.autenticate){
            dispatch(isUserLogin())
        }
        
    }, [dispatch])
    if(auth.autenticate){
        history.push("/");
    }

    const userAuth=useSelector(state => state.user)


    return (
        <>
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }} className="mt-5" >
                    {auth.message?<Alert  variant={'danger'}>{auth.message}</Alert>:<Alert></Alert>}
                     {userAuth.isucess?<Alert  variant={'success'}>Registration Sucessfully</Alert>:<Alert></Alert>}
                        <Form onSubmit={userLogin} >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" name="username" value={user.username} onChange={handelInputs} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={handelInputs} />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}