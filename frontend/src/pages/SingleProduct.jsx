import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import RelatedProducts from '../components/RelatedProducts';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { reviewResponsive } from '../assets/assets';
import LoadingPage from './LoadingPage/LoadingPage';
import { MdDelete } from "react-icons/md";

const SingleProduct = () => {
  const { allProducts, calculateAverageRatings, currency, calculateProductDiscount,
    addToCartItemsFashion, addToCartItems, removeToCartItemsFashion,
    removeToCartItems, cartItemsFashion, cartItems, addAndRemoveWishList, wishlistItems, backend_url, token } = useContext(AppContext);
  const { productId } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [text, setText] = useState("");
  const [ratings, setRatings] = useState(0);
  const [allReviews, setAllReviews] = useState([]);

  // Collect Product Data
  const [productSize, setProductSize] = useState("");

  // Get Single Product
  const getSingleProduct = async () => {
    try {
      const response = await axios.post(backend_url + "/api/product/single-product", { productId: productId });
      if (response.data.success) {
        setSingleProduct(response.data.product);
        setMainImage(response.data.product.images[0]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  // Add Review
  const addReviewHandler = async (productId) => {
    if (!text) {
      toast.info("Please Add Your Product Review");
      return null;
    }
    if (ratings === 0) {
      toast.info("Please Add Your Product Rates");
      return null;
    }
    try {
      const reviewDetails = {
        productId: productId,
        text: text,
        ratings: ratings
      };
      const response = await axios.post(backend_url + "/api/review/add", reviewDetails, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        getSingleProduct();
        getAllReviews();
        toast.success(response.data.message);
        setText("");
        setRatings(0);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
    getAllReviews();
  };

  // Get All Reviews
  const getAllReviews = async () => {
    try {
      const response = await axios.get(backend_url + "/api/review/list");
      if (response.data.success) {
        setAllReviews(response.data.reviews);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  // Delete Review
  const deleteReview = async (reviewId) => {
    try {
      const response = await axios.post(backend_url + "/api/review//delete-frontend", { reviewId: reviewId }, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        getAllReviews();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllReviews();
  }, [allProducts, productId]);

  return (
    <div className='relative my-16 min-h-[70vh] px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {
        singleProduct
          ?
          <>
            <div className='flex flex-col sm:flex-row items-start gap-10 sm:gap-20'>
              {/* Left Side */}
              <div className='w-full sm:w-[35%] flex items-start gap-5'>
                {/* Multi Images */}
                <div className='flex flex-col gap-2 w-[15%] sm:h-[500px]'>
                  {
                    singleProduct.images.map((image, index) => (
                      <div className='flex items-end justify-center' key={index}>
                        <img src={image} alt='product-image' key={index} className='max-h-[100%] max-w-[100%] cursor-pointer' onClick={() => { setMainImage(image); }} />
                      </div>
                    ))
                  }
                </div>
                {/* Main Image */}
                <div className='w-full max-h-[500px] flex justify-center'>
                  <img src={mainImage} alt='product-image' className='' />
                </div>
              </div>
              {/* Right Side */}
              <div className='w-full sm:w-[50%]'>
                <p className='text-xl text-gray-800 mb-2 font-semibold'>{singleProduct.title}</p>
                <p className='text-gray-600 w-[70%] font-medium'>{singleProduct.description}</p>
                {/* Ratings */}
                <div className='flex gap-3 items-center mb-3'>
                  <div className='flex items-center gap-1'>
                    <p className='text-[15px] text-gray-700'>{calculateAverageRatings(singleProduct)}</p>
                    <div className='flex text-2xl'>
                      {
                        [1, 2, 3, 4, 5].map((star, index) => {
                          const starValue = star;
                          return <p key={index} className={`${calculateAverageRatings(singleProduct) >= starValue ? "text-yellow-600" : "text-gray-400"}`}>&#9733;</p>;
                        })
                      }
                    </div>
                  </div>
                  <p className='text-[15px] text-gray-700'>({singleProduct.userRatings ? singleProduct.userRatings.length : 0})</p>
                </div>
                {/* Price */}
                <div>
                  <div className='flex  items-center gap-2 font-semibold'>
                    <p className='text-red-700'>-{singleProduct.discount} Off</p>
                    <p className='text-2xl text-gray-700'>{currency}{calculateProductDiscount(singleProduct.price, singleProduct.discount)}</p>
                  </div>
                  <p className='text-xl text-gray-600 line-through'>{currency}{singleProduct.price}</p>
                </div>
                <hr className='border-none h-[1px] w-full bg-gray-200 my-4' />
                {/* Type Category color brand */}
                <div className='flex flex-col gap-1 text-gray-600 font-medium'>
                  <p className='capitalize'><span className='text-gray-900 capitalize'>Type:</span> {singleProduct.type}</p>
                  <p className='capitalize'><span className='text-gray-900 capitalize'>Category:</span> {singleProduct.category}</p>
                  {singleProduct.subCategory && <p className='capitalize'><span className='text-gray-900 capitalize'>SubCategory:</span> {singleProduct.subCategory}</p>}
                  <p className='capitalize'><span className='text-gray-900 capitalize'>Color:</span> {singleProduct.color}</p>
                </div>
                {/* If This Product Is Fashion We Shoud Add Sizes */}
                {
                  singleProduct.type === "fashion" ?
                    <div className='flex items-center gap-2 my-5'>
                      {
                        singleProduct.sizes.map((size, index) => (
                          <p key={index} className={`index  border border-gray-300 rounded-md py-2 px-3 cursor-pointer ${productSize === size ? "bg-black text-white" : ""}`} onClick={() => { setProductSize(size); }}>{size}</p>
                        ))
                      }
                    </div>
                    : null
                }
                {/* Add To Cart & Add To Wishlist */}
                <div className='flex flex-col gap-3 mt-5'>
                  <button onClick={() => {
                    if (singleProduct.type === "fashion") {
                      if (productSize) {
                        addToCartItemsFashion(singleProduct._id, productSize);
                      } else {
                        toast.info("Please Select Your Product Size.");
                      }
                    } else {
                      addToCartItems(singleProduct._id);
                    }
                  }} className='h-[42px] py-1.5 px-7 border border-gray-100 text-[15px] font-medium bg-black rounded-md text-white w-[180px] transition-all duration-300 hover:bg-[#454545]'>Add To Cart</button>
                  {
                    wishlistItems.includes(singleProduct._id)
                      ?
                      <button onClick={() => { addAndRemoveWishList(singleProduct._id); }} className='h-[42px] py-1.5 px-2 border border-gray-100 text-red-700 text-sm font-medium bg-gray-300 w-[180px] rounded-md transition-all duration-300 hover:bg-[#aaa]'>Remove From WishList</button>
                      :
                      <button onClick={() => { addAndRemoveWishList(singleProduct._id); }} className='h-[42px] py-1.5 px-7 border border-gray-100 text-[15px] font-medium bg-gray-300 w-[180px] rounded-md transition-all duration-300 hover:bg-[#aaa]'>Add To WishList</button>
                  }
                </div>
              </div>
            </div>

            {/* Add Customer Ratings */}
            <div className='mt-10'>
              <p className='text-xl font-semibold mb-5'>Add Ratings</p>
              <div className='w-full md:w-[500px]'>
                <textarea type='text' placeholder='Type Here' className='resize-none block w-full py-2 px-3 border border-gray-300 outline-primary rounded-md'
                  onChange={(event) => { setText(event.target.value); }} value={text}
                />
                <div className='flex items-center justify-between mt-2'>
                  <div className='flex text-2xl gap-[2px]'>
                    {
                      [1, 2, 3, 4, 5].map((star, index) => {
                        const starValue = star;
                        return <p key={star} className={`${ratings >= star ? "text-yellow-600" : "text-gray-500"} cursor-pointer`}
                          onClick={() => { setRatings(star); }}>&#9733;</p>;
                      })
                    }
                  </div>
                  <button onClick={() => { addReviewHandler(singleProduct._id); }} className='bg-black text-white py-1 px-4 rounded-md'>Send</button>
                </div>
              </div>
            </div>

            {/* Customers Reviews */}
            <div className='my-10'>
              <p className='text-gray-800 font-semibold text-xl mb-5'>Customers' reviews</p>
              <Carousel responsive={reviewResponsive}>
                {
                  allReviews.map((review, index) => {
                    if (review.productId === singleProduct._id) {
                      return (
                        <div key={index} className='border border-gray-300 shadow-md p-5 rounded-md mr-3'>
                          <div className='flex items-center gap-2'>
                            <img src={review.userData.image} alt='user-image' className='w-14 p-1 rounded-full border border-primary bg-gray-100' />
                            <div>
                              <p>{review.userData.username}</p>
                              <div className='flex text-xl'>
                                {[1, 2, 3, 4, 5].map((star, index) => (
                                  <p key={index} className={`${review.ratings >= star ? "text-yellow-600" : "text-gray-500"}`}>&#9733;</p>
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className='text-center mt-5 mb-5 text-gray-800'>{review.text}</p>
                          <p className='text-gray-700 text-[15px]'>{new Date(review.createdAt).toLocaleDateString()}</p>
                          <div className='flex items-center justify-end text-xl'>
                            <MdDelete className='text-xl cursor-pointer text-red-700 transition-all duration-300 hover:scale-105'
                              onClick={() => { deleteReview(review._id); }}
                            />
                          </div>
                        </div>
                      );
                    }
                  })
                }
              </Carousel>
            </div>

            {/* Related Products */}
            <RelatedProducts category={singleProduct.category} singleProduct={singleProduct} />
          </>
          : <LoadingPage />
      }
    </div>
  );
};

export default SingleProduct;

//&#9733;