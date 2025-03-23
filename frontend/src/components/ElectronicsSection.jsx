import { useContext, useEffect, useState } from 'react';
import { categoryResponsive, electronics_category, productResponsive } from './../assets/assets';
import { AppContext } from '../context/AppContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import ProductItem from './ProductItem';

const ElectronicsSection = () => {
  const { allProducts } = useContext(AppContext);
  const [electronicsProducts, setElectronicsProducts] = useState([]);

  // Get Electronics Products
  const getElectronicsProducts = () => {
    setElectronicsProducts(allProducts.filter((item) => item.type === "electronics"));
  };

  useEffect(() => {
    getElectronicsProducts();
  }, [allProducts]);


  return (
    <div className='py-10'>
      <p className='mb-3 text-3xl font-semibold text-gray-800'>Electronics</p>
      <hr className='border-none h-[1px] w-full bg-gray-300 mb-10' />
      {/* Show Electronics Categories */}
      <div className='mb-10'>
        <p className='mb-3 text-xl font-semibold text-gray-800'>Shop By Categories</p>
        <Carousel responsive={categoryResponsive}>
          {
            electronics_category.map((item) => (
              <Link to={`/electronics/${item.category}`} key={item.id} className='mr-5 block bg-gray-white p-3 rounded-md text-center shadow-lg border border-gray-200 transition-all duration-300 hover:scale-105'>
                <img src={item.images} alt='category-image' />
                <p className='text-gray-700'>{item.title}</p>
              </Link>
            ))
          }
        </Carousel>
      </div>

      {/* Shop Electronics Products */}
      <div>
        <p className='mb-3 text-xl font-semibold text-gray-800'>Electronics Products</p>
        <Carousel responsive={productResponsive}>
          {
            electronicsProducts.map((product, index) => (
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

export default ElectronicsSection;
