import mongoose from "mongoose";

// Review Schema
const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  userId: { type: String, required: true },
  productData: { type: Object, required: true },
  userData: { type: Object, required: true },
  text: { type: String, required: true },
  ratings: { type: Number, required: true },
}, { timestamps: true });

// Review Model
const ReviewModel = mongoose.models.review || mongoose.model("Review", reviewSchema);

export default ReviewModel;