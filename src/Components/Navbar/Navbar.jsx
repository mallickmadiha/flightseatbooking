import React from "react";
import { logoutUser } from "../../redux/reducers/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import usericon from "../../assets/usericon.png";

const Navbar = ({ name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch(logoutUser(user.id));
    const updatedUserData = { ...user, islogged: false };
    localStorage.setItem("user", JSON.stringify(updatedUserData));
    localStorage.removeItem("booking");
    navigate("/signin");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
            <Link to={"/"}>
              <i className="fa fa-solid fa-plane text-blue-700 text-2xl"></i>
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <span className="text-gray-700 md:visible invisible">
              Welcome {name}
            </span>
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-blue-600 text-sm focus:outline-none"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <img className="h-9 w-9 rounded-full" src={usericon} alt="" />
                </button>
              </div>
            </div>
            <button
              className="text-white mx-4 bg-gradient-to-r mt-2 from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
