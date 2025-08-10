import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';


function Login({ setCurrentUser }) {
    const { t } = useTranslation();

    const [isRegistering, setIsRegistering] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const userData = { name, email, password };
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success(t("registrationSuccess"));
        setIsRegistering(false);
        setName('');
        setPassword('');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) return toast.error(t("userNotFound"));

        if (storedUser.email === email && storedUser.password === password) {
            localStorage.setItem("currentUser", JSON.stringify(storedUser));
            setCurrentUser(storedUser);
            navigate('/');
            toast.success(t("loginSuccess"));
        } else {
            toast.error(t("emailOrPasswordIncorrect"));
        }
    };

    return (
        <div className="login-container">
            {isRegistering ? (
                <form onSubmit={handleRegister}>
                    <h2 style={{ textAlign: 'center' }}>{t("signUp")}</h2>
                    <input type="text" placeholder={t("name")} value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder={t("email")} value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder={t("password")} value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">{t("signUp")}</button>
                    <p>{t("alreadyHaveAccount")}<span onClick={() => setIsRegistering(false)} style={{ color: 'blue', cursor: 'pointer' }}>{t("signIn")}</span></p>
                </form>
            ) : (
                <form onSubmit={handleLogin}>
                    <h2 style={{ textAlign: 'center' }}>{t("signIn")}</h2>
                    <input type="email" placeholder={t("email")} value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder={t("password")} value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">{t("signIn")}</button>
                    <p>{t("dontHaveAccount")} <span onClick={() => setIsRegistering(true)} style={{ color: 'blue', cursor: 'pointer' }}>{t("signUp")}</span></p>
                </form>
            )
            }
        </div >
    );
}

export default Login;
