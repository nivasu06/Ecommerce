// src/components/Navbar.js
import React, { useContext } from 'react';
import { AuthContext } from '../pages/authcontext';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

function Navbar() {
    const { user, setUser } = useContext(AuthContext); // Get user and setUser from AuthContext
    const navigate = useNavigate();

    const handleSignOut = () => {
        // Clear user from context/state
        setUser(null);  // Ensure setUser is defined
        navigate('/signin');  // Redirect to SignIn page after logout
        alert('User logged out successfully!');
    };

    return (
        <nav className='navbar'>
            <div className='navbar-brand'>
                <Link to="/"><span className='navbar-name'>NAVV</span></Link>
            </div>
            <ul className='navbar-links'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/orders">Orders</Link></li> {/* Match path with App.js */}

                {user ? (
                    <li style={{ cursor: 'pointer' }} onClick={handleSignOut} className='navbar-item'>
                        <span className='navbar-text'>Logout</span>
                    </li>
                ) : (
                    <li className='navbar-item'>
                        <Link to="/signin">
                            <span className='navbar-text'>Sign In</span>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
