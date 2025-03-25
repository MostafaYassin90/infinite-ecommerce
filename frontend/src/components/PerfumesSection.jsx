import React, { useContext, useEffect, useState } from 'react';
import { perfumesCategory, productResponsive } from '../assets/assets';
import { AppContext } from './../context/AppContext';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from './ProductItem';

const PerfumesSection = () => {
  const { allProducts } = useContext(AppContext);
  const [perfumesProducts, setPerfumesProducts] = useState([]);

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


  // Get Perfumes Products
  const getPerfumesProducts = () => {
    const productsData = allProducts.filter((product) => product.type === "perfumes");
    setPerfumesProducts(productsData);
  };

  useEffect(() => {
    getPerfumesProducts();
  }, [allProducts]);

  return (
    <div className='py-10'>
      <p className='mb-3 text-3xl font-semibold text-gray-800'>Perfumes</p>
      <hr className='border-none h-[1px] w-full bg-gray-300 mb-10' />

      {/* Show Perfumes Ctageory */}
      <div className='mb-10'>
        <p className='mb-3 text-xl font-semibold text-gray-800'>Shop By Categories</p>
        <div className='justify-center gap-5 hidden md:flex'>
          {
            perfumesCategory.map((item) => (
              <Link to={`/perfumes/${item.category}`} onClick={() => { scrollTo(0, 0); }} key={item.id} className='w-[280px] transition-all duration-300 hover:scale-105 rounded-xl shadow-xl relative border p-5 pb-10 border-gray-300 text-center'>
                <div className='border border-gray-300 rounded-full w-[225px] h-[225px] p-3 shadow-xl mx-auto flex justify-center items-center'>
                  <img src={item.images} alt='videogame-images' className='w-[90%] h-[90%] rounded-full mx-auto' />
                </div>
                <p className='absolute bottom-2 left-[50%] -translate-x-[50%]'>{item.title}</p>
              </Link>
            ))
          }
        </div>
        <Carousel responsive={responsive} className='flex md:hidden'>
          {
            perfumesCategory.map((item) => (
              <Link to={`/perfumes/${item.category}`} key={item.id} className=' rounded-xl shadow-xl text-center'>
                <div className='border border-gray-300 rounded-full w-[225px] h-[225px] p-3 shadow-xl mx-auto flex justify-center items-center'>
                  <img src={item.images} alt='videogame-images' className='w-[90%] h-[90%] rounded-full mx-auto' />
                </div>
                <p className='mt-5'>{item.title}</p>
              </Link>
            ))
          }
        </Carousel>
      </div>

      {/*Show Perfumes Products  */}
      <div>
        <p className='mb-3 text-xl font-semibold text-gray-800'>Perfumes Products</p>
        <Carousel responsive={productResponsive}>
          {
            perfumesProducts.map((product, index) => (
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

export default PerfumesSection;
