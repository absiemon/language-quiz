import { Container, Divider } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import welcome from "../data/welcome.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()

  return (
    <main className="flex items-center justify-center h-[100vh]">
      <div className="shadow-xl flex flex-col items-center justify-center 
      xs:w-[100vw] csm:w-[90vw] sm:w-[70vw] py-2 px-2"
      >
        <h1 className="text-2xl font-semibold text-primary">
          {" "}
          Welcome to Fluentify!!
        </h1>
        <section className="xs:block bdsm:flex mt-6">
          <img src={welcome} alt="icon" />
          <div className="">
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
        </section>
        <Divider sx={{ width: "100%", mt: 6 }} />
        <div className="w-[100%] flex justify-end px-4">
          <button
            button
            className="p-3 mt-3 mb-1 bg-primary text-emerald-100 rounded-md"
            onClick={()=> {
              navigate('/select_language')
            }}
          >
            {" "}
            Start test
          </button>
        </div>
      </div>
    </main>
  );
}

export default Home;
