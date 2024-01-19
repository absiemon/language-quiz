import { Container } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import axios from "axios";
import CustomSnackbar from "./CustomSnackbar";
import { QuizContext } from "../context/QuizContext";
import NotingToShowHere from "./NotingToShowHere";
import LoadingPage from "./LoadingPage";

function Performance() {
  const { setSnackbar } = useContext(QuizContext);
  const [completedModules, setCompletedModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("/excercise/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCompletedModules(res.data?.content?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setSnackbar((prev) => {
          return { ...prev, open: true, message: "Server error occured.." };
        });
      });
  }, []);

  const changeDateFormat = (date) => {
    const inputDate = new Date(date);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      inputDate
    );

    return formattedDate;
  };
  return (
    <>
      <CustomSnackbar />
      <Container>
        <h1 className="text-2xl mt-3 text-primary font-semibold">
          {" "}
          Performance{" "}
        </h1>
        {!loading ? (
          <>
            {completedModules.length > 0 ? (
              completedModules.map((object, index) => {
                const [language, excercises] = Object.entries(object)[0];
                return (
                  <main className="mt-4" key={index}>
                    <h1 className="text-2xl text-primary">{language}</h1>
                    <div className="grid xs:grid-cols-1 bdsm:grid-cols-2 gap-4 mt-3">
                      {/* To be mapped */}
                      {excercises.length > 0 &&
                        excercises.map((excercise, ind) => {
                          return (
                            <div
                              className={`p-2 bg-emerald-200 cursor-pointer rounded-md`}
                              key={ind}
                            >
                              <h1 className="text-lg text-primary">
                                {" "}
                                Excercise - {excercise?.excerciseNo}
                              </h1>
                              <section className="flex justify-between mt-3">
                                <div className="text-md text-primary">
                                  <p>Marks obtained: {excercise?.score}</p>
                                  <p className="mt-1">
                                    Total Marks: {excercise?.maxScore}
                                  </p>
                                  <p className="mt-3 text-sm text-gray-500">
                                    Test given:{" "}
                                    {changeDateFormat(excercise?.createdAt)}
                                  </p>
                                </div>
                                <div className="text-primary px-2">
                                  <p className="mb-2">Performance</p>
                                  <LinearProgressWithLabel
                                    value={parseInt(excercise?.proficiency)}
                                  />
                                </div>
                              </section>
                            </div>
                          );
                        })}
                    </div>
                  </main>
                );
              })
            ) : (
              <NotingToShowHere />
            )}
          </>
        ) : (
          <LoadingPage height="50vh"/>
        )}
      </Container>
    </>
  );
}

export default Performance;
