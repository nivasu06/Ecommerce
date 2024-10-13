// src/pages/SignInPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp from '../component/signup';
import SignIn from '../component/login';
import './signIn.css'; 
import { AuthContext } from './authcontext';

const SignInPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); 

  const handleLoginSuccess = (user) => {
    setUser(user);
    navigate('/'); 
    alert('User logged in successfully!');
  };

  const handleRegisterSuccess = () => {
    setIsSignUp(false); 
    alert('User registered successfully! Please log in.');
  };

  return (
    <div className="page-container">
      {isSignUp ? (
        <SignUp onRegisterSuccess={handleRegisterSuccess} />
      ) : (
        <SignIn onLoginSuccess={handleLoginSuccess} />
      )}
      <div className="toggle-link">
        <p>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
