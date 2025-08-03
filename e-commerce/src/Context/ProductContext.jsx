import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);


    //api den verileri cekecegim kisim
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Veri cekme kisminda hata var : ", error);
                setLoading(false);
            });
    }, []);


    return (
        <ProductContext.Provider value={{ product, loading }}>
            {children}
        </ProductContext.Provider>
    );
};








