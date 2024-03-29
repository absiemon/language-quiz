import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import connectDB from "./config/dbConnection.js";
import QuestionModel from './models/QuestionModel.js';

import authRouter from './router/authRouter.js'
import questionRoute from './router/questionRoute.js'
import completedExcerciseRoute from "./router/completedExcerciseRoute.js"


// Reading json file available in data/data.json. All questions are there
import { readFile } from 'fs/promises'; 
const data = await readFile('./data/data.json', 'utf-8');
const questionData = JSON.parse(data);

// setting up express server
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({
  parameterLimit: 100000,
  limit: '50mb'
}))
app.use(morgan());
app.disable('etag')

//// setting up cors. Only allowed origin can make api request
const allowedOrigins = ['https://client-language-quiz.onrender.com'];
const corsOptions = {
    credentials: true,
    origin: allowedOrigins,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization, Cookie'
};

app.use(cors(corsOptions));

await connectDB();

// Function to populate MongoDB with seed data of all questions
const addMockData = async () => {
  try {
    
    const questions = await QuestionModel.find({});
    if(questions.length === 0){
    // Removing existing data from the collection
      await QuestionModel.deleteMany();
  
      // Inserting mock data of questions into the collection
      await QuestionModel.insertMany(questionData);
      console.log('mock data added to MongoDB');
    }
  } catch (error) {
    console.error('Error populating database:', error);   
  }
};

//routes
app.use('/v1/auth', authRouter);
app.use('/v1/questions', questionRoute);
app.use('/v1', completedExcerciseRoute);


const port = process.env.PORT || 8000;
await addMockData();

const server = app.listen(port);
