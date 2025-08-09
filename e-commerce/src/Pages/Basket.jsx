import React, { useContext, useState, useEffect } from "react";
import { BasketContext } from "../Context/BasketContext";
import "./basket.css";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';
import { useTranslation } from "react-i18next";

const Basket = () => {
    const { basket, increaseQuantity, decreaseQuantity, clearBasket, removeFromBasket } = useContext(BasketContext);
    const { t } = useTranslation();

    const [selectedItems, setSelectedItems] = useState(() => {
        const savedSelections = localStorage.getItem("selectedItems");
        return savedSelections ? JSON.parse(savedSelections) : [];
    });

    useEffect(() => {
        localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    }, [selectedItems]);


    const handleSelect = (id) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((itemId) => itemId !== id)
                : [...prevSelected, id]
        );
    };

    const calculateTotal = () => {
        return basket
            .filter((item) => selectedItems.includes(item.id))
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2);
    };

    return (
        <div className="container mt-5">

            {basket.length === 0 ? (
                <p className="no-basket">{t("emptyCart")}</p>
            ) : (
                <>
                    <h2 className="basket-title">{t("yourBasket")}</h2>
                    <ul className="basket-list">
                        {basket.map((item, index) => (
                            <li key={index} className="basket-item">
                                <Checkbox
                                    size="small"
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() => handleSelect(item.id)}
                                    sx={{
                                        color: "#2e445aff",
                                        '&.Mui-checked': {
                                            color: "#343a40",
                                        },
                                        transform: "scale(1.3)",
                                    }}
                                />
                                <img src={item.image} alt={item.title} className="basket-item-img" />
                                <span className="basket-item-title">{item.title}</span>

                                <div className="basket-item-quantity">
                                    <button className="qty-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
                                    <span className="qty-count">{item.quantity}</span>
                                    <button className="qty-btn" onClick={() => increaseQuantity(item.id)}>+</button>
                                </div>

                                <span className="basket-item-price">{item.price} $</span>

                                <button className="basket-delete-btn"
                                    onClick={() => {
                                        removeFromBasket(item.id);
                                        toast.error(t("productRemoved"))
                                    }}>
                                    <FaTrash size={18} />
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="basket-total">
                        <strong>{t("total")} : </strong> {calculateTotal()} $
                    </div>

                    <div className="button-div">
                        <button className="basket-clear" onClick={() => {
                            clearBasket();
                            toast.error(t("basketCleared"));
                        }}>
                            {t("clearAll")}
                        </button>

                        <Link to="/" className="continue-shopping-btn">
                            {t("continueShopping")}
                        </Link>

                        <button className="checkout-btn" onClick={() => {
                        }}>
                            {t("pay")}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Basket;
