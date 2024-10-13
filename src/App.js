import React from "react";
import Navbar from "./component/navbar";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Orders from "./pages/Orders";  // Ensure this path is correct
import SignIn from "./pages/signIn";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './pages/authcontext'; // Import AuthProvider

function App() {
  return (
    <AuthProvider>  {/* Wrap your app with AuthProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
