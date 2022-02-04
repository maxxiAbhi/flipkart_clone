import React, { useEffect, useState } from 'react';
import './style.css';
import Logo from '../../../assets/images/flipkart_logo.png';
import goldenStar from '../../../assets/images/flipcart_plus.png';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux'
// import TextField from '@material-ui/core/TextField';
import { Modal, MaterialInput, MaterialButton, DropdownMenu } from '../../MaterialUi/';
import login, { register, signOut } from '../../../actions/auth';
import {Link} from 'react-router-dom'

const MainHeader = (props) => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [signup, setSignup] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [user, setUser] = useState({ username: '', password: '' })
    const [signupUser, setSignupUser] = useState({ firstName:'',lastName:'',signusername:'',email:'',phone:'',newpassword:'',repassword:'' })


    //handel loin input

    let name, value;
    const handelInputs = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
       
    }

    const handelSignUpInputs=(e)=>{
        console.log(e.target)
        name = e.target.name
        value = e.target.value
        setSignupUser({ ...signupUser, [name]: value }) 
    }
   
    
    const userLogin =async (e) => {
        e.preventDefault();
        const result=await dispatch(login(user))
        console.log('prove')
        console.log(result)
        if(result){
            setUser({ username: '', password: '' })
            setLoginModal(false)
            alert("Login Sucessfull")
        }
    }

   
    const userSignup=(e)=>{
        e.preventDefault();
        const result=dispatch(register(signupUser))
         console.log("for reg test page")
    console.log(auth.isregister)
    if(result){
        setSignupUser({ firstName:'',lastName:'',signusername:'',email:'',phone:'',newpassword:'',repassword:'' })
        setSignup(false)
        alert("Register Sucessfull")
    }
    }


    const logout = (e) => {
        alert('hi')
        dispatch(signOut());
    };

    const renderLoggedInMenu = () => {
        return (
            <DropdownMenu
                menu={<a className="fullName">{auth.user.firstName}</a>}
                menus={[
                    { label: "My Profile", href: "", icon: null },
                    { label: "SuperCoin Zone", href: "", icon: null },
                    { label: "Flipkart Plus Zone", href: "", icon: null },
                    {
                        label: "Orders",
                        href: `/account/orders`,
                        icon: null,
                    },
                    { label: "Wishlist", href: "", icon: null },
                    { label: "My Chats", href: "", icon: null },
                    { label: "Coupons", href: "", icon: null },
                    { label: "Rewards", href: "", icon: null },
                    { label: "Notifications", href: "", icon: null },
                    { label: "Gift Cards", href: "", icon: null },
                    { label: "Logout", icon: null, onClick: logout },
                ]}
            />
        );
    };


    const renderNonLoggedInMenu = () => {
        return (
            <DropdownMenu
                menu={
                    <a className="loginButton" onClick={() => { setLoginModal(true) }}>Login</a>
                }
                menus={[
                    { label: "My Profile", href: "", icon: null },
                    { label: "Flipkart Plus Zone", href: "", icon: null },
                    {
                        label: "Orders",
                        href: `/account/orders`,
                        icon: null,
                        onClick: () => {
                            !auth.authenticate && setLoginModal(true);
                        },
                    },
                    { label: "Wishlist", href: "", icon: null },
                    { label: "Rewards", href: "", icon: null },
                    { label: "Gift Cards", href: "", icon: null },
                ]}
                firstMenu={
                    <div className="firstmenu">
                        <span>New Customer?</span>
                        <a
                            style={{ color: "#2874f0" }} onClick={() => { setSignup(true); }} >
                            Sign Up
                        </a>
                    </div>
                }
            />
        );
    }

    return (
        <div className="header">
            <Modal
                visible={loginModal}
                onClose={() => setLoginModal(false)}
            >
                <div className="authContainer">
                    <div className="row">
                        <div className="leftspace">
                            <h2>Login</h2>
                            <p>Get access to your Orders, Wishlist and Recommendations</p>
                        </div>
                        <div className="rightspace">


                            <form onSubmit={userLogin}>
                            {auth.message.length>0?<p style={{color:'red'}}>{auth.message}</p>:null}
                                <MaterialInput
                                    type="text"
                                    label="Enter Email/Enter Mobile Number"
                                    value={user.username}
                                    onChange={handelInputs}
                                    name="username"
                                />

                                <MaterialInput
                                    name="password"
                                    type="password"
                                    label="Enter Password"
                                    value={user.password}
                                    onChange={handelInputs}
                                    rightElement={<a href="#">Forgot?</a>}
                                />

                                <MaterialButton title="Login" bgColor="#fb641b" textColor="#ffffff" type="submit" />
                            </form>



                        </div>
                    </div>
                </div>
            </Modal>



            <Modal
                visible={signup}
                onClose={() => setSignup(false)}
            >
                <div className="authContainer">
                    <div className="row">
                        <div className="leftspace">
                            <h2>Signup</h2>
                            <p>Get access to your Orders, Wishlist and Recommendations</p>
                        </div>
                        <div className="rightspace">
                        {!auth.isregister?<p style={{color:'red'}}>{auth.message}</p>:null}
                            <form onSubmit={userSignup}>

                                <MaterialInput
                                    type="text"
                                    name="firstName"
                                    label="Enter First Name"
                                    value={signupUser.firstName}
                                    onChange={handelSignUpInputs}
                                    
                                />
                                <MaterialInput
                                    type="text"
                                    label="Enter Last Name"
                                    value={signupUser.lastName}
                                    onChange={handelSignUpInputs}
                                    name="lastName"
                                />
                                <MaterialInput
                                    type="text"
                                    label="Enter Username"
                                    value={signupUser.signusername}
                                    onChange={handelSignUpInputs}
                                    name="signusername"
                                />
                                <MaterialInput
                                    type="email"
                                    label="Enter Email"
                                    value={signupUser.email}
                                    onChange={handelSignUpInputs}
                                    name="email"
                                />

                                <MaterialInput
                                    type="tel"
                                    label="Enter Phone Number"
                                    value={signupUser.phone}
                                    onChange={handelSignUpInputs}
                                    name="phone"
                                />

                                <MaterialInput
                                    name="newpassword"
                                    type="password"
                                    label="Enter Password"
                                    value={signupUser.newpassword}
                                    onChange={handelSignUpInputs}
                                />

                                <MaterialInput
                                    name="repassword"
                                    type="password"
                                    label="Conferm Password"
                                    value={signupUser.repassword}
                                    onChange={handelSignUpInputs}
                                />

                                <MaterialButton title="Login" bgColor="#fb641b" textColor="#ffffff" type="submit" />
                            </form>



                        </div>
                    </div>
                </div>
            </Modal>






            <div className="subHeader">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} className="logoimage" alt="" />
                    </Link>
                    <a style={{ marginTop: '-10px' }}>
                        <span className="exploreText">Explore</span>
                        <span className="plusText">Plus</span>
                        <img src={goldenStar} className="goldenStar" alt="" />
                    </a>
                </div>
                <div style={{
                    padding: '0 10px'
                }}>
                    <div className="searchInputContainer">
                        <input
                            className="searchInput"
                            placeholder={'search for products, brands and more'}
                        />
                        <div className="searchIconContainer">
                            <IoIosSearch style={{
                                color: '#2874f0'
                            }} />
                        </div>

                    </div>
                </div>
                <div className="rightMenu">
                    {auth.autenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
                    <DropdownMenu
                        menu={
                            <a className="more">
                                <span>More</span>
                                <IoIosArrowDown />
                            </a>
                        }
                        menus={[
                            { label: 'Notification Preference', href: '', icon: null },
                            { label: 'Sell on flipkart', href: '', icon: null },
                            { label: '24x7 Customer Care', href: '', icon: null },
                            { label: 'Advertise', href: '', icon: null },
                            { label: 'Download App', href: '', icon: null }
                        ]}
                    />
                    <div>
                        <Link className="cart" to="/cart" >
                            <IoIosCart />
                            <span style={{ margin: '0 10px' }}>Cart</span>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default MainHeader