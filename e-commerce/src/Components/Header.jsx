import './Header.css';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';



function Header({ currentUser, setCurrentUser }) {
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
        toast.info(t("logoutBtn"));
        navigate('/');
    };
    const toggleLogout = () => {
        setShowLogout(!showLogout);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    return (
        <header className="header fixed-top">
            <nav className='nav-container'>

                <div className='left-section'>
                    <img className='logo' src="/images/tech-img.jpeg" />
                    <Link className='logoName' to="/" >JUST STORE</Link>
                    <Link className='navLink' to="/">{t("home")}</Link>
                    <Link className='navLink' to="/about">{t("about")}</Link>
                    <Link className='navLink' to="/contact">{t("contact")}</Link>
                </div>

                <div className='right-section'>
                    {currentUser ? (
                        <div className="user-info" style={{ position: 'relative' }}>
                            <span className='navLink' onClick={toggleLogout}>
                                <FaUser /> {currentUser.name}
                            </span>
                            {showLogout && (
                                <button className="logout-button" onClick={handleLogout} >
                                    {t("logout")}
                                </button>
                            )}
                        </div>
                    ) : (
                        <Link className='navLink' to="/login"><FaUser /> {t("login")}</Link>
                    )}
                    <Link className='navLink' to="/favorites"><FaHeart className='heart-icon' />{t("favorites")}</Link>
                    <Link className='navLink' to="/basket"><FaShoppingCart />{t("basket")}</Link>


                    <div className="language-switcher">
                        <img
                            src="/images/us-flag.png"
                            alt="English"
                            title="English"
                            className="flag"
                            onClick={() => changeLanguage("en")}
                            style={{ cursor: "pointer" }}
                        />
                        <img
                            src="/images/tr-flag.png"
                            alt="Turkish"
                            title="Türkçe"
                            className="flag"
                            onClick={() => changeLanguage("tr")}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                </div>
            </nav>

        </header>
    )
}

export default Header