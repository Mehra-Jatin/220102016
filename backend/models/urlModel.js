import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
     shortcode: {
    type: String,
    required: true,
    unique: true
  },
    createdAt: {
        type: Date,
        default: Date.now
    },
    clicks: [{
        type: mongoose.Schema.Types.ObjectId,   
        ref: "Click"
    }]
}, { timestamps: true });


export default mongoose.model("Url", urlSchema);
