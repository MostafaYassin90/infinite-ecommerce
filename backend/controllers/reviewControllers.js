import UserModel from './../modules/userModel.js';
import ReviewModel from '../modules/reviewsModel.js';
import ProductModel from './../modules/productModel.js';
import bcrypt from 'bcrypt';

// --------------  Add Review --------------
const addReview = async (req, res) => {
  const { userDetails, productId, text, ratings } = await req.body;

  // Get User
  const user = await UserModel.findById(userDetails.id);

  // Get Order
  const product = await ProductModel.findById(productId);

  // Create New Review
  const newReview = new ReviewModel({
    productId: productId,
    userId: userDetails.id,
    productData: product,
    userData: user,
    text: text,
    ratings: ratings
  });
  const review = await newReview.save();

  // ** Update userRatings in product
  let userRatingsData = await product.userRatings; // []

  userRatingsData.push({
    userId: userDetails.id,
    userData: user,
    text: text,
    ratings: ratings,
    createdAt: new Date()
  });

  await ProductModel.findByIdAndUpdate(productId, { userRatings: userRatingsData });

  return res.status(200).json({ success: true, review: review, message: "Product Review Added Successfully." });
};

// -------------- Get All Review For Frontend --------------
const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({});
    return res.status(200).json({ success: true, reviews: reviews });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ sucess: false, message: `Internal Server Error => ${error}` });
  }
};

// -------------- Get Review Dashboard --------------
const getReviewsDashboard = async (req, res) => {

  try {
    const { userDetails } = await req.body;

    // Get User
    const user = await UserModel.findById(userDetails.id);
    const comparePassword = await bcrypt.compare(process.env.ADMIN_PASSWORD, user.password);
    if (user && user.email === process.env.ADMIN_EMAIL && comparePassword) {
      const reviews = await ReviewModel.find({});
      return res.status(200).json({ success: true, reviews: reviews });
    } else {
      const reviews = await ReviewModel.find({ userId: userDetails.id });
      return res.status(200).json({ success: true, reviews: reviews });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: `Internal Serevr Error => ${error}` });
  }

};

// -------------- Delete Review Dashboard --------------
const deleteReview = async (req, res) => {
  const { userDetails, reviewId } = await req.body;
  const user = await UserModel.findById(userDetails.id);
  const review = await ReviewModel.findById(reviewId);
  const comparePassword = await bcrypt.compare(process.env.ADMIN_PASSWORD, user.password);

  if (user && user.email === process.env.ADMIN_EMAIL && comparePassword) {
    await ReviewModel.findByIdAndDelete(reviewId);
    return res.status(200).json({ success: true, message: "Review Deleted Successfully." });
  } else {
    if (review.userId === userDetails.id) {
      return res.status(201).json({ success: true, message: "You Can't Delete Your Review From Dashboard." });
    }
  }

};

// -------------- Delete Review FrontEnd --------------
const deleteReviewFrontEnd = async (req, res) => {
  const { userDetails, reviewId } = await req.body;
  const review = await ReviewModel.findById(reviewId);
  if (review && userDetails.id === review.userId) {
    await ReviewModel.findByIdAndDelete(reviewId);
    return res.status(200).json({ success: true, message: "Review Deleted Successfully." });
  } else {
    return res.status(200).json({ success: true, message: "You Can't Delete This Review." });
  }
};

export { addReview, getAllReviews, getReviewsDashboard, deleteReview, deleteReviewFrontEnd };