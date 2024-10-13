import React, { useState, useEffect } from "react";
import './filter.css';

const Filter = ({ priceRange, categories, onFilterChange }) => {
    const [localPriceRange, setLocalPriceRange] = useState(priceRange);
    const [localCategories, setLocalCategories] = useState(categories);

    useEffect(() => {
        setLocalPriceRange(priceRange);
    }, [priceRange]);

    useEffect(() => {
        setLocalCategories(categories);
    }, [categories]);

    const handlePriceChange = (e) => {
        const newPriceRange = [0, Number(e.target.value)];
        setLocalPriceRange(newPriceRange);
        onFilterChange(newPriceRange, localCategories);
    };

    const handleCategoryChange = (e) => {
        const updatedCategories = {
            ...localCategories,
            [e.target.name]: e.target.checked,
        };
        setLocalCategories(updatedCategories);
        onFilterChange(localPriceRange, updatedCategories);
    };

    return (
        <div className="filter-container">
            <h2>Filter</h2>
            <div className="filter-price-section">
                <label htmlFor="price-range">Price Range:</label>
                <input
                    type="range"
                    id="price-range"
                    min="0"
                    max="100000"
                    value={localPriceRange[1]}
                    onChange={handlePriceChange}
                />
                <span>{`0 - ${localPriceRange[1].toLocaleString()}`}</span>
            </div>
            <div className="filter-categories-section">
                <h3>Categories</h3>
                <label>
                    <input
                        type="checkbox"
                        name="menClothing"
                        checked={localCategories.menClothing}
                        onChange={handleCategoryChange}
                    />
                    Men Clothing
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="womenClothing"
                        checked={localCategories.womenClothing}
                        onChange={handleCategoryChange}
                    />
                    Women Clothing
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="electronics"
                        checked={localCategories.electronics}
                        onChange={handleCategoryChange}
                    />
                    Electronics
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="jewelry"
                        checked={localCategories.jewelry}
                        onChange={handleCategoryChange}
                    />
                    Jewelry
                </label>
            </div>
        </div>
    );
};

export default Filter;
