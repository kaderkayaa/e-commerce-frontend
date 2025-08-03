import React, { createContext, useState, useEffect } from "react";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {

    const [basket, setBasket] = useState(() => {
        const saved = localStorage.getItem("basket");
        return saved ? JSON.parse(saved) : [];
    });

    //yenilenince secilenler silinmesin diye locals kismi 
    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket));
    }, [basket]);




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
