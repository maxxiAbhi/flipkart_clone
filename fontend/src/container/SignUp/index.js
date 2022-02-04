import React,{useState} from 'react'
import { Form, Button, Container, Row, Col ,Alert} from 'react-bootstrap'
import {  useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import register from '../../actions/user.action';
export default function SignUp() {
    const history=useHistory()
    const dispatch=useDispatch()
    const auth=useSelector(state => state.auth)
    console.log(auth.autenticate)
    if(auth.autenticate){
        history.push("/");
    }


    const [user, setUser] = useState({ firstName:'',lastName:'',username:'',email:'',phone:'',password:'',repassword:'' })

    let name, value;
    const handelInputs=(e)=>{
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
    }

    const userRegister = (e) => {
        e.preventDefault();
        const userdata = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            phone: user.phone,
            password: user.password,
            repassword: user.repassword
        }
        dispatch(register(userdata))

    }

    const userAuth=useSelector(state => state.user)
    if(userAuth.isucess){
        history.push("/signin");
    }


    return (
        <>
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }} className="mt-5" >
                    {userAuth.message?  <Alert variant={'danger'}>{userAuth.message}</Alert>:<Alert></Alert>}
                        <Form onSubmit={userRegister}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter First Name" name="firstName" value={user.firstName} onChange={handelInputs} />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Last Name" name="lastName" value={user.lastName} onChange={handelInputs} />
                                    </Form.Group>
                                </Col>
                            </Row>


                            <Form.Group >
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" name="username" value={user.username} onChange={handelInputs} />
                            </Form.Group>


                            <Form.Group >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={handelInputs} />
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="number" placeholder="Phone" name="phone" value={user.phone} onChange={handelInputs} />
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"  name="password" value={user.password} onChange={handelInputs} />
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="repassword" value={user.repassword} onChange={handelInputs} />
                            </Form.Group>

                            <Button variant="primary" type="submit" >Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
