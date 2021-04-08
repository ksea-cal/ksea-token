import React from 'react';
import { Link } from "react-router-dom";
import logo from '../logo.png';
import './header.css';

function Header(props) {
    return (
        <div className='header'>
            <Link to='/'>
            <img 
                className="header_logo" 
                src={logo}
            />
            </Link>
      
            {/* navigation */}
            <div className="header_nav">
                <Link to='/'>
                <div className='header_option'>
                    <h2>Home</h2>
                </div>
                </Link>

                <Link to='/auction'>
                <div className='header_option'>
                    <h2>Auction</h2>
                </div>
                </Link>

                <Link to='/officer'>
                <div className='header_option'>
                    <h2>Officer</h2>
                </div>
                </Link>

                <Link to='/checkin'>
                <div className='header_option'>
                    <h2>Check In</h2>
                </div>
                </Link>
                
                <div className='header_optionSignin'>
                    <h4>Signed in as: {props.account}</h4>
                </div>
            </div>
        </div>
    )
}

export default Header
