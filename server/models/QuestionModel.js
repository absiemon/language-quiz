import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    language:{type: String, require:true},
    question:{ type: String, require: true},
    options:[
        { type: String, require: true},
    ],
    answer:{ type: String, require: true},
    difficulty:{ type: String, require: true},
    difficultyLevel: { type: Number, require: true},
    point: { type: Number, require: true},
    excerciseNumber:{ type: Number, require: true}
    
}, {timestamps: true,})

// Defining a index on the 'language' field
QuestionSchema.index({ language: 1 });

const QuestionModel = mongoose.model('Question', QuestionSchema);

export default QuestionModel