import React, { useState, useContext } from 'react';
import { CartContext } from '../pages/carcontext';
import './productcard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const [isAdded, setIsAdded] = useState(false);  // State to track if item is added

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);  // Change the button text after adding to cart
    };

    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-details">
                <h3 className="product-name">{product.title}</h3>
                <p className="product-price">₹{product.price.toFixed(2)}</p> {/* Display price in INR */}
                {/* <p className="product-description">{product.description}</p> */}
                <button 
                    className={`add-to-cart-btn ${isAdded ? 'added' : ''}`} 
                    onClick={handleAddToCart}
                    disabled={isAdded}  // Disable the button after adding
                >
                    {isAdded ? 'Added to Cart' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
