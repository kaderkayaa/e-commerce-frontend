import React, { useContext } from "react";
import { FavoriteContext } from "../../Context/FavoriteContext";
import { BasketContext } from "../../Context/BasketContext";
import { FaHeart } from "react-icons/fa";
import "./favorites.css";
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

const Favorites = () => {
    const { favorites, toggleFavorite, clearFavorites } = useContext(FavoriteContext);
    const { addToBasket } = useContext(BasketContext);
    const { t } = useTranslation();

    const handleAddToBasket = (product) => {
        addToBasket(product);
        toast.success(t("productAddedToBasket"));
    };

    const handleToggleFavorite = (product) => {
        toggleFavorite(product);
        toast.error(t("removedFromFavorites"));
    };

    const handleClearAll = () => {
        clearFavorites();
        toast.success(t("allFavoritesCleared"));
    };


    if (favorites.length === 0) {
        return (
            <div style={{ textAlign: "center", marginTop: "150px" }}>
                <p className="no-favori">{t("favoritesEmpty")}.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="favorites-title">{t("yourFavorites")}</div>
            <div className="favorites-container">
                {favorites.map((product) => (
                    <div key={product.id} className="favorite-product-card">
                        <FaHeart
                            className="favorite-icon"
                            color="#ff0000"
                            onClick={() => handleToggleFavorite(product)}
                            style={{ cursor: "pointer", position: "absolute", top: "10px", right: "10px" }}
                            title="Favorilerden çıkar"

                        />
                        <img src={product.image} alt={product.title} />
                        <h4>{product.title}</h4>
                        <p>{product.price} $</p>
                        <button
                            className="add-button"
                            onClick={() => handleAddToBasket(product)}
                        >
                            {t("addToCart")}
                        </button>
                    </div>
                ))}
            </div>
            <div style={{ textAlign: "center", margin: "20px 0" }}>
                <button className="clear-all-btn" onClick={handleClearAll}>
                    {t("clearAll")}
                </button>
            </div>
        </div>
    );
};

export default Favorites;
