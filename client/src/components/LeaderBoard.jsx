import { Container, FormControl, MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import CustomSnackbar from "./CustomSnackbar";
import axios from "axios";
import { languages } from "../assets/languages";
import NotingToShowHere from "./NotingToShowHere";
import LoadingPage from "./LoadingPage";

function LeaderBoard() {
  const { setSnackbar } = useContext(QuizContext);
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [selectedLang, setSelectedLang] = useState("Hindi");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log(selectedLang)
    axios
      .get("/excercise/leader_board?language=" + selectedLang)
      .then((res) => {
        setLeaderBoard(res?.data?.content?.data);
        setLoading(false)
      })
      .catch((err) => {
        setSnackbar((prev) => {
          return { ...prev, open: true, message: "Server error occured.." };
        });
        setLoading(false)
      });
  }, [selectedLang]);

  const changeDateFormat = (date) => {
    const inputDate = new Date(date);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      inputDate
    );

    return formattedDate;
  }

  return (
    <>
      <CustomSnackbar />
      <Container>
        <h1 className="text-2xl mt-3 text-primary font-semibold">
          {" "}
          Leaderboard{" "}
        </h1>
        <main>
          <FormControl
            sx={{
              my: 1,
              minWidth: 120,
              width: { lg: "20%", md: "30%", sm: "50%", xs: "100%" },
              color: "#D1FAE5",
            }}
          >
            <Select
              value={selectedLang}
              onChange={(event) => setSelectedLang(event.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                backgroundColor: "#083156",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSvgIcon-root": {
                  color: "#D1FAE5",
                },
                ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                  {
                    display: "flex",
                    gap: "10px",
                    fontFamily: "Poppins, sans-serif",
                  },
              }}
              className="shadow-md"
            >
              {languages?.map((obj, index) => {
                return (
                  <MenuItem
                    value={obj?.language}
                    key={index}
                    sx={{
                      display: "flex",
                      gap: "10px",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <img
                      src={obj?.icon}
                      alt="icon"
                      className="h-[20px] w-[20px]"
                    />
                    <p className="text-sm text-emerald-200 ">{obj?.language}</p>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {!loading ? 
          <div className="felx flex-col gap-5 rounded-md mt-4">
            {leaderBoard.length > 0 ?
              leaderBoard.map((leader) => {
                return (
                  <div className="bg-emerald-200 flex justify-between rounded-md px-4 py-3 items-center hover:bg-emerald-300 xs:w-[100%] csm:w-[100%] sm:w-[100%] bdsm:w-[50%] mt-2">
                    <section className="flex gap-4 ">
                      <div className="text-emerald-100 text-[1.5rem] font-semibold bg-primary px-4 py-1 rounded-[100px] h-12 w-12 mt-2">
                        {leader?.userName.charAt(0).toUpperCase()}
                      </div>
                      <div className="">
                        <p className=" text-primary mt-2">{leader?.userName}</p>
                        <p className=" text-primary text-sm">{leader?.email}</p>
                        <p className=" text-sm text-gray-400 mt-3">Joined at: {changeDateFormat(leader?.createdAt)}</p>
                      </div>
                    </section>
                    <p className="text-primary text-lg font-semibold">
                      {" "}
                      Score: {leader?.score}
                    </p>
                  </div>
                );
              })
            :
            <NotingToShowHere height={60}/>
            }
          </div>
          :
          <LoadingPage height="50vh"/>
          }
        </main>
      </Container>
    </>
  );
}

export default LeaderBoard;
