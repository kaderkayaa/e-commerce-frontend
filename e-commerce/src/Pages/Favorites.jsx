import React, { useContext } from "react";
import { FavoriteContext } from "../Context/FavoriteContext";
import { BasketContext } from "../Context/BasketContext";
import { FaHeart } from "react-icons/fa";
import "./favorites.css";
import { toast } from 'react-toastify';

const Favorites = () => {
    const { favorites, toggleFavorite } = useContext(FavoriteContext);
    const { addToBasket } = useContext(BasketContext);

    const handleAddToBasket = (product) => {
        addToBasket(product);
        toast.success("Product added to basket.");
    };

    const handleToggleFavorite = (product) => {
        toggleFavorite(product);
        toast.error("Removed from favorites.");
    };


    if (favorites.length === 0) {
        return (
            <div style={{ textAlign: "center", marginTop: "150px" }}>
                <p className="no-favori">Your favorites is empty.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="favorites-title">Your Favorites</div>
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
                            Add To Card
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
