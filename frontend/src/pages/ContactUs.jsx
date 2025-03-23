// import React, { useContext, useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import axios from "axios";
// import { AppContext } from '../context/AppContext';

const ContactUs = () => {
  // const { backend_url } = useContext(AppContext);
  // const [sizes, setSizes] = useState(["S", "M", "L", "XL", "XXL"]);

  // const updateSizes = async () => {
  //   try {
  //     const response = await axios.post(backend_url + "/api/product/update", { newSizes: JSON.stringify(sizes) });
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       console.log(response);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return toast.error(error.response.data.message || error.message);
  //   }
  // };

  // useEffect(() => {
  //   updateSizes();
  // }, []);

  return (
    <div>
      ContactUs
    </div>
  );
};

export default ContactUs;
