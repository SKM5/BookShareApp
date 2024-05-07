import React from "react";
import banner from "../../public/Banner.png";
function Banner() {
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-3/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold">Welcome to <span className="text-pink-500"> Book Share! </span> Share the <span className="text-pink-500"> Magic </span>...</h1> 
            <h1 className="text-4xl font-bold">Explore the World of Books!!</h1>
            <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
          </div>
          <button className="btn mt-6 btn-secondary">Explore</button>
        </div>
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            //src={banner}
            //className="md:w-[550px] md:h-[460px] md:ml-12"
            //alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
