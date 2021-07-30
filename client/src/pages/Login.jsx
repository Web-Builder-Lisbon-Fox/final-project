import React, { useState, useEffect } from "react";
import "../styles/login.css";
import axios from "axios";
import Aos from "aos";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { setReplyChatbot } from "../store/actions/forms";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    Aos.init({ duration: 1500 });
    dispatch(setReplyChatbot(""));
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    axios({
      url: "https://server-webber.herokuapp.com/login",
      method: "POST",
      data: {
        email,
        password,
      },
    })
      .then(({ data }) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("email", data.email);
        setEmail("");
        setPassword("");
        history.push("/dashboard");
        Swal.fire("Successfully Login!", "", "success");
      })
      .catch((err) => {
        // console.log(err.response.data.errors[0], "<< error");
        const errorResponse = err.response.data.errors
          .map((msg) => msg)
          .join(", ");
        Swal.fire(errorResponse, "", "error");
      });
  }

  const handleLogin = async (googleData) => {
    const res = await fetch("http://localhost:4000/googleLogin", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!data.errors) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("email", data.email);
      history.push("/dashboard");
    }
  };

  return (
    <React.Fragment>
      <div data-aos="fade-down" className="flex items-center min-h-screen">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div
              onClick={() => history.push("/")}
              className="cursor-pointer text-center"
            >
              <img
                src="https://ik.imagekit.io/vrvrzbdh5xfk/logo_trans_Rh6ERWv_H.png?updatedAt=1627302901317"
                className="my-3 ml-16 max-w-xs"
                alt="logo"
              />
            </div>
            <div className="m-7" style={{ marginTop: "2rem" }}>
              <form
                className="flex flex-col items-center"
                onSubmit={handleSubmit}
                action
              >
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    style={{ marginBottom: "0.5rem" }}
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Email Address
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@company.com"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>
                <div className="mb-3">
                  <div
                    style={{ marginBottom: "0.5rem" }}
                    className="flex justify-between mb-2"
                  >
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Password
                    </label>
                  </div>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                  <div className="mb-6">
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#125D98",
                        // display: "flex",
                        // padding: "1rem 8.8rem",
                      }}
                      className="w-full text-lg font-bold px-3 py-4 mt-5 text-white rounded-md focus:outline-none"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
                <div
                  // style={{
                  //   marginBottom: "1rem",
                  //   marginTop: 20,
                  //   marginLeft: 110,
                  // }}
                  className="mb-5"
                >
                  <GoogleLogin
                    clientId={
                      "1035521074618-nkotpceb3p60muu0h5rmf6hn5pe72dtc.apps.googleusercontent.com"
                    }
                    buttonText="Log in with Google"
                    onSuccess={handleLogin}
                    onFailure={handleLogin}
                    cookiePolicy={"single_host_origin"}
                    className="w-full"
                  />
                </div>
                <p className="text-sm text-center text-gray-400">
                  Don't have an account yet?{" "}
                  <Link
                    onClick={() => history.push("/register")}
                    style={{ color: "#125D98" }}
                    className=" focus:outline-none focus:underline"
                  >
                    Sign up
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-homepage">
        <h2>
          web<span>ber</span>
        </h2>
        <h4>Copyright 2021 || Web Builder</h4>
      </div>
    </React.Fragment>
  );
}
