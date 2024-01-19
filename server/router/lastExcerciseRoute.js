import express from "express";
import {createAndUpdateLastCompletedExcercise} from '../controllers/LastExcerciseController.js'

//Middleware to very token and add user id to the req object if the user is valid
import verifyToken from "../middleware/tokenVerify.js";
const router = express.Router();


router.post("/last_excercise/create", verifyToken, createAndUpdateLastCompletedExcercise)

export default router;