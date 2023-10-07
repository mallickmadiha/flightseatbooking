import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import Swal from "sweetalert2";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { addUsers } from "../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleconfirmPassword, setVisibleconfirmPassword] = useState(false);
  const navigate = useNavigate();


  const storedData = localStorage.getItem("user");
  const userData = JSON.parse(storedData) || {};

  console.log("User", storedData);

  useEffect(()=>{
    if(userData.islogged === true || storedData){
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userData, storedData])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmpassword || !name) {
      Swal.fire({
        title: "Info!",
        text: "Please fill up all required fields",
        icon: "info",
        confirmButtonText: "Try again",
      }).then(() => setLoading(false));
    } else if (password !== confirmpassword) {
      Swal.fire({
        title: "Info!",
        text: "Password and Confirm Password do not match",
        icon: "info",
        confirmButtonText: "Try again",
      }).then(() => setLoading(false));
    } else {
      setLoading(true);
      dispatch(
        addUsers({
          name,
          email,
          password
        })
      );
      Swal.fire({
        title: "Success!",
        text: "User Added Successfully!",
        icon: "success",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result["isConfirmed"]) {
          setLoading(false);
          navigate("/signin");
        }
      });
    }
  };

  function togglePasswordVisibility() {
    setVisiblePassword(!visiblePassword);
  }
  function toggleconfirmPasswordVisibility() {
    setVisibleconfirmPassword(!visibleconfirmPassword);
  }

  return (
    <div className="flex  h-screen">
      <Loader active={loading} />
      <div className="m-auto grid grid-cols-1 md:grid-cols-2 gap-0 lg:w-2/3 md:w-3/4 w-full md:h-3/4">
        <div className="right-side md:order-last order-first md:rounded-r-2xl shadow-2xl">
          <div className="flex flex-col justify-center items-center m-10 h-full">
            <h1 className="text-center text-white text-3xl font-bold mt-2">
              Already a User?
            </h1>
            <p className="text-center text-white text-xl mt-2"> Sign in here</p>
            <Link
              to="/signin"
              className="ring-2 ring-white text-white rounded-full
              my-10 py-2 px-4 bg-transparent hover:bg-orange hover:ring-0"
            >
              Sign In
            </Link>
          </div>
        </div>
        <div className="md:rounded-l-2xl rounded-b-2xl bg-slate-100 shadow-2xl">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-center  font-bold text-3xl mt-6">
              Register
            </h1>
            <form className="mt-4 md:p-6 p-2 w-3/4" method="POST">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                <div className="col-span-1">
                  <input
                    className="rounded-full appearance-none border w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                  />
                </div>

                <div className="col-span-1">
                  <input
                    className="rounded-full appearance-none border w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-span-1 password">
                  <input
                    className="appearance-none meinput w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={!visiblePassword ? "password" : "text"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div onClick={togglePasswordVisibility} className="togglebtn">
                    {!visiblePassword ? (
                      <BsFillEyeSlashFill />
                    ) : (
                      <BsFillEyeFill />
                    )}
                  </div>
                </div>
                <div className="col-span-1 password">
                  <input
                    className="appearance-none meinput w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={!visibleconfirmPassword ? "password" : "text"}
                    placeholder="Confirm Password"
                    value={confirmpassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    required
                  />
                  <div
                    onClick={toggleconfirmPasswordVisibility}
                    className="togglebtn"
                  >
                    {!visibleconfirmPassword ? (
                      <BsFillEyeSlashFill />
                    ) : (
                      <BsFillEyeFill />
                    )}
                  </div>
                </div>
              </div>

              <div className="text-center mt-9 mb-2">
                <button
                  className="bg-orange text-white rounded-full font-bold py-2 px-5 focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
