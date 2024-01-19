import { Box, Container } from "@mui/material";
import React, { useContext, useEffect } from "react";
import homeSvg from "../data/home.png";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";
function IndexPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(QuizContext);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    if (token) {
      navigate("/home");
    }
  }, []);

  return (
    <Box
      className="indexPage "
      sx={{
        display: {  md: "flex", sm: "block", xs: "block" },
        mt: 6,
        mb: 3,
        justifyContent: "space-between",
        alignItems:'center',
        gap: 3,
        px: 3,
      }}
    >
      <div className="flex flex-col justify-center">
        <h1 className="font-semibold text-[35px] text-primary">
          Learn leanguage <br />
          with ease
        </h1>
        <p className="text-primary mt-2 text-lg">
          &#9755; Take online test anytime, anywhere
        </p>
        <p className="text-primary mt-2 text-lg">&#9755; Learn Through test</p>
        <p className="text-primary mt-2 text-lg">
          &#9755; Motivate through your achievement
        </p>
        <button
          className="p-3 mt-4 bg-primary text-emerald-100 rounded-md w-40"
          onClick={() => {
            isAuthenticated ? navigate("/home") : navigate("/auth");
          }}
        >
          Take test
        </button>
      </div>
      <img src={homeSvg} />
    </Box>
  );
}

export default IndexPage;
