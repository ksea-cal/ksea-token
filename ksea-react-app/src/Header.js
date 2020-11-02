import React from "react"
import "./Header.css"

function Header(){
    return (
        <nav className="header">
        {/* KSEA logo on the left -> img*/}
        <img
            className="header__logo" 
            src="https://picsum.photos/id/237/200/300"
            alt=""/>
        {/* Search box */}
        <input type="text" className="header__searchInput"/>
        {/* 3 Links */} 
        {/* Basket icon */}
        </nav>
    );
}

export default Header
