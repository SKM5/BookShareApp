import React, {useState, useEffect} from 'react'
import './cart.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import Footer from './Footer';
import Navbar from './Navbar';
import { useForm } from "react-hook-form";

const Cart = () => {
    const navigate = useNavigate();
    const redirectToAnotherPage = () => {
        navigate('/BookList');
        window.scrollTo(0, 0);
      };
      const enableCheckout = () => {
        setCheckoutClicked(true);
        };
      const [formData, setFormData] = useState({
        name: '',
        address: '',
        pincode: '',
        mobile: '',
        email: ''
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const [authUser, setAuthUser] = useAuth();
      const [checkoutClicked, setCheckoutClicked] = useState(false);
      const [cart, setCart] = useState([]);
      const [cartCount, setCartCount] = useState(0);
      const [cartTotal, setCartTotal] = useState(0);
      useEffect(() => {
        console.log('useEffect called');
        const fetchUserCart = async () => {
            console.log('fetchUserCart called'); 
          if (!authUser._id) {
            console.log('authUser._id is not available');
            return;  // if authUser._id is not available, exit the function
          }
          const usercartReq = {
            userid: authUser._id,
          };
          console.log(usercartReq);
          try {
            await axios
            .post("http://localhost:4001/cart/usercart", usercartReq)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setCart(res.data.carts);
            setCartCount(res.data.carts.length);
            localStorage.setItem("cartCount", res.data.carts.length);
            let total = 0;
            res.data.carts.forEach((item) => {
                total += item.price;
            });
            setCartTotal(total);
        }
      })
          } catch (err) {
            if (err.response) {
              console.log(err);
             
            }
          }
        };
      
        fetchUserCart();
      }, [authUser]); 

        const removeCartItem = (item) => async () => {
            console.log('removeCartItem called');
            const removeCartItemReq = {
              userid: authUser._id,
              booktitle: item.booktitle,
            };
            console.log(removeCartItemReq);
            try {
              await axios
              .post("http://localhost:4001/cart/removeItem", removeCartItemReq)
        .then((res) => {
            console.log(res.data);
            if (res.data) {
                // setCart(cart.filter((cartItem) => cartItem.booktitle !== item.booktitle));
                // setCartCount(cartCount - 1);
                // localStorage.setItem("cartCount", cartCount - 1);
                setCart(res.data.carts);
            setCartCount(res.data.carts.length);
            localStorage.setItem("cartCount", res.data.carts.length);
            let total = 0;
            res.data.carts.forEach((item) => {
                total += item.price;
            });
            setCartTotal(total);
            }
            })
            } catch (err) {
                if (err.response) {
                    console.log(err);
                }
                }
            }
            const {
                register,
                handleSubmit,
                formState: { errors },
              } = useForm();
            
              const onSubmit = async (data) => {
                const userInfo = {
                  userName: data.userName,
                  email: data.email,
                  password: data.password,
                  role: data.role,
                };
                await axios
                  .post("http://localhost:4001/user/login", userInfo)
                  .then((res) => {
                    console.log(res.data);
                    if (res.data) {
                      toast.success("Loggedin Successfully");
                      document.getElementById("my_modal_3").close();
                      setTimeout(() => {
                        window.location.reload();
                        localStorage.setItem("Users", JSON.stringify(res.data.user));
                      }, 1000);
                    }
                  })
                  .catch((err) => {
                    if (err.response) {
                      console.log(err);
                      toast.error("Error: " + err.response.data.message);
                      setTimeout(() => {}, 2000);
                    }
                  });
              };
  return (
    <div className="cart" >
        <Navbar cartCount={cartCount}/>
        {/* <div className="navbar">
        <a className="text-2xl font-bold cursor-pointer" href="/BookList">Book Share</a>
        </div> */}
        <h2>Cart & Checkout</h2>
        {cart.length > 0 ? (
            <>
        <div className="cart-items">
      {cart.map((item, index) => (
        <div className="cart-item" key={index}>
          <div className="cart-item-image">
            <img src={item.bookimage} alt={item.booktitle} />
          </div>
          <div className="cart-item-details">
            <h3>{item.booktitle}</h3>
            <p>Price: {item.price}</p>
            <p>Qty: 1</p>
          </div>
          <div className="cart-item-actions">
              <button className="btn" onClick={removeCartItem(item)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
    <div className="cart-total">
        <h3>Total: {cartTotal}</h3>
        <button className="btn" onClick={enableCheckout}>Checkout</button>
        <button className="btn" onClick={redirectToAnotherPage}>Continue Shopping</button>
    </div>
    </>
    ) : (
        <p>Your cart is empty</p>
    )}
    {checkoutClicked && (
    <form className="book-form" onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      </label>
      <label>
        Pincode:
        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
      </label>
      <label>
        Mobile:
        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <button type="submit">Submit</button>
    </form>
    )}
    <Footer />
    </div>
  )
}

export default Cart
