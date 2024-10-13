import React, { useState } from "react";
import SearchBar from "../component/searchbar";
import Filter from "../component/filter";
import ProductList from "../component/productlist";
import "./home.css";

const Home = () => {
    const [priceRange, setPriceRange] = useState([0, 1000000]);
    const [categories, setCategories] = useState({
        menClothing: false,
        womenClothing: false,
        electronics: false,
        jewelry: false,
    });

    const handleSearch = (query) => {
        console.log('Search Query:', query);
    };

    const handleFilterChange = (newPriceRange, newCategories) => {
        setPriceRange(newPriceRange);
        setCategories(newCategories);
    };

    return (
        <div className="home">
            <div className="search-bar-container">
                <div className="search-bar">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
            <div className="home-content">
                <Filter 
                    priceRange={priceRange}
                    categories={categories}
                    onFilterChange={handleFilterChange} 
                />
                <div className="other-content">
                    <h2>Featured Products</h2>
                    <ProductList
                        priceRange={priceRange}
                        categories={categories}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
