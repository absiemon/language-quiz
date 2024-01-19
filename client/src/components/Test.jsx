import { Box, Divider, LinearProgress, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import axios from "axios";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import { useNavigate } from "react-router-dom";

function TestPage() {

  const {
    optLanguage,
    setOptLanguage,
    questionNo,
    setQuestionNo,
    setQuestion,
    question,
    excerciseLen,
  } = useContext(QuizContext);
  const navigate = useNavigate()
  const [progress, setProgress] = useState(20);
  const [selectedAns, setSelectedAns] = useState("");
  const [testData, setTestData] = useState([]);
  // const [score, setScore] = useState({})

  const [loading, setLoading] = useState(false);

  const handleNextQuestion = async () => {
    const token = localStorage.getItem("token");
    setTestData((prev) => {
      let arr = [...prev];
      arr.push({
        question: question?.question,
        answer: selectedAns,
      });
      return arr;
    });

    setLoading(true);
    await axios
      .get(
        `/questions/get?language=${optLanguage?.language}&questionNo=${
          questionNo + 1
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setProgress(progress + 20);
        setQuestion(res.data?.content?.data);
        setQuestionNo(questionNo + 1);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleSubmitTest = async () => {
    const token = localStorage.getItem("token");
    let newTestData = [...testData];
    newTestData.push({
      question: question?.question,
      answer: selectedAns
    })

    setLoading(true);
    await axios
      .post(
        `/questions/excercise/marks_evaluation`,
        {
          language: optLanguage?.language,
          excerciseNumber: question?.excerciseNumber,
          submittedAns: newTestData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        //Cleaning up when the test is submmited.
        setProgress(20)
        setSelectedAns("");
        setQuestionNo(1);
        setTestData([])
        setOptLanguage()

        setLoading(false);
        navigate('/performance')
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    //Cleaning up when the componet unmount. Reason is that when some one leave the test in mid.
    return async () => {


      await axios
      .delete('/questions/cleanup')
      .then((res) => {
        setOptLanguage()
        setProgress(20);
        setSelectedAns("");
        setQuestionNo(1);
        setTestData([])
      })
      .catch((err) => {
        console.log(err.response?.data)
      });
    }
}, [])

  return (
    <main className="flex items-center justify-center h-[100vh]">
      <div className="shadow-xl flex flex-col items-center justify-center w-[70vw] py-2">
        <header className="font-semibold text-primary">
          {optLanguage && (
            <div className="flex">
              <img src={optLanguage?.icon} alt="icon" className="h-4, w-6" />
              <p className="ml-1">{optLanguage?.language}</p>
              <p className="ml-1">language test</p>
            </div>
          )}
        </header>
        <Box sx={{ width: "70%", mt: 2 }}>
          <LinearProgressWithLabel value={progress} />
        </Box>
        <section className="mt-6 w-[70%]">
          <h1 className="text-lg ">{question?.question}</h1>
          <div className="grid grid-cols-2 gap-4 mt-3">
            {question?.options.map((elm, index) => {
              return (
                <div
                  className={`p-2 bg-emerald-200 cursor-pointer ${
                    selectedAns === elm ? "bg-emerald-400" : "bg-emerald-200"
                  } rounded-sm`}
                  key={index}
                  role="button"
                  onClick={() => setSelectedAns(elm)}
                >
                  <p>{elm}</p>
                </div>
              );
            })}
          </div>
        </section>
        <Divider sx={{ width: "100%", mt: 6 }} />
        <div className="w-[100%] flex justify-end px-4">
          {console.log(questionNo, excerciseLen)}
          {questionNo < excerciseLen ? (
            <button
              className="p-3 mt-3 mb-1 bg-primary text-emerald-100 rounded-md"
              onClick={handleNextQuestion}
            >
              {" "}
              {loading ? "Getting next question..." : "Save & next"}
            </button>
          ) : (
            <button
              className="p-3 mt-3 mb-1 bg-primary text-emerald-100 rounded-md"
              onClick={handleSubmitTest}
            >
              {" "}
              {loading ? "Submitting test..." : "Submit test"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default TestPage;
