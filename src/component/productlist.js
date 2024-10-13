import React, { useState, useEffect } from "react";
import "./productlist.css";
import ProductCard from "./productcard";

const USD_TO_INR_RATE = 83; // Exchange rate from USD to INR

const ProductList = ({ priceRange, categories }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [remainingProducts, setRemainingProducts] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                // Convert prices to INR and update the products state
                const updatedProducts = data.map(product => ({
                    ...product,
                    price: product.price * USD_TO_INR_RATE
                }));
                setProducts(updatedProducts);
                setFilteredProducts(updatedProducts); // Set initial state to all products
                setRemainingProducts(updatedProducts);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        // Filter products based on priceRange and categories
        const filtered = products.filter(product => {
            const withinPriceRange = priceRange[1] === 1000000 || (product.price >= priceRange[0] && product.price <= priceRange[1]);
            const inSelectedCategory = !Object.values(categories).includes(true) || categories[product.category] || false;
            return withinPriceRange && inSelectedCategory;
        });

        // Update state for filtered and remaining products
        setFilteredProducts(filtered);
        setRemainingProducts(products.filter(product => !filtered.includes(product)));
    }, [priceRange, categories, products]);

    return (
        <div className="product-list">
            <div className="filtered-products-section">
                {filteredProducts.length > 0 && (
                    <>
                        <h3>Filtered Products</h3>
                        <div className="filtered-products">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="all-products-section">
                <h3>All Products</h3>
                <div className="remaining-products">
                    {remainingProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
