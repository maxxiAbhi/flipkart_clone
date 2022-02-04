import React from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { Navbar, Nav, Container } from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import { signOut } from '../../actions/auth';

export default function MyNavbar() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
const logout=()=>{
  dispatch(signOut());
}
  const renderLoginLinks=()=>{
    return(
    <Nav>
           <li className="nav-item">
           <span className="nav-link" onClick={logout}>LogOut</span>
           </li>
          </Nav>
)
  }
  const renderNonLoginLinks=()=>{
    return(
     <Nav>
            <NavLink to="/signin" className="nav-link">SignIn</NavLink>
            <NavLink to="/signup" className="nav-link">SignUp</NavLink>
          </Nav>
)
  }



  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <NavLink to="/" className="navbar-brand">Admin Dashboard</NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
         {auth.autenticate? renderLoginLinks() : renderNonLoginLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
