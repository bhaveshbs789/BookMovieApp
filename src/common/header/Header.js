import React from "react";
import './Header.css';
import logo from '../../assets/logo.svg';

function Header () {
    return (
        <div className="header">
            <img src={logo}></img>
            <h3>Movie Header</h3>
        </div>
    )
}

export default Header;