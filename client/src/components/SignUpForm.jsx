import React, { useContext, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomSnackbar from "./CustomSnackbar";

function SignUpForm({ isLoginForm, setIsLoginForm }) {
  const { setIsAuthenticated, setUser, setSnackbar } = useContext(QuizContext);
  const navigate = useNavigate();

  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
    nameError: false,
    repeatPassError: false,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = (event) => {
    event.preventDefault();
    if (!email && !password && !name) {
      setError((prev) => {
        return {
          ...prev,
          emailError: true,
          passwordError: true,
          nameError: true,
        };
      });
      return;
    }
    if (!email) {
      setError((prev) => {
        return { ...prev, emailError: true };
      });
      return;
    }
    if (!name) {
      setError((prev) => {
        return { ...prev, nameError: true };
      });
      return;
    }
    if (!password) {
      setError((prev) => {
        return { ...prev, passwordError: true };
      });
      return;
    }
    if (repeatPass !== password) {
      setError((prev) => {
        return { ...prev, repeatPassError: true };
      });
      return;
    }

    setLoading(true);
    axios
      .post("/auth/signup", { name, email, password })
      .then((res) => {
        setIsAuthenticated(true);
        setUser(res.data?.content?.data);
        localStorage.setItem("token", res.data?.meta?.access_token);
        setLoading(false);
        navigate("/home");
      })
      .catch(({ response }) => {
        setLoading(false);
        setSnackbar((prev) => {
          return { ...prev, open: true, message: response?.data?.error };
        });
      });
  };

  const handleChange = (e, field) => {
    const text = e.target.value;
    const newField = field + "Error";
    if (text) {
      setError((prev) => {
        return { ...prev, [newField]: false };
      });
    }
    if (field === "email") setEmail(text);
    else if (field === "password") setPassword(text);
    else if (field === "name") setName(text);
    else if (field === "repeatPass") setRepeatPass(text);
  };

  return (
    <>
      <CustomSnackbar/>
      <div className="shadow-lg border-y-2 border-primary py-2 px-4 rounded-md w-[400px] h-[400px] overflow-y-scroll">
        <form className="" onSubmit={handleSignUp}>
          <p className="mt-2 text-primary">Name*</p>
          <input
            className={`border ${
              error.nameError ? "border-red-600" : "border-primary"
            } rounded-[4px] py-2 px-3 w-full`}
            value={name}
            onChange={(e) => handleChange(e, "name")}
          />
          <br />
          {error.nameError && (
            <p className="text-red-600 text-[12px]">Enter a valid name</p>
          )}

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
            <p className="text-red-600 text-[12px]">Enter a valid password</p>
          )}

          <p className="mt-3"> Confirm Password*</p>
          <input
            className={`border ${
              error.repeatPassError ? "border-red-600" : "border-primary"
            } rounded-[4px] py-2 px-3 w-full`}
            value={repeatPass}
            onChange={(e) => handleChange(e, "repeatPass")}
          />
          <br />
          {error.repeatPassError && (
            <p className="text-red-600 text-[12px]">
              Repeat password does not matches password
            </p>
          )}

          <button className="p-3 mt-3 mb-3 bg-primary text-emerald-100 rounded-md w-full">
            {!loading ? "Sign up" : "Singing up..."}
          </button>
          <p className="text-sm mt-3 mb-1 text-gray-400 text-center">
            {" "}
            By clicking on the sign up button you'll <br />
            be redirected to learing page
          </p>
          <p className="text-sm text-primary">
            Already have an account?
            <span
              role="button"
              className=" ml-2 font-semibold"
              onClick={() => setIsLoginForm(true)}
            >
              login
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignUpForm;

{
  /* <form
className="border border-primary py-2 px-4 rounded-md w-[350px]"
onSubmit={handleSignUp}
>
<p className="mt-2 text-primary">Name*</p>
<input
  className={`border border-primary rounded-[4px] py-2 px-3 w-full`}
  value={name}
  onChange={(e) => handleChange(e, "name")}
/>
<br />
{error.nameError && (
  <p className="text-red-600 text-[12px]">Enter a valid name</p>
)}

<p className="mt-2 text-primary"> Email address*</p>
<input
  className={`border border-primary rounded-[4px] py-2 px-3 w-full`}
  value={email}
  onChange={(e) => handleChange(e, "email")}
/>
<br />
{error.emailError && (
  <p className="text-red-600 text-[12px]">Enter a valid email</p>
)}

<p className="mt-3"> Password*</p>
<input
  className={`border border-primary rounded-[4px] py-2 px-3 w-full`}
  value={password}
  onChange={(e) => handleChange(e, "password")}
/>
<br />
{error.passwordError && (
  <p className="text-red-600 text-[12px]">Enter a valid password</p>
)}

<p className="mt-3"> Confirm Password*</p>
<input
  className={`border border-primary rounded-[4px] py-2 px-3 w-full`}
  value={repeatPass}
  onChange={(e) => handleChange(e, "repeatPass")}
/>
<br />
{error.repeatPassError && (
  <p className="text-red-600 text-[12px]">
    Repeat password does not matches password
  </p>
)}

<button className="p-3 mt-3 mb-3 bg-primary text-emerald-100 rounded-md w-full">
  Sign up
</button>
<p className="text-sm mt-3 mb-1 text-gray-400 text-center">
  {" "}
  By clicking on the sign up button you'll <br />
  be redirected to learing page
</p>
<p className="text-sm text-primary">
  Already have an account?
  <span
    role="button"
    className=" ml-2 font-semibold"
    onClick={() => setIsLoginForm(true)}
  >
    login
  </span>
</p>
</form> */
}
