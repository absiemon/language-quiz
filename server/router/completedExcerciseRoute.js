import express from "express";
import {createCompletedExcercise, deleteUserHistory, getAllCompletedExcercise, leaderBoard} from '../controllers/CompletedExcerciseController.js'

//Middleware to very token and add user id to the req object if the user is valid
import verifyToken from "../middleware/tokenVerify.js";
const router = express.Router();


router.post("/excercise/create", verifyToken, createCompletedExcercise)
router.get("/excercise/getAll", verifyToken, getAllCompletedExcercise)
router.delete("/excercise/history/delete", verifyToken, deleteUserHistory)
router.get("/excercise/leader_board", leaderBoard)



export default router;