import React, { useState } from "react";
import './searchbar.css';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar-container">
            <input 
                type="text" 
                value={query} 
                onChange={handleChange} 
                placeholder="Search..." 
                className="search-bar-input"
            />
            <button type='submit' className='search-bar-button'>
                Search
            </button>
        </form>
    );
}

export default SearchBar;
