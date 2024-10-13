// src/pages/authcontext.js
import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { app } from '../firebase'; // Ensure you import your Firebase app configuration

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);

    useEffect(() => {
        // Set up an auth state observer
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Handle redirect results (e.g., after a sign-in redirect)
        const handleRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result.user) {
                    setUser(result.user);
                }
            } catch (error) {
                console.error("Error during sign-in redirect:", error);
            }
        };

        handleRedirectResult();

        // Clean up the observer on unmount
        return () => unsubscribe();
    }, [auth]);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
