import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { logoutUser } from "../../redux/features/userSlice";


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(state => state.users)
  const storedData = localStorage.getItem("user");
  const userData = JSON.parse(storedData) || {};

  useEffect(()=>{
    console.log(users)
    if(userData.islogged === false){
      navigate('/signin')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userData])

  const handleLogout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch(logoutUser(user.id))
    const updatedUserData = { ...user, islogged: false };
    localStorage.setItem("user", JSON.stringify(updatedUserData));
    navigate("/signin");
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl my-5 text-center">Hii {userData?.name}</h1>
      <button
        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
