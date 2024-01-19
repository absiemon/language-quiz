import mongoose, { Mongoose } from 'mongoose';

const LastExcerciseSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:"User", require:true},
    lastExcercise:{ type: Number, require: true},
    language:{ type: String, require: true},
}, {timestamps: true,})

const LastExcerciseModel = mongoose.model('LastExcercise', LastExcerciseSchema);

export default LastExcerciseModel