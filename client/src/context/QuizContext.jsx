import { createContext, useLayoutEffect, useState } from "react";

export const QuizContext = createContext({});

export const QuizProvider = ({ children }) => {

  const [isAppLoading, setisAppLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [optLanguage, setOptLanguage] = useState()
  const [questionNo, setQuestionNo] = useState(1)
  const [question, setQuestion] = useState({})
  const [excerciseLen, setExcerciseLen] = useState(0)

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
    message: ""
  })
  const handleClose = () => {
    setSnackbar((prev) => {
      return { ...prev, open: false };
    });
  };

  return (
    <QuizContext.Provider
      value={{
        isAuthenticated, 
        setIsAuthenticated,
        optLanguage, setOptLanguage,
        user, setUser, questionNo, setQuestionNo, question, setQuestion, excerciseLen, setExcerciseLen,
        snackbar, setSnackbar, handleClose,
        isAppLoading, setisAppLoading
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
