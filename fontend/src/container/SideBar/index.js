import React from 'react'
import {NavLink} from 'react-router-dom'
export default function SideBar() {
    return (
        <div className="dropdown sidebar sidebar-md">
        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Dropdown
            <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li className="active"><NavLink to="#" >Action</NavLink></li>
            <li><NavLink to="/" className="navbar-brand">Home</NavLink></li>
            <li><NavLink to="/products" className="navbar-brand">Products</NavLink></li>
            <li><NavLink to="/orders" className="navbar-brand">Orders</NavLink></li>
            <li><NavLink to="/categorys" className="navbar-brand">Categorys</NavLink></li>
            <li><NavLink to="/page" className="navbar-brand">Page</NavLink></li>
        </ul>
    </div>
    )
}
