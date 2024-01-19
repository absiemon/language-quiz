import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";
import { Box } from "@mui/material";

function Header() {
  const { isAuthenticated, user } = useContext(QuizContext);
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-30 -mx-4 py-3 bg-emerald-100 shadow-lg 
    xs:block csm:flex justify-between"
    >
      <Link
        to={"/"}
        href=""
        className="w-[100px] ml-5 font-semibold text-xl flex xs:justify-center  sm:justify-center bdsm:justify-start"
      >
        <span className="text-primary ">Fluentify</span>
      </Link>
      {!isAuthenticated ? (
        <div style={{ gap: '20px', marginRight: '20px' }}
          className="xs:hidden csm:flex">
          <button
            className="px-3 border border-primary text-primary rounded-md"
            onClick={() => {
              navigate("/auth");
            }}
          >
            login
          </button>
          <button
            className="px-3 bg-primary text-emerald-100 rounded-md"
            onClick={() => {
              navigate("/auth");
            }}
          >
            signup
          </button>
        </div>
      ) : (
        <Box sx={{ display: "flex", gap: 3, mr: 3, alignItems: "center", justifyContent:'center'}}>
          <p className="text-primary" role="button" onClick={()=> navigate('/performance')}>Performance</p>
          <p className="text-primary" role="button" onClick={()=> navigate('/leaderboard')}>Leaderboard</p>
          <div className="text-emerald-100 font-semibold bg-primary px-3 py-1 rounded-3xl " role="button"
          onClick={()=> navigate('/profile')}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </Box>
      )}
    </header>
  );
}

export default Header;
