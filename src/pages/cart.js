import React, { useContext } from "react";
import './cart.css';
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { CartContext } from "./carcontext";
import { AuthContext } from "../pages/authcontext"; // Import AuthContext
import { db } from "../firebase"; // Ensure the correct path and filename

const Cart = () => {
    const { cartItems, incrementQuant, decrementQuantity, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext); // Get user from AuthContext
    const navigate = useNavigate(); // Initialize the navigate hook

    // Calculate total cost
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handlePlaceOrder = async () => {
        if (cartItems.length === 0 || !user) return;

        const orderData = {
            userId: user.uid, // Add user ID to the order data
            items: cartItems,
            totalPrice,
            createdAt: new Date(),
        };

        try {
            // Add the order data to the Firestore 'orders' collection
            await addDoc(collection(db, "orders"), orderData);
            alert("Order placed successfully!");
            clearCart(); // Clear the cart after placing the order
            navigate("/Orders"); // Redirect to the order page
        } catch (error) {
            console.error("Error placing order: ", error);
            alert("Failed to place order. Please try again.");
        }
    };

    return (
        <div className="cart-container">
            <div className="cart-items">
                <h2>YOUR CART</h2>
                {cartItems.length === 0 ? (
                    <p>Your Cart is empty.</p>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.title}</h3>
                                <p>₹{item.price.toFixed(2)}</p>
                                <div className="cart-item-quantity">
                                    <button onClick={() => decrementQuantity(item.id)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => incrementQuant(item.id)}>+</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {cartItems.length > 0 && (
                <div className="cart-sidebar">
                    <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
                    <button className="purchase-btn" onClick={handlePlaceOrder}>Place Order</button>
                    <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
