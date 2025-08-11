import React, { createContext, useState, useEffect } from "react";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children, currentUser }) => {

    const storageKey = currentUser ? `favorites_${currentUser.email}` : null;
    const [favorites, setFavorites] = useState([]);

    //kullaniciya ait fav kismi
    useEffect(() => {
        if (storageKey) {
            const saved = localStorage.getItem(storageKey);
            setFavorites(saved ? JSON.parse(saved) : []);
        }
        else {
            setFavorites([]);
        }
    }, [storageKey]);


    // favorites değistiginde locali guncelle
    useEffect(() => {
        if (storageKey) {
            localStorage.setItem(storageKey, JSON.stringify(favorites));
        }
    }, [favorites, storageKey]);

    const toggleFavorite = (product) => {
        setFavorites((prev) => {
            const isFav = prev.find((item) => item.id === product.id);
            if (isFav) {
                return prev.filter((item) => item.id !== product.id);
            } else {
                return [...prev, product];
            }
        });
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorite, clearFavorites }}>
            {children}
        </FavoriteContext.Provider>
    );
};
