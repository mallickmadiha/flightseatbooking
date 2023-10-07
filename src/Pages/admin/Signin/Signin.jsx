import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../../Components/Loader/Loader";

const Signin = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { email, password } = inputValues;
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      Swal.fire({
        title: "Info!",
        text: "Please fill up all required fields",
        icon: "info",
        confirmButtonText: "Try again",
      }).then(() => setLoading(false));
      return;
    }

    if (email === "mallickmadiha9031@gmail.com" && password === "12345") {
      localStorage.setItem("admin", JSON.stringify({
        email: "mallickmadiha9031@gmail.com",
        password: "12345"
      }));
      Swal.fire({
        title: "Successful",
        text: "You will be logged in few seconds",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() =>
        setTimeout(() => {
          navigate("/admin");
        }, 500)
      );
    } else {
      Swal.fire({
        title: "Error!",
        text: "Invalid username or password",
        icon: "error",
        confirmButtonText: "Try again",
      }).then(() => setLoading(false));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };
  return (
    <div className="flex flex-col bg-gray-100  h-screen">
      <Loader active={loading} />
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
              px-6 py-10 sm:px-10 sm:py-6 
              bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Admin Login
          </h2>

          <form className="mt-10" method="POST">
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="block w-full py-3 px-1 mt-2 
                      text-gray-800 appearance-none 
                      border-b-2 border-gray-100
                      focus:text-gray-500 focus:outline-none focus:border-gray-200"
              value={inputValues.email}
              onChange={handleInputChange}
              required
            />

            <label
              htmlFor="password"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="block w-full py-3 px-1 mt-2 mb-4
                      text-gray-800 appearance-none 
                      border-b-2 border-gray-100
                      focus:text-gray-500 focus:outline-none focus:border-gray-200"
              value={inputValues.password}
              onChange={handleInputChange}
              required
            />

            <div className="text-center my-5">
              {loading ? (
                <button
                  className="animate-pulse w-full py-3 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
                  type="submit"
                >
                  LogIn
                </button>
              ) : (
                <button
                  className="w-full py-3 bg-gray-800 rounded-sm
                  font-medium text-white uppercase
                  focus:outline-none hover:bg-gray-700 hover:shadow-none"
                  type="submit"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  LogIn
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
