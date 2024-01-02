import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "./Loader";
import { Link } from "react-router-dom";
import login from "./assets/login.svg";
import logo from "./assets/logo.svg";
import { useNavigate } from "react-router-dom";
export const Login = ({ setCookie }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setusername] = useState(null);
  const [password, setpassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showError, setShowError] = useState(true);
  const handleAuth = (e) => {
    e.preventDefault();
    if (password != null && username != null) {
      let obj = {
        username: username,
        password: password,
      };
      axios
        .post("http://127.0.0.1:8000/api/login", obj)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.rows[0]);
          setCookie("userId", res.data.rows[0].userid, { path: "/", secure: true });
          setCookie("email", res.data.rows[0].email, { path: "/", secure: true });
          setCookie("profilepic", res.data.rows[0].profilepic, { path: "/", secure: true });
          setCookie("userName", res.data.rows[0].username, { path: "/", secure: true });
          navigate('/');
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setErrorMessage(err.response.data);
            console.log(err.response);
          } else if (err.response.status === 400) {
            setErrorMessage(err.response.data);
            console.log(err.response);
          }
          setShowError(true);
        });
    }
    if (username === null) {
      setShowError(true);
      setErrorMessage("Username Required.");
    } else if (password === null) {
      setShowError(true);
      setErrorMessage("Password Required.");
    }
  };
  return isLoading ? (
    <Loader />
  ) : (
    <main className="">
      <div className="w-screen h-screen flex justify-center items-center bg-background">
        <div className="h-fit w-[25vw] flex flex-col items-center bg-padding form-dark rounded-2xl gap-4 ">
          <div className="w-full border-b-2 flex flex-col items-center border-yellow ">
            <img src={logo} alt="" />
          </div>
          <div>
            <img src={login} alt="" className="w-[100%] h-[5vh]" />
          </div>
          <div className=" flex flex-col w-full p-4 gap-4">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setusername(e.target.value);
                setShowError(false);
              }}
              className="h-[50px] p-4 bg-[rgb(0,0,0,0.4)]  outline-none text-text rounded-xl active:bg-[rgb(rgb(0,0,0,0.2))]"
            />
            <input
              type="password"
              onChange={(e) => {
                setpassword(e.target.value);
                setShowError(false);
              }}
              placeholder="Password"
              className="h-[50px] p-4 bg-[rgb(0,0,0,0.4)] outline-none text-text rounded-xl active:bg-[rgb(rgb(0,0,0,0.2))]"
            />
          </div>
          <div className="w-[80%] mx-[5%] flex justify-end  text-highlight ">
            <Link to="/loader" className="hover:underline hover:-translate-y-1">Forget Password?</Link>
          </div>
          <div className=" w-[100%] ">
            <button
              className="bg-highlight p-3  w-[40%] mx-[30%] rounded-xl"
              onClick={(e) => handleAuth(e)}
            >
              Submit
            </button>
          </div>
          <div className="text-text peer-hover:-translate-y-1">
            <span>
              Need an account?{" "}
              <Link to="/register" className="text-highlight hover:underline ">
                Signup
              </Link>
            </span>
          </div>
            <div className="text-red-800 mb-4">
              <span>
              {showError ?errorMessage:null}</span>
            </div>
        </div>
      </div>
    </main>
  );
};
