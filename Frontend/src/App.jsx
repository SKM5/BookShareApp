import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import BookList from "./components/BookLists";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/BookList" element={<BookList />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
