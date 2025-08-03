import React, { useContext } from "react";
import { FavoriteContext } from "../Context/FavoriteContext";
import { BasketContext } from "../Context/BasketContext";
import { FaHeart } from "react-icons/fa";
import "./favorites.css";

const Favorites = () => {
    const { favorites, toggleFavorite } = useContext(FavoriteContext);
    const { addToBasket } = useContext(BasketContext);

    if (favorites.length === 0) {
        return (
            <div style={{ textAlign: "center", marginTop: "150px" }}>
                <p className="no-favori">There are no products in your favorites yet.</p>
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
                            onClick={() => toggleFavorite(product)}
                            style={{ cursor: "pointer", position: "absolute", top: "10px", right: "10px" }}
                            title="Favorilerden çıkar"
                        />
                        <img src={product.image} alt={product.title} />
                        <h4>{product.title}</h4>
                        <p>{product.price} $</p>
                        <button
                            className="add-button"
                            onClick={() => addToBasket(product)}
                        >
                            Sepete Ekle
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
