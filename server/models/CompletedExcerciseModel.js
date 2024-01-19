import mongoose from 'mongoose';

const CompletedExcerciseSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:"User", require:true},
    language:{ type: String, require: true},
    excerciseNo:{ type: String, require: true},
    score:{type: Number, require: true},
    maxScore:{type: Number, require: true},
    proficiency:{ type: String, require: true}
}, {timestamps: true,})

const CompletedExcerciseModel = mongoose.model('CompletedExcercise', CompletedExcerciseSchema);

export default CompletedExcerciseModel