import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Verify = () => {
  const { backend_url } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const navigate = useNavigate();

  const verifyOrderPayment = async () => {
    try {
      const response = await axios.post(backend_url + "/api/order/order-verify", {
        success: success,
        orderId: orderId
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/my-orders");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    verifyOrderPayment();
  }, []);

  return (
    <div className='py-20 min-h-[70vh]'>
      verify
      <Loading />
    </div>
  );

};

export default Verify;
