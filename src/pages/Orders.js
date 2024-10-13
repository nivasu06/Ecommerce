import React, { useContext, useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../pages/authcontext';
import './Orders.css'; // Ensure the correct path

const Orders = () => {
    const { user, loading } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (loading) return; // Wait until loading is complete

            if (!user) return; // If no user, exit early

            try {
                const q = query(collection(db, "orders"), where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);
                const ordersList = querySnapshot.docs.map((doc) => doc.data());
                setOrders(ordersList);
            } catch (error) {
                console.error("Error fetching orders: ", error);
            }
        };

        fetchOrders();
    }, [user, loading]);

    return (
        <div className="order-container">
            <h2>Your Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order, index) => (
                    <div key={index} className="order-details">
                        <h3>Order #{index + 1}</h3>
                        <p>Ordered on: {order.createdAt.toDate().toLocaleString()}</p>
                        <h4>Items:</h4>
                        <ul className="order-items-list">
                            {order.items.map((item) => (
                                <li key={item.id}>
                                    <span className="item-title">{item.title}</span>
                                    <span className="item-quantity">× {item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="billing-summary">
                            Total Price: ₹{order.totalPrice.toFixed(2)}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Orders;
