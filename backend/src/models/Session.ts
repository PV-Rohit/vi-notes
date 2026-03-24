import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    keystrokes: [{
        timing: Number, // gap between previous and this keypress/release
        duration: Number, // time held down
    }],
    pasteCount: {
        type: Number,
        default: 0
    },
    pastedLength: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model('Session', sessionSchema);
