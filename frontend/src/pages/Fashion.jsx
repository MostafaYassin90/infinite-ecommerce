import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ProductItem from '../components/ProductItem';
import { useParams } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

const Fashion = () => {
  const { category } = useParams();
  const { allProducts } = useContext(AppContext);
  const [productCategory, setProductCategory] = useState(category ? [category] : []);
  const [productSubCategory, setProductSubCategory] = useState([]);
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
  // Add Sub Category 
  const addSubCategory = (value) => {
    if (productSubCategory.includes(value)) {
      setProductSubCategory(productSubCategory.filter((item) => item !== value));
    } else {
      setProductSubCategory((prev) => ([...prev, value]));
    }
  };

  // Apply Filter
  const applyProductsFilter = () => {
    let productsData = allProducts.filter((product) => product.type === "fashion");
    let productsDataClone = productsData.slice();

    if (productCategory.length > 0) {
      productsDataClone = productsDataClone.filter((product) => productCategory.includes(product.category));
    }

    if (productSubCategory.length > 0) {
      productsDataClone = productsDataClone.filter((product) => productSubCategory.includes(product.subCategory));
    }

    setFilterProducts(productsDataClone);

  };

  useEffect(() => {
    applyProductsFilter();
  }, [allProducts, productCategory, productSubCategory]);

  return (
    <div className='py-10 flex items-start flex-col sm:flex-row gap-5 px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* Left Side */}
      <div className='w-full sm:w-[250px]'>
        <p className='text-xl font-semibold mb-5 ml-1 flex items-center cursor-pointer'
          onClick={() => { setShowFilters((prev) => !prev); }}>
          Filters
          <IoIosArrowForward className={`block sm:hidden transition-all duration-300 ${showFilters ? "rotate-90" : ""}`} />
        </p>
        <div className={`sm:block ${showFilters ? "block" : "hidden"} transition-all duration-300`}>
          {/* Category */}
          <div className='border border-gray-300 p-5 mb-5 rounded-md'>
            <p className='mb-3 font-semibold'>Category</p>
            <div className='flex flex-col gap-2'>
              <div className="flex items-center gap-2 text-gray-800" >
                <input type='checkbox' id='men' value={"Men"} onChange={(event) => { addCategory(event.target.value); }} checked={productCategory.includes("Men") ? true : false} />
                <label htmlFor='men'>Men</label>
              </div>
              <div className="flex items-center gap-2 text-gray-800" >
                <input type='checkbox' id='women' value={"Women"} onChange={(event) => { addCategory(event.target.value); }} checked={productCategory.includes("Women") ? true : false} />
                <label htmlFor='women'>Women</label>
              </div>
              <div className="flex items-center gap-2 text-gray-800" >
                <input type='checkbox' id='kids' value={"Kids"} onChange={(event) => { addCategory(event.target.value); }} checked={productCategory.includes("Kids") ? true : false} />
                <label htmlFor='kids'>Kids</label>
              </div>
            </div>
          </div>
          {/* Sub Category */}
          <div className='border border-gray-300 p-5 rounded-md'>
            <p className='mb-3 font-semibold'>SubCategory</p>
            <div className='flex flex-col gap-3'>
              <div className="flex items-center gap-2 text-gray-800" >
                <input type='checkbox' id='topwear' value={"Topwear"} onChange={(event) => { addSubCategory(event.target.value); }} />
                <label htmlFor='topwear'>TopWear</label>
              </div>
              <div className="flex items-center gap-2 text-gray-800" >
                <input type='checkbox' id='winterwear' value={"Winterwear"} onChange={(event) => { addSubCategory(event.target.value); }} />
                <label htmlFor='winterwear'>WinterWear</label>
              </div>
              <div className="flex items-center gap-2 text-gray-800" >
                <input type='checkbox' id='bottomwear' value={"Bottomwear"} onChange={(event) => { addSubCategory(event.target.value); }} />
                <label htmlFor='bottomwear'>BottomWear</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='w-full'>
        <p className='text-xl font-semibold mb-5 ml-1'>Fashion Products</p>
        <div className='grid grid-cols-auto gap-x-5  gap-y-10'>
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

export default Fashion;
