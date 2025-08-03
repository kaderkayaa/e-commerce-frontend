import { useState } from 'react'
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

function App() {


  return (

    <ProductProvider>
      <BasketProvider>
        <FavoriteProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </FavoriteProvider>
      </BasketProvider>
    </ProductProvider>

  )
}

export default App
