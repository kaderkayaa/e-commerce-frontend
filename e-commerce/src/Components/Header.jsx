import './Header.css';
import React from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';


function Header() {
    return (
        <header className="header fixed-top">
            <nav className='nav-container'>

                <div className='left-section'>
                    <img className='logo' src="/images/tech-img.jpeg" />
                    <Link to="/" className='logoName'>TECH STORE</Link>
                    <Link className='navLink' to="/">Home</Link>
                    <Link className='navLink' to="/">About</Link>
                    <Link className='navLink' to="/">Contact</Link>
                </div>

                <div className='right-section'>
                    <Link className='navLink' to="/login"><FaUser /> Login</Link>
                    <Link className='navLink' to="/favorites"><FaHeart className='heart-icon' />Favorites</Link>
                    <Link className='navLink' to="/basket"><FaShoppingCart />Basket</Link>

                    {/* Dil değiştirme bayrakları */}
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