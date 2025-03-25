import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './../context/AppContext';
import { productResponsive, videGameCategory } from '../assets/assets';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from './ProductItem';

const VideoGameSection = () => {
  const { allProducts } = useContext(AppContext);
  const [videoGamesProducts, setVideoGamesProducts] = useState([]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    }
  };


  // Get Video Games Products
  const getVideoGamesProducts = () => {
    const productData = allProducts.filter((product) => product.type === "Video games");
    setVideoGamesProducts(productData);
  };
  useEffect(() => {
    getVideoGamesProducts();
  }, [allProducts]);

  return (
    <div className='py-10'>
      <p className='mb-3 text-3xl font-semibold text-gray-800'>Video Games</p>
      <hr className='border-none h-[1px] w-full bg-gray-300 mb-10' />

      {/* Show Vide Games Category */}
      <div className='mb-10'>
        <p className='mb-3 text-xl font-semibold text-gray-800'>Shop By Categories</p>
        <div className='justify-center gap-5 hidden md:flex'>
          {
            videGameCategory.map((item) => (
              <Link to={`/video-games/${item.category}`} onClick={() => { scrollTo(0, 0); }} key={item.id} className='w-[280px] transition-all duration-300 hover:scale-105 rounded-xl shadow-xl relative border p-5 pb-10 border-gray-300 text-center'>
                <div className='border border-gray-300 rounded-full w-[225px] h-[225px] p-3 shadow-xl mx-auto flex justify-center items-center'>
                  <img src={item.images} alt='videogame-images' className='w-[70%] mx-auto' />
                </div>
                <p className='absolute bottom-2 left-[50%] -translate-x-[50%]'>{item.title}</p>
              </Link>
            ))
          }
        </div>
        <Carousel responsive={responsive} className='flex md:hidden'>
          {
            videGameCategory.map((item) => (
              <Link to={`/video-games/${item.category}`} key={item.id} className='rounded-xl shadow-xl mr-5 text-center'>
                <div className='border border-gray-300 rounded-full w-[225px] h-[225px] p-3 shadow-xl mx-auto flex justify-center items-center'>
                  <img src={item.images} alt='videogame-images' className='w-[70%] mx-auto' />
                </div>
                <p className='mt-5'>{item.title}</p>
              </Link>
            ))
          }
        </Carousel>
      </div>

      {/* Show Video Games Products */}
      <div>
        <p className='mb-3 text-xl font-semibold text-gray-800'>View Games Products</p>
        <Carousel responsive={productResponsive}>
          {
            videoGamesProducts.map((product, index) => (
              <div className='mr-3' key={index}>
                <ProductItem id={product._id} title={product.title} description={product.description} price={product.price} discount={product.discount} images={product.images} type={product.type} category={product.category} />
              </div>
            ))
          }
        </Carousel>
      </div>

    </div>
  );
};

export default VideoGameSection;
