import CompletedExcerciseModel from "../models/CompletedExcerciseModel.js";
import LastExcerciseModel from "../models/LastExcerciseModel.js";

export const createCompletedExcercise = async (body) => {
  const { userId, excerciseNo, language, score, maxScore } = body;

  if (!userId || !excerciseNo || !language || !score || !maxScore) {
    throw new Error("All Fields are required");
  }
  try {
    const marks = score / maxScore;
    const proficiency = (marks.toFixed(2) * 100).toString();
    console.log(proficiency);

    const data = new CompletedExcerciseModel({
      userId,
      excerciseNo,
      language,
      score,
      maxScore,
      proficiency,
    });
    await data.save();

    return data;
  } catch (err) {
    throw new Error({ error: "Error", details: err.message });
  }
};

export const getAllCompletedExcercise = async (req, res) => {
  try {
    //getting the user from req object embedded by middleware after verification of token
    const user = req.user;
    const userId = user?._id;
    //getting all Completed Excercises for all languages that user has attempted test.
    const allCompletedExcercises = await CompletedExcerciseModel.find({
      userId,
    });

    const groupedByLanguage = allCompletedExcercises.reduce((acc, obj) => {
      const language = obj.language;
      if (!acc[language]) {
        acc[language] = [];
      }
      acc[language].push(obj);
      return acc;
    }, {});

    // Converting the groupedByLanguage object into an array of objects
    const resultArray = Object.keys(groupedByLanguage).map((language) => ({
      [language]: groupedByLanguage[language],
    }));

    const response = {
      status: true,
      content: {
        data: resultArray,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(422).json({ error: "Error", details: error.message });
  }
};

export const deleteUserHistory = async (req, res) => {
  try {
    //getting the user from req object embedded by middleware after verification of token
    const user = req.user;
    const userId = user?._id;
    //getting all Completed Excercises for all languages that user has attempted test.
    await CompletedExcerciseModel.deleteMany({ userId });
    await LastExcerciseModel.deleteMany({ userId });
    const response = {
      status: true,
      content: {
        data: "History deletd successfully",
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(422).json({ error: "Error", details: error.message });
  }
};

export const leaderBoard = async (req, res) => {
  const { language } = req.query;

  try {
    const result = await CompletedExcerciseModel.aggregate([
      {
        $match: {
          language: language,
        },
      },
      {
        $group: {
          _id: "$userId",
          language: { $first: "$language" },
          scoreSum: { $sum: "$score" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          userName: "$user.name",
          email: "$user.email",
          createdAt: "$user.createdAt",
          language: 1,
          score: "$scoreSum",
        },
      },
      {
        $sort: {
          score: -1,
        },
      },
    ]);

    const response = {
      status: true,
      content: {
        data: result,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(422).json({ error: "Error", details: error.message });
  }
};

