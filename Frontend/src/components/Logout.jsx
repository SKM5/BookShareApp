import React, {useState} from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const handleLogout = async () => {
    try {
      await removeAllItemsfromCart(authUser._id);
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("Users");
      toast.success("Logout successfully");
      
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error("Error: " + error);
      setTimeout(() => {}, 2000);
    }
  };

  const removeAllItemsfromCart = async (userid) => {
    console.log('removeAllItemsfromCart called');
    const removeAllItemsfromCartReq = {
      userid: userid,
    };
    console.log(userid);
    try {
      await axios
      .post("http://localhost:4001/cart/removeCart", removeAllItemsfromCartReq)
.then((res) => {
    console.log(res.data);
    if (res.data) {
        setCart([]);
        setCartCount(0);
        localStorage.setItem("cartCount", 0);
        setCartTotal(0);
    }
    }
    )
    }
    catch (err) {
        if (err.response) {
            console.log(err);
        }
        }
    }

  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
