import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import IndexPage from "./Pages/IndexPage";
import Layout from "./Layout";
import AuthPage from "./Pages/AuthPage";
import Home from "./components/Home";
import SelectLanguage from "./components/SelectLanguage";
import TestPage from "./components/Test";
import { useContext, useEffect, useState } from "react";
import { QuizContext } from "./context/QuizContext";
import axios from "axios";
import LoadingPage from "./components/LoadingPage";
import Performance from "./components/Performance";
import Profile from "./components/Profile";
import LeaderBoard from "./components/LeaderBoard";

// axios.defaults.baseURL = "http://localhost:8000/v1";
axios.defaults.baseURL = "https://server-language-quiz.onrender.com";

//If user is authorized then send user to the Protected Route else Navigate to auth page.
const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/auth" />;
};

function App() {
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated, setUser, isAppLoading, setisAppLoading } =
    useContext(QuizContext);

  //User verification through the token. 
  // May be a unauthorized user temper the token avaialable in local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsAuthenticated(true);
        setUser(res.data?.content?.data);
        setisAppLoading(false);
      })
      .catch((err) => {
        setisAppLoading(false);
        navigate("/");
      });
  }, []);

  return (
    <>
      {" "}
      {!isAppLoading ? (
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute
                  element={<Home />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/select_language"
              element={
                <ProtectedRoute
                  element={<SelectLanguage />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/test"
              element={
                <ProtectedRoute
                  element={<TestPage />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
             <Route
              path="/performance"
              element={
                <ProtectedRoute
                  element={<Performance />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
             <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={<Profile />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
             <Route
              path="/leaderboard"
              element={
                <ProtectedRoute
                  element={<LeaderBoard />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
          </Route>
        </Routes>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

export default App;
