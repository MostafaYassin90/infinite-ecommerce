import React, { useContext, useEffect, useState } from 'react';
import { fashionCategory, productResponsive } from './../assets/assets';
import { Link } from 'react-router-dom';
import { AppContext } from './../context/AppContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from './ProductItem';

const FashionSection = () => {
  const { allProducts } = useContext(AppContext);
  const [menClothes, setMenClothes] = useState([]);
  const [womenClothes, setWomenClothes] = useState([]);
  const [kidsClothes, setKidsClothes] = useState([]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 900 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 900, min: 500 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
    }
  };


  // Get Fashion Products
  const getMenClothes = () => {
    const productsData = allProducts.filter((product) => product.category === "Men");
    setMenClothes(productsData);
  };
  const getWomenClothes = () => {
    const productsData = allProducts.filter((product) => product.category === "Women");
    setWomenClothes(productsData);
  };
  const getKidsClothes = () => {
    const productsData = allProducts.filter((product) => product.category === "Kids");
    setKidsClothes(productsData);
  };

  useEffect(() => {
    getMenClothes();
    getWomenClothes();
    getKidsClothes();
  }, [allProducts]);


  return (
    <div className='py-10'>
      <p className='mb-3 text-3xl font-semibold text-gray-800'>Fashion</p>
      <hr className='border-none h-[1px] w-full bg-gray-300 mb-10' />

      {/* Show Fashion Category */}
      <div className='mb-10'>
        <p className='mb-3 text-xl font-semibold text-gray-800'>Shop By Categories</p>
        <div className='hidden justify-center gap-5 lg:flex'>
          {
            fashionCategory.map((item) => (
              <Link to={`/fashion/${item.category}`} onClick={() => { scrollTo(0, 0); }} key={item.id} className='w-[280px] transition-all duration-300 hover:scale-105 rounded-xl shadow-xl relative border p-5 pb-10 border-gray-300 text-center'>
                <div className='border border-gray-300 rounded-full w-[225px] h-[225px] p-3 shadow-xl mx-auto flex justify-center items-center'>
                  <img src={item.images} alt='videogame-images' className='w-[85%] h-[85%] mx-auto rounded-full' />
                </div>
                <p className='absolute bottom-2 left-[50%] -translate-x-[50%]'>{item.title}</p>
              </Link>
            ))
          }
        </div>
        <Carousel responsive={responsive} className='flex lg:hidden'>
          {
            fashionCategory.map((item) => (
              <Link to={`/fashion/${item.category}`} key={item.id} className='rounded-xl shadow-xl text-center'>
                <div className='border border-gray-300 rounded-full w-[225px] h-[225px] p-3 shadow-xl mx-auto flex justify-center items-center'>
                  <img src={item.images} alt='videogame-images' className='w-[85%] h-[85%] mx-auto rounded-full' />
                </div>
                <p className='mt-5'>{item.title}</p>
              </Link>
            ))
          }
        </Carousel>
      </div>

      {/* Show Men'S Products */}
      <div className='mb-10'>
        <p className='mb-3 text-xl font-semibold text-gray-800'>Men's Clothes</p>
        <Carousel responsive={productResponsive}>
          {
            menClothes.map((product, index) => (
              <div className='mr-3' key={index}>
                <ProductItem id={product._id} title={product.title} description={product.description} price={product.price} discount={product.discount} images={product.images} type={product.type} category={product.category} />
              </div>
            ))
          }
        </Carousel>
      </div>
      {/* Show Women'S Products */}
      <div className='mb-10'>
        <p className='mb-3 text-xl font-semibold text-gray-800'>Women's Clothes</p>
        <Carousel responsive={productResponsive}>
          {
            womenClothes.map((product, index) => (
              <div className='mr-3' key={index}>
                <ProductItem id={product._id} title={product.title} description={product.description} price={product.price} discount={product.discount} images={product.images} type={product.type} category={product.category} />
              </div>
            ))
          }
        </Carousel>
      </div>
      {/* Show Kids'S Products */}
      <div className='mb-10'>
        <p className='mb-3 text-xl font-semibold text-gray-800'>Kids's Clothes</p>
        <Carousel responsive={productResponsive}>
          {
            kidsClothes.map((product, index) => (
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

export default FashionSection;
