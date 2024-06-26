import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import './login.css';
function Login() {
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
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
              style={{ borderRadius: "unset" }}
            >
              ✕
            </Link>
 
            <h3 className="font-bold text-lg text-black">Login</h3>
            {/* Username */}
            <div className="mt-4 space-y-2 text-black">
              <span>User Name</span>
              <br />
              <input
                type="userName"
                placeholder="Enter User Name"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("userName", { required: true })}
              />
              <br />
              {errors.userName && (
                <span className="text-sm text-red-500 text-black">
                  This field is required
                </span>
              )}
            </div>
            {/* Email */}
            <div className="mt-4 space-y-2 text-black">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500 text-black">
                  This field is required
                </span>
              )}
            </div>
            {/* password */}
            <div className="mt-4 space-y-2 text-black">
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* Role */}
            <div className="mt-4 space-y-2 text-black">
              <label htmlFor="role">Role</label> {/* Add label for accessibility */}
              <br />
              <select
                id="role"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("role", { required: true })}
              >
                <option value="">Select Role</option>
                <option value="reader">Reader</option>
                <option value="book_owner_share">Book Owner to share books </option>
                <option value="book_owner_reader">Book Owner and Reader</option>
              </select>
              <br />
              {errors.role && (
                <span className="text-sm text-red-500">Please select a role</span>
              )}
            </div>
            {/* Button */}
            <div className="login-button">
              <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                Login
              </button>
              <p>
                Not registered?{" "}
                <Link
                  to="/signup"
                  className="underline text-blue-500 cursor-pointer"
                >
                  Signup
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
 
export default Login;