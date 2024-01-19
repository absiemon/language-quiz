import { Snackbar } from "@mui/material";
import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

// Component to messages
function CustomSnackbar() {
    const {snackbar, handleClose} = useContext(QuizContext)
    const {vertical, horizontal, open, message} = snackbar;

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={1000000}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        sx={{
            '& .css-1eqdgzv-MuiPaper-root-MuiSnackbarContent-root':{
                backgroundColor:'#083156',
                color:'#D1FAE5',
                fontFamily: "'Poppins', sans-serif",
            }
        }}
      />
    </>
  );
}

export default CustomSnackbar;
