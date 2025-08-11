import React, { useContext, useState, useEffect } from "react";
import { BasketContext } from "../../Context/BasketContext";
import "./basket.css";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingCart, FaMapMarkerAlt, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import { useTranslation } from "react-i18next";

const Basket = () => {
    const { basket, increaseQuantity, decreaseQuantity, clearBasket, removeFromBasket } = useContext(BasketContext);
    const { t, i18n } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();

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



    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    const steps = [
        { label: t("basket"), icon: <FaShoppingCart /> },
        { label: t("deliveryAddress"), icon: <FaMapMarkerAlt /> },
        { label: t("payment"), icon: <FaCreditCard /> },
        { label: t("confirmation"), icon: <FaCheckCircle /> }
    ];



    return (
        <div className="container mt-5">

            {basket.length > 0 && (
                <div className="basket-steps">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`step ${currentStep === index ? 'active' : ''} ${currentStep > index ? 'completed' : ''}`}
                        >
                            <div className="step-icon">{step.icon}</div>
                            <div className="step-label">{step.label}</div>
                        </div>
                    ))}
                </div>
            )}
            {basket.length === 0 ? (
                <p className="no-basket">{t("emptyCart")}</p>
            ) : (
                <>


                    {currentStep === 0 && (
                        <>
                            {/* <h2 className="basket-title">{t("yourBasket")}</h2> */}
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

                                        <span className="basket-item-price">
                                            {i18n.language === 'tr' ? (item.price * 40).toFixed(2) : item.price} {i18n.language === 'tr' ? '₺' : '$'}
                                        </span>

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
                                <strong>{t("total")} : </strong>
                                {i18n.language === 'tr' ? (calculateTotal() * 40).toFixed(2) : calculateTotal()} {i18n.language === 'tr' ? '₺' : '$'}
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
                                    if (selectedItems.length === 0) {
                                        toast.error(t("pleaseSelectAtLeastOneItem"));
                                        return;
                                    }
                                    setCurrentStep(1);
                                }}>
                                    {t("pay")}
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
            {currentStep === 1 && (
                <div className="delivery-address-form">
                    <h2>{t("deliveryAddress")}</h2>
                    <input type="text" placeholder={t("fullName")} />
                    <input type="text" placeholder={t("address")} />
                    <input type="text" placeholder={t("phone")} />


                    <div className="payment-buttons">
                        <button onClick={() => setCurrentStep(0)}>{t("back")}</button>
                        <button onClick={() => setCurrentStep(2)}>{t("next")}</button>
                    </div></div>

            )}

            {currentStep === 2 && (

                <div className="payment-form">
                    <h2>{t("payment")}</h2>
                    <input type="text" placeholder={t("cardNumber")} value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    <input type="text" placeholder={t("expiryDate")} value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                    <input type="text" placeholder={"cvv"} value={cvv} onChange={(e) => setCvv(e.target.value)} />


                    <div className="payment-buttons">
                        <button onClick={() => setCurrentStep(1)} >{t("back")}</button>
                        <button onClick={() => {
                            if (!cardNumber.trim() || !expiryDate.trim() || !cvv.trim()) {
                                toast.error(t("pleaseFillPaymentInfo"));
                                return;
                            }
                            setCurrentStep(3);
                        }} >{t("next")}</button>
                    </div>
                </div>

            )}

            {currentStep === 3 && (
                <div className="confirmation-step">
                    <div className="confirmation-content">
                        <FaCheckCircle className="check-icon" />
                        <div className="confirmation-text">
                            <h2>{t("orderReceived")}</h2>
                            <button className="checkout-btn" onClick={() => {
                                clearBasket();
                                localStorage.removeItem("selectedItems");
                                navigate("/");
                            }}>
                                {t("backToHome")}
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default Basket;
