import React from "react";
import Navbar from "./Navbar";
import Books from "./Books";
import Footer from "./Footer";
function BookList() {
  return (
    <>
      <Navbar />
      <div className=" min-h-screen">
        <Books />
      </div>
      <Footer />
    </>
  );
}

export default BookList;
