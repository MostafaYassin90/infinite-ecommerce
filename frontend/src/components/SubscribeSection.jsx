import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SubscribeSection = () => {
  const [searchValue, setSearchValue] = useState("");

  // onSubmitHandler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSearchValue("");
    toast.success("Thank You For Subscribing");
  };

  return (
    <div className='my-14 flex flex-col gap-5 items-center text-center'>
      {/* Head */}
      <div>
        <p className='text-2xl font-semibold text-gray-700'>Subscribe now & get 20% Off</p>
        <p className='text-sm text-gray-600 font-medium'>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt.</p>
      </div>
      {/* Subscribe Input */}
      <form onSubmit={onSubmitHandler} className='w-full sm:w-[600px] lg:w-[750px] flex items-center border border-gray-400 rounded-lg h-[45px] overflow-hidden'>
        <input type='text' placeholder='Enter Your Email ID' value={searchValue}
          onChange={(event) => { setSearchValue(event.target.value); }}
          className='outline-none py-2 px-5 border-none bg-none h-[45px] w-full' />
        <button type='submit' className='py-2 px-5 bg-primary text-white text-center h-[45px] w-fit'>Subscribe</button>
      </form>
    </div>
  );
};

export default SubscribeSection;
