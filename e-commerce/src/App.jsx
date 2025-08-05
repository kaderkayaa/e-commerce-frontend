import { useState, useEffect } from 'react'
import './App.css'
import Header from './Components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Favorites from './Pages/Favorites';
import Basket from './Pages/Basket';
import NotFound from './pages/NotFound';
import { ProductProvider } from "./Context/ProductContext";
import { BasketProvider } from './Context/BasketContext';
import { FavoriteProvider } from "./Context/FavoriteContext.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  //kullanici login icin
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setCurrentUser(storedUser);
  }, []);

  return (

    <ProductProvider>
      <BasketProvider>
        <FavoriteProvider>
          <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} className="toast-container" />
        </FavoriteProvider>
      </BasketProvider>
    </ProductProvider>

  )
}

export default App
