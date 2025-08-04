import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // İsteğe bağlı stil

function Login({ setCurrentUser }) {
    const [isRegistering, setIsRegistering] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const userData = { name, email, password };
        localStorage.setItem('user', JSON.stringify(userData));
        alert("Kayıt başarılı! Giriş yapabilirsiniz.");
        setIsRegistering(false);
        setName('');
        setPassword('');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) return alert("Kayıt bulunamadı.");

        if (storedUser.email === email && storedUser.password === password) {
            localStorage.setItem("currentUser", JSON.stringify(storedUser));
            setCurrentUser(storedUser);
            navigate('/');
        } else {
            alert("Email veya şifre hatalı.");
        }
    };

    return (
        <div className="login-container">
            {isRegistering ? (
                <form onSubmit={handleRegister}>
                    <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Sign Up</button>
                    <p>Do you already have an account? <span onClick={() => setIsRegistering(false)} style={{ color: 'blue', cursor: 'pointer' }}>Sign In</span></p>
                </form>
            ) : (
                <form onSubmit={handleLogin}>
                    <h2 style={{ textAlign: 'center' }}>Sign In</h2>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Sign In</button>
                    <p>Don't you have an account? <span onClick={() => setIsRegistering(true)} style={{ color: 'blue', cursor: 'pointer' }}>Sign Up</span></p>
                </form>
            )
            }
        </div >
    );
}

export default Login;
