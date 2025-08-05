import './Header.css';
import React from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header({ currentUser, setCurrentUser }) {
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
        toast.info("Successfully logged out!");
        navigate('/');
    };
    const toggleLogout = () => {
        setShowLogout(!showLogout);
    };
    return (
        <header className="header fixed-top">
            <nav className='nav-container'>

                <div className='left-section'>
                    <img className='logo' src="/images/tech-img.jpeg" />
                    <Link className='logoName' to="/" >JUST STORE</Link>
                    <Link className='navLink' to="/">Home</Link>
                    <Link className='navLink' to="/about">About</Link>
                    <Link className='navLink' to="/contact">Contact</Link>
                </div>

                <div className='right-section'>
                    {currentUser ? (
                        <div className="user-info" style={{ position: 'relative' }}>
                            <span className='navLink' onClick={toggleLogout}>
                                <FaUser /> {currentUser.name}
                            </span>
                            {showLogout && (
                                <button className="logout-button" onClick={handleLogout} >

                                    Log out
                                </button>
                            )}
                        </div>
                    ) : (
                        <Link className='navLink' to="/login"><FaUser /> Login</Link>
                    )}
                    <Link className='navLink' to="/favorites"><FaHeart className='heart-icon' />Favorites</Link>
                    <Link className='navLink' to="/basket"><FaShoppingCart />Basket</Link>


                    <div className="language-switcher">
                        <img src="/images/us-flag.png" alt="English" title="English" className="flag" />
                        <img src="/images/tr-flag.png" alt="Turkish" title="Türkçe" className="flag" />
                    </div>
                </div>
            </nav>

        </header>
    )
}

export default Header