// BookList.jsx
import React, { useState } from "react";
import Navbar from "./Navbar";
import Books from "./Books";
import Footer from "./Footer";
import CartPage from "./CartPage";

function BookList({ setBooksInCart }) {
  const [cartCount, setCartCount] = useState(0);  

  const handleAddToCart = (book) => {
    setCartCount(prevCount => prevCount + 1);
    setBooksInCart(prevBooks => [...prevBooks, book]); // Update booksInCart state immutably
  };

  return (
    <>
      <Navbar cartCount={cartCount} />
      <div className="min-h-screen">
        <Books onAddToCart={handleAddToCart} />        
      </div>
      <Footer />
    </>
  );
}

export default BookList;
