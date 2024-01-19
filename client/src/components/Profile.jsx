import { Container } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";
import CustomSnackbar from "./CustomSnackbar";

function Profile() {
  const { setSnackbar, user} = useContext(QuizContext);

  //Function to reset history.
  const handleClearHistory = async () => {
    const token = localStorage.getItem("token");

    const process_something = window.confirm(
      "Are you sure you want to delete history?"
    );
    if (process_something) {
      await axios
        .delete("/excercise/history/delete", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setSnackbar((prev) => {
            return {
              ...prev,
              open: true,
              message: "History delete successfully",
            };
          });
        })
        .catch((err) => {
          setSnackbar((prev) => {
            return { ...prev, open: true, message: "Server error occured.." };
          });
        });
    }
  };

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
    <CustomSnackbar/>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <h1 className="text-2xl text-primary font-semibold">Profile</h1>
        <div className="p-2 mt-4 bg-emerald-200 rounded-md h-[280px] xs:w-[100%] bdsm:w-[500px] flex flex-col items-center ">
          <div className="text-emerald-100 text-[1.5rem] font-semibold bg-primary px-6 py-3 rounded-[100px] h-16 w-16 mt-2">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-xl text-primary mt-4">{user?.name}</h1>
          <h1 className="text-sm text-primary mt-1">{user?.email}</h1>
          <h1 className="text-sm text-gray-500 mt-3">Joined at: {changeDateFormat(user?.created_at)}</h1>

          <div className="flex gap-4">
            <button
              className="p-3 mt-5 mb-1 bg-primary text-emerald-100 rounded-md"
              onClick={handleClearHistory}
            >
              {" "}
              Clear history
            </button>
            <button
              className="p-3 mt-5 mb-1 bg-primary text-emerald-100 rounded-md"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              {" "}
              Log out
            </button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Profile;
