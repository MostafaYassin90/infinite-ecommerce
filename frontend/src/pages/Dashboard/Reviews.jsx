import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";
import { AppContext } from './../../context/AppContext';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { backend_url, token } = useContext(AppContext);

  // Get Reviews
  const getReviews = async () => {
    try {
      const response = await axios.post(backend_url + "/api/review/list-dashboard", {}, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  // Delete Review
  const deleteReview = async (reviewId) => {
    try {
      const response = await axios.post(backend_url + "/api/review/delete-dashboard", { reviewId: reviewId }, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        if (response.status === 200) {
          toast.success(response.data.message);
          getReviews();
        } else {
          toast.info(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className='py-5 min-h-[70vh] px-[3vw] overflow-y-scroll flex flex-col gap-3'>
      {
        reviews.map((review, index) => (
          <div key={index} className='grid  md:grid-cols-[2fr_2fr_2fr_1fr_0.5fr] lg:grid-cols-[0.5fr_2fr_2fr_2fr_1fr_0.5fr] gap-4 text-sm items-center border border-gray-200 py-5 px-3 rounded-md shadow-md'>
            <p className='text-gray-800 font-semibold hidden flex-col items-center text-center gap-1 lg:flex'>{index + 1}</p>
            <div className='flex flex-col items-center text-center gap-1'>
              <img src={review.userData.image} alt='user-image' className='w-10' />
              <p className='text-gray-700'>Username: {review.userData.username}</p>
            </div>
            <div className='flex flex-col items-center text-center gap-1'>
              <img src={review.productData.images[0]} alt='product-image' className='w-10' />
              <p className='text-gray-700'>ProductName: {review.productData.title}</p>
            </div>
            <div className='flex flex-col items-center text-center gap-1'>
              <p className='text-gray-800'>{review.text}</p>
              <div className='flex text-xl'>
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <p key={index} className={`${review.ratings >= star ? "text-yellow-600" : "text-gray-500"}`}>&#9733;</p>
                ))}
              </div>
            </div>
            <p className='flex flex-col text-gray-800 items-center text-center gap-1'>CreatedAt: {new Date(review.createdAt).toLocaleDateString()}</p>
            <p onClick={() => { deleteReview(review._id); }} className='flex flex-col items-center text-center gap-1 w-[30px] h-[30px] mx-auto justify-center border-2 cursor-pointer transition-all duration-300 hover:bg-red-600 hover:text-white border-gray-400 rounded-full'>X</p>
          </div>
        ))
      }
    </div>
  );
};

export default Reviews;
