import React, { useState, useEffect } from "react";
import "../styles/register.css";
import axios from "axios";
import Aos from "aos";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { setReplyChatbot } from "../store/actions/forms";
import { useDispatch } from "react-redux";

export default function Register() {
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
      url: "https://server-webber.herokuapp.com/register",
      method: "POST",
      data: {
        email,
        password,
      },
    })
      .then(() => {
        history.push("/login");
        Swal.fire("Successfully Registered", "", "success");
      })
      .catch((err) => {
        const errorResponse = err.response.data.errors
          .map((msg) => msg)
          .join(", ");
        if (!password && !email) {
          Swal.fire("Email and Password Cannot Be Empty", "", "error");
        } else {
          Swal.fire(errorResponse, "", "error");
        }
      });
  }

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
            <div className="m-7" style={{ marginTop: "3rem" }}>
              <form onSubmit={handleSubmit} action>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    style={{ marginBottom: "0.5rem" }}
                    className="block text-sm text-gray-600 dark:text-gray-400"
                  >
                    Email Address
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>
                <div className="mb-6">
                  <div
                    style={{ marginBottom: "0.5rem" }}
                    className="flex justify-between"
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
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>
                <div className="mb-6">
                  <button
                    type="submit"
                    style={{ backgroundColor: "#125D98" }}
                    className="w-full px-3 py-4 text-white rounded-md focus:outline-none"
                  >
                    Sign up
                  </button>
                </div>
                <p className="text-sm text-center text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{ color: "#125D98" }}
                    className="focus:outline-none focus:underline focus:text-indigo-500"
                  >
                    Sign in
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
