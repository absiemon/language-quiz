import express from "express";
import {cleanUp, getAllQuestions, MarksEvaluation} from '../controllers/QuestionsController.js'

//Middleware to very token and add user id to the req object if the user is valid
import verifyToken from "../middleware/tokenVerify.js";
const router = express.Router();


router.get("/get", verifyToken, getAllQuestions)
router.post("/excercise/marks_evaluation", verifyToken, MarksEvaluation)

router.delete('/cleanup', cleanUp)

export default router;