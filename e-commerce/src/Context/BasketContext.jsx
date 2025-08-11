import React, { createContext, useState, useEffect } from "react";

export const BasketContext = createContext();

export const BasketProvider = ({ children, currentUser }) => {
    const storageKey = currentUser ? `basket_${currentUser.email}` : null;
    const [basket, setBasket] = useState([]);

    //kullaniciya ait sepet 
    useEffect(() => {
        if (storageKey) {
            const saved = localStorage.getItem(storageKey);
            setBasket(saved ? JSON.parse(saved) : []);
        }
        else {
            setBasket([]);
        }
    }, [storageKey]);




    //yenilenince secilenler silinmesin diye locals kismi 
    useEffect(() => {
        if (storageKey) {
            localStorage.setItem(storageKey, JSON.stringify(basket));
        }
    }, [basket, storageKey]);




    const addToBasket = (product) => {
        setBasket((prevBasket) => {
            const existing = prevBasket.find((item) => item.id === product.id);
            if (existing) {
                return prevBasket.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevBasket, { ...product, quantity: 1 }];
            }
        });
    };



    const removeFromBasket = (id) => {
        setBasket((prev) => prev.filter((item) => item.id !== id));
    };


    const increaseQuantity = (id) => {
        setBasket((prevBasket) =>
            prevBasket.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };
    const decreaseQuantity = (id) => {
        setBasket((prevBasket) =>
            prevBasket.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };


    const clearBasket = () => {
        setBasket([]);
    };







    return (
        <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, increaseQuantity, decreaseQuantity, clearBasket }}>
            {children}
        </BasketContext.Provider>
    );
};
