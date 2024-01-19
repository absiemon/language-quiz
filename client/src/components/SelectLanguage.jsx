import { Container, Divider, Snackbar } from "@mui/material";
import React, { useContext, useState } from "react";

import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomSnackbar from "./CustomSnackbar";
import { languages } from "../assets/languages";

function SelectLanguage() {

  const navigate = useNavigate();
  const {
    optLanguage,
    setOptLanguage,
    questionNo,
    setQuestion,
    setExcerciseLen,
    setSnackbar,
  } = useContext(QuizContext);
  const [loading, setLoading] = useState(false);


  const handleStartTest = async () => {
    //if user has not selected any language show message
    if (!optLanguage) {
      setSnackbar((prev) => {
        return { ...prev, open: true, message:"Please select a language.." };
      });
      return;
    }
    const token = localStorage.getItem("token");
    setLoading(true);
    await axios
      .get(
        `/questions/get?language=${optLanguage?.language}&questionNo=${questionNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setQuestion(res.data?.content?.data);
        setExcerciseLen(res.data?.excerciseLength);
        navigate("/test");
      })
      .catch((err) => {
        setLoading(false);
        setSnackbar((prev) => {
          return { ...prev, open: true, message: "Test Not available!! please select another language"};
        });
      });
  };

  return (
    <>
      <CustomSnackbar/>
      <main className="flex items-center justify-center h-[100vh]">
        <div className="shadow-xl flex flex-col items-center justify-center
         xs:w-[100vw] csm:w-[90vw] sm:w-[70vw] py-2"
         >
          <h1 className="text-2xl font-semibold text-primary">
            {" "}
            Select a language
          </h1>
          <section className="mt-6 grid xs:grid-cols-3 csm:grid-cols-4 gap-4 px-4">
            {languages.map((obj, index) => {
              return (
                <div
                  className={`col-md-3 flex flex-col items-center p-4 cursor-pointer ${
                    obj?.language === optLanguage?.language && "bg-emerald-400"
                  } rounded-md hover:bg-emerald-200`}
                  key={index}
                  role="button"
                  onClick={() => setOptLanguage(obj)}
                >
                  <img
                    src={obj.icon}
                    alt="icon"
                    className="h-[40px] w-[40px]"
                  />
                  <p>{obj?.language}</p>
                </div>
              );
            })}
          </section>
          <Divider sx={{ width: "100%", mt: 6 }} />
          <div className="w-[100%] flex justify-end px-4">
            <button
              className="p-3 mt-3 mb-1 bg-primary text-emerald-100 rounded-md"
              onClick={handleStartTest}
            >
              {" "}
              {!loading ? "Start test" : "Starting test"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default SelectLanguage;
