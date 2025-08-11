import { useState, useEffect } from 'react'
import './App.css'
import './i18n';
import Header from './Components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login/Login.jsx';
import Favorites from './Pages/Favorite/Favorites.jsx';
import Basket from './Pages/Basket/Basket.jsx';
import NotFound from './pages/NotFound';
import { ProductProvider } from "./Context/ProductContext";
import { BasketProvider } from './Context/BasketContext';
import { FavoriteProvider } from "./Context/FavoriteContext.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Components/Footer';

function App() {
  //kullanici login icin
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setCurrentUser(storedUser);
  }, []);

  return (

    <ProductProvider>
      <BasketProvider currentUser={currentUser}>
        <FavoriteProvider currentUser={currentUser}>
          <div className="app-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
            <div className="app-content" style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} className="toast-container" />
          </div>
        </FavoriteProvider>
      </BasketProvider>
    </ProductProvider>

  )
}

export default App
