import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";
import { BasketContext } from "../Context/BasketContext";
import { FavoriteContext } from "../Context/FavoriteContext";
import { FaHeart } from "react-icons/fa";
import "../Components/ProductCard.css";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";


const Home = () => {
    const { product, loading } = useContext(ProductContext);
    const { addToBasket } = useContext(BasketContext);
    const { favorites, toggleFavorite } = useContext(FavoriteContext);

    const { t, i18n } = useTranslation();

    const [searchText, setSearchText] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        let filtered = product;
        // isim icin filtre
        if (searchText.trim() !== "") {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        // fiyat icin filtre
        if (minPrice !== "") {
            filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
        }
        if (maxPrice !== "") {
            filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
        }
        setFilteredProducts(filtered);
    }, [searchText, minPrice, maxPrice, product]);

    if (loading) {
        return <p style={{ textAlign: "center" }}>{t("loadingProducts")}</p>;
    }


    const isFavorite = (id) => favorites.some((item) => item.id === id);

    return (
        <div className="container mt-5" >
            <div className="row">
                {/* anasayfadaki filtreleme kismi burada*/}
                <div className="col-2 filter-container">
                    <h5 style={{ color: "black", textAlign: "center" }}>{t("filter")}</h5>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder={t("search")}
                        />
                    </div>
                    <div className="mb-3">

                        <input
                            type="number"
                            className="form-control"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="Min"
                        />
                    </div>
                    <div className="mb-3">

                        <input
                            type="number"
                            className="form-control"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="Max"
                        />
                    </div>

                    <div className="reset-wrapper">
                        <button className="button-reset"
                            onClick={() => {
                                setSearchText("");
                                setMinPrice("");
                                setMaxPrice("");
                            }}>
                            {t("reset")}
                        </button>
                    </div>


                </div>

                {/* urun card kismi burada */}
                <div className="col-10 product-container d-flex flex-wrap gap-3">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="product-card">
                                <FaHeart
                                    className="favorite-icon"
                                    color={isFavorite(product.id) ? "#ff0000" : "#c6c6c6ff"}
                                    onClick={() => {
                                        toggleFavorite(product);
                                        const isFav = favorites.some(item => item.id === product.id);
                                        if (isFav) {
                                            toast.error(t("removedFromFavorites"));
                                        } else {
                                            toast.success(t("addedToFavorites"));
                                        }
                                    }}
                                />
                                <img src={product.image} alt={product.title} />
                                <h4>{product.title}</h4>
                                <p className="price-p">
                                    {i18n.language === 'tr' ? (product.price * 40).toFixed(2) : product.price} {i18n.language === 'tr' ? '₺' : '$'}
                                </p>
                                <button className="add-button"
                                    onClick={() => {
                                        addToBasket(product);
                                        toast.success(t("productAddedToBasket"));
                                    }}>
                                    {t("addToCart")}
                                </button>
                            </div>
                        ))
                    ) : (
                        // <p>No product suitable for the filter was found.</p>
                        <p>{t("noProductFound")}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
