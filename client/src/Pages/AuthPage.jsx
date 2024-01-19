import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

function AuthPage() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  return (
    <main className="bg-emerald-100 h-[100vh]" >
      <Link
        to={"/"}
        href=""
        className="mt-4 font-semibold text-2xl flex justify-center"
      >
        <span className="text-primary text-center">Fluentify</span>
      </Link>
      <Box
        className="auth_page"
        sx={{
          display: { lg: "flex", md: "flex", sm: "block", xs: "block" },
          mt: 6,
          mb: 3,
          justifyContent: "center",
          gap: 6,
          px: 3,
        }}
      >
        <div className="flex flex-col mt-10">
          <h1 className="font-semibold text-[35px] text-primary">
            Sign up for free practice
          </h1>
          <p className="text-primary mt-2 text-lg">
            &#9755; Take unlimited test
          </p>
          <p className="text-primary mt-2 text-lg">
            &#9755; Instant score evaluation
          </p>
          <p className="text-primary mt-2 text-lg">
            &#9755; See your position in leaderboard
          </p>
        </div>
        {isLoginForm ? (
          <LoginForm
            isLoginForm={isLoginForm}
            setIsLoginForm={setIsLoginForm}
          />
        ) : (
          <SignUpForm
            isLoginForm={isLoginForm}
            setIsLoginForm={setIsLoginForm}
          />
        )}
      </Box>
    </main>
  );
}

export default AuthPage;
