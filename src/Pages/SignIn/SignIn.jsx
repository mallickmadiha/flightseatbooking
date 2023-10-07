import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import Swal from "sweetalert2";
import "./SignIn.css";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/features/userSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const { email, password } = inputValues;

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

    const user = JSON.parse(localStorage.getItem("user"));
    const updatedUserData = { ...user, islogged: true };
    localStorage.setItem("user", JSON.stringify(updatedUserData));

    dispatch(loginUser(user.id))

    if (email === user?.email && password === user?.password) {
      Swal.fire({
        title: "Successful",
        text: "You will be logged in few seconds",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() =>
        setTimeout(() => {
          navigate("/");
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

  function togglePasswordVisibility() {
    setVisible(!visible);
  }

  return (
    <div className="flex h-screen">
      <Loader active={loading} />
      <div className="m-auto grid grid-cols-1 md:grid-cols-2 gap-0 lg:w-2/3 md:w-3/4 w-full md:h-3/4">
        <div className="left-side md:order-first order-last md:rounded-l-2xl shadow-2xl">
          <div className="flex flex-col justify-center items-center m-10 h-full">
            <h1 className="text-center text-white text-3xl font-bold">
              Hello, There!
            </h1>
            <i className="text-center text-white text-lg mt-3">
              "Travel far enough, to meet yourself!" - David Mitchell
            </i>
            <Link
              to="/signup"
              className="ring-2 ring-white text-white rounded-full
              my-10 py-2 px-4 bg-transparent hover:bg-gradientGreen hover:ring-0"
            >
              Register
            </Link>
          </div>
        </div>
        <div className="md:rounded-l-2xl rounded-b-2xl bg-slate-100 shadow-2xl">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-center  font-bold text-3xl mt-6">
              Login
            </h1>
            <form className="mt-4 md:p-6 p-2 w-3/4" method="POST">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="col-span-1">
                  <input
                    name="email"
                    className="rounded-full appearance-none border w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="Email"
                    value={inputValues.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-span-1 password">
                  <input
                    name="password"
                    className=" appearance-none meinput w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={!visible ? "password" : "text"}
                    placeholder="Password"
                    value={inputValues.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    onClick={togglePasswordVisibility}
                    className="togglebtn appearance-none leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {!visible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                  </button>
                </div>
              </div>

              <div className="text-center my-9">
                {loading ? (
                  <button
                    className="animate-pulse bg-gradientGreen text-white rounded-full font-bold py-2 px-5 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign In
                  </button>
                ) : (
                  <button
                    className="bg-gradientGreen text-white rounded-full font-bold py-2 px-5 focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    Sign In
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
