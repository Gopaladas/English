import React, { useEffect, useState } from "react";
import "./Login.css"; // Ensure the CSS file is in the same directory or adjust the path accordingly.
import axios from "axios";
import { resolvePath, useNavigate } from "react-router-dom";
import {
  loggedIn,
  loggedOut,
  startloading,
  stoploading,
} from "../store/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
// import { Navigate } from "react-router-dom";

const LoginForm = () => {
  const { isLoggedIn, user, isloading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [newData, setNewData] = useState();
  const navigate = useNavigate();
  const handleData = (e) => {
    const { name, value } = e.target;
    setData((preval) => ({
      ...preval,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const { email, password } = data;
    const logindata = {
      email: email,
      password: password,
    };
    // axios.defaults.withCredentials = true;
    // https://english-ivory.vercel.app/
    // "http://localhost:3000/api/admin/adminlogin",
    dispatch(startloading());
    try {
      const response = await axios.post(
        "https://english-ivory.vercel.app/api/admin/adminlogin",
        logindata,
        {
          withCredentials: true,
          headers:{
            "Content-Type":"application/json",
            accept:"application/json",
          }
        }
      );

      setNewData(response);
      // console.log(response);
      // if (response.data.user && response.data.user === "admin") {
      //   navigate("/adminMain");
      // }
      // console.log(response);

      // navigate("/*");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stoploading());
    }
  };

  // axios.defaults.withCredentials = true;
  useEffect(() => {
    const checkLogin = async () => {
      dispatch(startloading());
      try {
        const response = await axios.get(
          "https://english-ivory.vercel.app/api/admin/isLoggedIn",
          {
            withCredentials: true,
            headers:{
              "Content-Type":"application/json",
              accept:"application/json",
            }
          }
        );
        console.log(response?.data?.user?.role);
        // Ensure the user data is what you're expecting
        if (response?.data && response?.data?.user) {
          if (response?.data?.user?.role === "admin") {
            const res = await axios.get(
              `https://english-ivory.vercel.app/api/admin/admindata`,
              {
                withCredentials: true,
                headers:{
                  "Content-Type":"application/json",
                  accept:"application/json",
                }
              }
            );

            console.log(res);
            dispatch(loggedIn(res.data.user));

            console.log("navigeting : ", response.data.user.role);
            navigate("/adminMain");
          } else {
            const res = await axios.get(
              `https://english-ivory.vercel.app/api/faculty/eachfacultydetails/${response.data.user.id}`,
              {
                withCredentials: true,
                headers:{
                  "Content-Type":"application/json",
                  accept:"application/json",
                }
              }
            );
            console.log(res);
            dispatch(loggedIn(res.data.user));
            navigate("/userMain");
          }
        } else {
          console.log("No user data found");
        }
      } catch (error) {
        console.error("Error during login check: ", error);
      } finally {
        dispatch(stoploading());
      }
    };

    checkLogin();
  }, [newData]);

  return (
    <div className="login-page">
      {" "}
      {/* Add the scoped class here */}
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1 className="l-name">Login</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={handleData}
              disabled={isloading}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleData}
              disabled={isloading}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" disabled={isloading} /> Remember Me
            </label>
            <a href="#">Forgot Password</a>
          </div>
          <button type="submit" className="btn" disabled={isloading}>
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account? <a href="#">Register here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
