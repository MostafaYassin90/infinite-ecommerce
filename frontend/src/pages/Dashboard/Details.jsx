import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { AppContext } from './../../context/AppContext';
import { AiOutlineProduct } from "react-icons/ai"; // product
import { FiBox } from "react-icons/fi"; //order
import { LiaUsersSolid } from "react-icons/lia"; // users
import { FaRegMoneyBillAlt } from "react-icons/fa"; // profit
import { MdOutlineReviews } from "react-icons/md"; //reviews
import LoadingPage from './../LoadingPage/LoadingPage';

const Details = () => {
  const { backend_url, token } = useContext(AppContext);
  const [details, setDetails] = useState([]);

  // Get Details
  const getDetailsHandler = async () => {
    try {
      const response = await axios.post(backend_url + "/api/details/details", {}, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setDetails(response.data.details);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };
  useEffect(() => {
    getDetailsHandler();
  }, []);

  console.log(details);

  return details ? (
    <div className='py-5 px-[3vw]'>
      <div className='grid grid-cols-auto gap-5'>
        {/* User Count */}
        {
          details.usersCount &&
          <div className="border border-gray-300 p-5 rounded-md shadow-md flex items-center gap-5 transition-all duration-300 hover:scale-[1.05] hover:bg-blue-50 cursor-pointer">
            <LiaUsersSolid className='text-4xl text-primary' />
            <p className="text-gray-700">Users: <span className="text-primary font-semibold text-[17px]">{details.usersCount}</span> </p>
          </div>
        }
        {/* Products Count */}
        {
          details.productsCount &&
          <div className="border border-gray-300 p-5 rounded-md shadow-md flex items-center gap-5 transition-all duration-300 hover:scale-[1.05] hover:bg-blue-50 cursor-pointer">
            <AiOutlineProduct className='text-4xl text-primary' />
            <p className="text-gray-700">Products: <span className="text-primary font-semibold text-[17px]">{details.productsCount}</span> </p>
          </div>
        }
        {/* Orders Count */}
        {
          details.ordersCount &&
          <div className="border border-gray-300 p-5 rounded-md shadow-md flex items-center gap-5 transition-all duration-300 hover:scale-[1.05] hover:bg-blue-50 cursor-pointer">
            <FiBox className='text-4xl text-primary' />
            <p className="text-gray-700">Orders: <span className="text-primary font-semibold text-[17px]">{details.ordersCount}</span> </p>
          </div>
        }
        {/* Reviews Count */}
        {
          details.reviewsCount &&
          <div className="border border-gray-300 p-5 rounded-md shadow-md flex items-center gap-5 transition-all duration-300 hover:scale-[1.05] hover:bg-blue-50 cursor-pointer">
            <MdOutlineReviews className='text-4xl text-primary' />
            <p className="text-gray-700">Reviews: <span className="text-primary font-semibold text-[17px]">{details.reviewsCount}</span> </p>
          </div>
        }
        {/* Reviews Count */}
        {
          details.ordersProfit &&
          <div className="border border-gray-300 p-5 rounded-md shadow-md flex items-center gap-5 transition-all duration-300 hover:scale-[1.05] hover:bg-blue-50 cursor-pointer">
            <FaRegMoneyBillAlt className='text-4xl text-primary' />
            <p className="text-gray-700">OrdersProfit: <span className="text-primary font-semibold text-[17px]">{details.ordersProfit}</span> </p>
          </div>
        }

      </div>
    </div>
  ) : <LoadingPage />;
};

export default Details;
