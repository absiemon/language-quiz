import LastExcerciseModel from "../models/LastExcerciseModel.js";
import QuestionModel from "../models/QuestionModel.js";
import { createCompletedExcercise } from "./CompletedExcerciseController.js";
import { createAndUpdateLastCompletedExcercise } from "./LastExcerciseController.js";

//storing currentExcercise questions so that marks can be evaluated after test completion.
let currentExcerciseQuestions = [];

export const getAllQuestions = async (req, res) => {
  const { language, questionNo } = req.query;
  try {
    //getting the user from req object embedded by middleware after verification of token
    const user = req.user;
    const userId = user?._id.toString();

    if (currentExcerciseQuestions.length === 0) {
      //getting last completed excercise by the user for the given language.
      const completedExcercises =
        (await LastExcerciseModel.findOne({ userId, language }))?.lastExcercise || 0;
      //getting all the questions for the next excercise of given language

      const allQuestions = await QuestionModel.find({
        language,
        excerciseNumber: completedExcercises + 1,
      }).sort({ difficultyLevel: 1 });

      currentExcerciseQuestions = allQuestions;
    }

    const { question, options, difficulty, point, excerciseNumber } =
      currentExcerciseQuestions[questionNo - 1];

    const newObject = {
      question,
      options,
      difficulty,
      point,
      excerciseNumber,
    };
    const response = {
      status: true,
      content: {
        data: newObject,
      },
      excerciseLength: currentExcerciseQuestions?.length || 0
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(422).json({ error: "Error", details: error.message });
  }
};

export const MarksEvaluation = async (req, res) => {
  const { language, excerciseNumber, submittedAns } = req.body;
  try {
    //getting the user from req object embedded by middleware after verification of token
    const user = req.user;
    const userId = user?._id;

    if (currentExcerciseQuestions.length > 0) {
      //Evaluating Marks.
      let totalMarks = 0;
      let MaxMarks = 0;

      for (let i = 0; i < currentExcerciseQuestions.length; i++) {
        const question = currentExcerciseQuestions[i];
        MaxMarks += question?.point;
        if (question?.answer === submittedAns[i]?.answer) {
          totalMarks += question.point;
        }
      }

      currentExcerciseQuestions = [];

      // saving completed Excercise and its marks in completedExcercise table.
      await createCompletedExcercise({
        userId,
        excerciseNo: excerciseNumber,
        language,
        score: totalMarks,
        maxScore: MaxMarks,
      });

      //saving completed Excercise in Last completed excercise table.
      await createAndUpdateLastCompletedExcercise({
        userId,
        excerciseNo: excerciseNumber,
        language,
      });
      const response = {
        status: true,
        content: {
          totalScore: totalMarks,
          maxScore: MaxMarks,
        },
      };

      return res.status(200).json(response);
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    return res.status(422).json({ error: "Error", details: error.message });
  }
};

export const cleanUp = async (req, res) => {
  try {
    //getting the user from req object embedded by middleware after verification of token
    currentExcerciseQuestions = [];
    const response = {
      status: true,
      content: {
        data: "Cache cleared successfully",
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(422).json({ error: "Error", details: error.message });
  }
};