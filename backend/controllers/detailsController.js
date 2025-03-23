import UserModel from '../modules/userModel.js';
import ProductModel from '../modules/productModel.js';
import OrderModel from '../modules/orderModel.js';
import ReviewModel from '../modules/reviewsModel.js';
import bcrypt from 'bcrypt';
import "dotenv/config";

// Get Products Count
const productsCount = async (req, res) => {
  const { userDetails } = await req.body;
  const user = await UserModel.findById(userDetails.id);
  const comparePassword = await bcrypt.compare(process.env.ADMIN_PASSWORD, user.password);

  if (user && user.email === process.env.ADMIN_EMAIL && comparePassword) {
    const products = await ProductModel.find({});
    const Users = await UserModel.find({});
    const orders = await OrderModel.find({});
    const reviews = await ReviewModel.find({});
    let ordersProfit = 0;
    orders.map((order) => {
      ordersProfit += order.amount;
    });
    const details = {
      productsCount: products.length,
      usersCount: Users.length,
      ordersCount: orders.length,
      reviewsCount: reviews.length,
      ordersProfit: ordersProfit
    };
    return res.status(200).json({ success: true, details: details });
  } else {
    const products = await ProductModel.find({ userId: userDetails.id });
    const reviews = await ReviewModel.find({ userId: userDetails.id });
    const details = {
      productsCount: products.length,
      reviewsCount: reviews.length
    };
    return res.status(200).json({ success: true, details });
  }
};

export { productsCount };