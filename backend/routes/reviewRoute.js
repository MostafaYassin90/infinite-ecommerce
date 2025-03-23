import express from "express";
import userAuth from "../middlewares/UserAuth.js";
import { addReview, deleteReview, deleteReviewFrontEnd, getAllReviews, getReviewsDashboard } from "../controllers/reviewControllers.js";

const reviewRouter = express.Router();


reviewRouter.post("/add", userAuth, addReview);

reviewRouter.get("/list", getAllReviews);

reviewRouter.post("/list-dashboard", userAuth, getReviewsDashboard);

reviewRouter.post("/delete-dashboard", userAuth, deleteReview);

reviewRouter.post("/delete-frontend", userAuth, deleteReviewFrontEnd);

export default reviewRouter;