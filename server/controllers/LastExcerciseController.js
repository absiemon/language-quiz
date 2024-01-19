import LastExcerciseModel from "../models/LastExcerciseModel.js";

export const createAndUpdateLastCompletedExcercise = async (body) => {
  const { userId, excerciseNo, language } = body;

  if (!excerciseNo || !language) {
    throw new Error ("All Field is required" );
  }
  try {

    // if user has not completed any excercise then create a LastExcercise else update its last completed excercise
    const insertionData = {
      userId,
      lastExcercise: excerciseNo,
      language: language,
    };
    const data = await LastExcerciseModel.findOneAndUpdate(
      { userId, language },
      { $set: insertionData },
      { upsert: true }
    );

    return data;
  } catch (err) {
    throw new Error({ error: "Error", details: err.message });
  }
};
