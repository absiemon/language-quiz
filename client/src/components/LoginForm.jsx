import React, { useContext, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomSnackbar from "./CustomSnackbar";

function LoginForm({ isLoginForm, setIsLoginForm }) {
  const { setIsAuthenticated, setUser, setSnackbar } = useContext(QuizContext);
  const navigate = useNavigate();

  //State for showing errors for invalid value of inputs
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    if (!email && !password) {
      setError((prev) => {
        return { ...prev, emailError: true, passwordError: true };
      });
      return;
    }
    if (!email) {
      setError((prev) => {
        return { ...prev, emailError: true };
      });
      return;
    }
    if (!password) {
      setError((prev) => {
        return { ...prev, passwordError: true };
      });
      return;
    }

    setLoading(true);
    axios
      .post("/auth/login", { email, password })
      .then((res) => {
        setIsAuthenticated(true);
        setUser(res.data?.content?.data);
        localStorage.setItem("token", res.data?.meta?.access_token);
        setLoading(false);
        navigate("/home");
      })
      .catch(({response}) => {
        setLoading(false);
        setSnackbar((prev) => {
          return { ...prev, open: true, message: response?.data?.error };
        });
      });
  };


  const handleChange = (e, field) => {
    const text = e.target.value;
    const newField = field + "Error";
    // Removing error state if value in particular input is changes
    if (text) {
      setError((prev) => {
        return { ...prev, [newField]: false };
      });
    }
    if (field === "email") setEmail(text);
    else if (field === "password") setPassword(text);
  };

  return (
    <>
      <CustomSnackbar/>
      <form
        className="shadow-lg border-y border-primary py-2 px-4 rounded-md w-[400px]"
        onSubmit={handleLogin}
      >
        <p className="mt-2 text-primary"> Email address*</p>
        <input
          className={`border ${
            error.emailError ? "border-red-600" : "border-primary"
          } rounded-[4px] py-2 px-3 w-full`}
          value={email}
          onChange={(e) => handleChange(e, "email")}
        />
        <br />
        {error.emailError && (
          <p className="text-red-600 text-[12px]">Enter a valid email</p>
        )}

        <p className="mt-3"> Password*</p>
        <input
          className={`border ${
            error.passwordError ? "border-red-600" : "border-primary"
          } rounded-[4px] py-2 px-3 w-full`}
          value={password}
          onChange={(e) => handleChange(e, "password")}
        />
        <br />
        {error.passwordError && (
          <p className="text-red-600 text-[12px]">Enter a valid Password</p>
        )}

        <button className="p-3 mt-3 mb-3 bg-primary text-emerald-100 rounded-md w-full">
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm mt-3 mb-1 text-gray-400 text-center">
          By clicking on the login button you'll <br />
          be redirected to learing page
        </p>
        <p className="text-sm text-primary">
          Don't have an account?
          <span
            role="button"
            className=" ml-2 font-semibold"
            onClick={() => setIsLoginForm(false)}
          >
            sign up
          </span>
        </p>
      </form>
    </>
  );
}

export default LoginForm;
