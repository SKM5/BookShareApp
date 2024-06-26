// App.jsx

import React, { useState } from 'react';
import Home from "./home/Home";
import { Route, Routes } from "react-router-dom";
import BookList from "./components/BookLists";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import CartPage from "./components/CartPage"; // Import CartPage component
import Cart from "./components/Cart"; // Import Cart component
import Login from './components/Login';

function App() {
  const [authUser, setAuthUser] = useAuth();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [booksInCart, setBooksInCart] = useState([]);   
  console.log(authUser);
  
  return (
    <>      
      <div className="dark:bg-slate-900 dark:text-white">      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/BookList"
            element={<BookList setBooksInCart={setBooksInCart} setCartItemsCount={setCartItemsCount} />}           
          />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* Define route for CartPage */}
          <Route path="/cart" element={<Cart/>} />                      
        </Routes>       
        <Toaster />
      </div>
    </>
  );
}

export default App;
