import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import ProductModel from "../modules/productModel.js";
import UserModel from './../modules/userModel.js';
import bcrypt from "bcrypt";
import "dotenv/config";


// -------------- Add Product -------------- //
const addProductHandler = async (req, res) => {
  const { userDetails, title, description, price, discount, type, category,
    subCategory, sizes, color } = await req.body;
  const images = await req.files;
  const image1 = images.image1 && images.image1[0];
  const image2 = images.image2 && images.image2[0];
  const image3 = images.image3 && images.image3[0];
  const image4 = images.image4 && images.image4[0];
  const arrOfImages = [image1, image2, image3, image4].filter((item) => item !== undefined);

  const schema = z.object({
    title: z.string({ required_error: "Title Is Requied." }).min(2, { message: "Title Must Be At Least 2 Characters." }),
    description: z.string({ required_error: "Descriptio Is Required." }).min(2, { message: "Descripton Must Be At Least 2 Characters." }),
    price: z.string({ required_error: "Price Is Required." }).min(0),
    discount: z.string({ required_error: "Discount Is Required." }).min(0),
    type: z.string({ required_error: "Type Is Required." }).min(2, { message: "Type Must Be At Least 2 Characters." }),
    category: z.string({ required_error: "Category Is Requried." }).min(2, { message: "Category Must Be At Least 2 Characters." }),
    color: z.string({ required_error: "Color Is Required." }).min(2, { message: "Color Must Be At Least 2 Characters." })
  });

  const validation = schema.safeParse({ userDetails, title, description, price, discount, type, category, color });

  if (!validation.success) {
    return res.status(400).json({ success: false, message: validation.error.errors[0].message });
  }

  // Upload Image To Cloudainry And Return Secure_url
  const images_url = await Promise.all(
    arrOfImages.map(async (image) => {
      try {
        const result = await cloudinary.uploader.upload(image.path, { resource_type: "image" });
        return result.secure_url;
      } catch (error) {
        console.log(error);
        return null;
      }

    }));

  // Create new Porudct
  if (type === "fashion") {
    const newProduct = new ProductModel({
      userId: userDetails.id,
      title: title,
      description: description,
      images: images_url,
      price: Number(price),
      discount: Number(discount),
      type: type,
      category: category,
      subCategory: subCategory,
      sizes: JSON.parse(sizes),
      color: color
    });
    // Save Product
    const product = await newProduct.save();
    return res.status(200).json({ success: true, product: product, message: "Product Added Successfully." });
  } else {
    const newProduct = new ProductModel({
      userId: userDetails.id,
      title: title,
      description: description,
      images: images_url,
      price: Number(price),
      discount: Number(discount),
      type: type,
      category: category,
      color: color
    });
    // Save Product
    const product = await newProduct.save();
    return res.status(200).json({ success: true, product: product, message: "Product Added Successfully." });
  }

};


// -------------- Get Product Based On User Or Admin -------------- //
const getProductsListDashboard = async (req, res) => {
  try {
    const { userDetails } = await req.body;
    console.log(userDetails);
    // Get User From DB
    const user = await UserModel.findById(userDetails.id);

    // Compare UserPw From DB With PW Coming From Token
    const comparePassword = await bcrypt.compare(process.env.ADMIN_PASSWORD, user.password);

    if (user && comparePassword) {
      const products = await ProductModel.find({});
      return res.status(200).json({ success: true, products: products });
    } else {
      const products = await ProductModel.find({ userId: userDetails.id });
      return res.status(200).json({ success: true, products: products });
    }


  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

// Get Products List Frontend
const getProductsListFrontend = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    return res.status(200).json({ success: true, products: products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

// -------------- Delete Product Based On User Or Admin -------------- //
const deleteProduct = async (req, res) => {
  const { userDetails, productId } = await req.body;
  const user = await UserModel.findById(userDetails.id);
  const product = await ProductModel.findById(productId);
  const comparePassword = await bcrypt.compare(process.env.ADMIN_PASSWORD, user.password);
  try {
    if (user._id.toString() === product.userId || user.email === process.env.ADMIN_EMAIL && comparePassword) {
      await ProductModel.findByIdAndDelete(productId);
      return res.status(200).json({ success: true, message: "Product Deleted Successfully." });
    } else {
      return res.status({ success: false, message: "Your Don't Have Permission To Access This Resources." });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error.message}` });
  }
};

// -------------- Get Single Product Based On ID -------------- //
const getSingleProduct = async (req, res) => {
  try {
    const { productId } = await req.body;
    const product = await ProductModel.findById(productId);
    return res.status(200).json({ success: true, product: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: `Internal Server Error => ${error}` });
  }
};

// Update Sizes In Products
const updatedSizes = async (req, res) => {
  const { newSizes } = await req.body;

  const products = await ProductModel.updateMany(
    { type: "fashion" },
    { $set: { sizes: JSON.parse(newSizes) } }
  );
  return res.status(200).json({ success: true, products: products, message: "updated successfully!" });

};

export {
  addProductHandler,
  getProductsListDashboard,
  deleteProduct,
  getProductsListFrontend,
  getSingleProduct,
  updatedSizes
};