import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import ProductItem from '../components/ProductItem';
import { IoIosArrowForward } from "react-icons/io";

const Perfumes = () => {
  const { category } = useParams();
  const { allProducts } = useContext(AppContext);
  const [productCategory, setProductCategory] = useState(category ? [category] : []);
  const [filterProducts, setFilterProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Add Category 
  const addCategory = (value) => {
    if (productCategory.includes(value)) {
      setProductCategory(productCategory.filter((item) => item !== value));
    } else {
      setProductCategory((prev) => ([...prev, value]));
    }
  };

  // Apply Filter Products
  const applyFilterProducts = () => {
    const perfumesProducts = allProducts.filter((product) => product.type === "perfumes");
    let productsClone = perfumesProducts.slice();
    if (productCategory.length > 0) {
      productsClone = productsClone.filter((product) => productCategory.includes(product.category));
    }
    setFilterProducts(productsClone);
  };

  useEffect(() => {
    applyFilterProducts();
  }, [allProducts, productCategory]);

  return (
    <div className='my-10 flex-col sm:flex-row mx-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex gap-5 items-start'>

      {/* Left Side */}
      <div className='w-full sm:w-[250px]'>
        <p className='text-xl font-semibold mb-5 ml-1 flex items-center cursor-pointer'
          onClick={() => { setShowFilters((prev) => !prev); }}>
          <p>Filters</p>
          <IoIosArrowForward className={`${showFilters ? "rotate-90" : ""} transition-all duration-300`} />
        </p>
        <div className={`border border-gray-300 rounded-md p-5 sm:block ${showFilters ? "block" : "hidden"}`}>
          <p className='mb-3 font-semibold'>Category</p>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2 text-gray-800'>
              <input type="checkbox" id='men' value={"Men"} onChange={(event) => { addCategory(event.target.value); }} className='cursor-pointer' checked={productCategory.includes("Men") ? true : false} />
              <label htmlFor='men' className='cursor-pointer'>For Him</label>
            </div>
            <div className='flex items-center gap-2 text-gray-800'>
              <input type="checkbox" id='women' value={"Women"} onChange={(event) => { addCategory(event.target.value); }} className='cursor-pointer' checked={productCategory.includes("Women") ? true : false} />
              <label htmlFor='women' className='cursor-pointer'>For Her</label>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='w-full'>
        <p className='text-xl font-semibold mb-5 ml-1'>Perfumes Products</p>
        <div className='grid grid-cols-auto gap-x-5 gap-y-10'>
          {
            filterProducts.map((product, index) => (
              <ProductItem key={index} id={product._id} title={product.title} description={product.description} price={product.price} discount={product.discount} images={product.images} />
            ))
          }
        </div>
      </div>


    </div>
  );
};

export default Perfumes;
