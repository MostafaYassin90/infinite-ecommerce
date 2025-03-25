import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import ProductItem from '../components/ProductItem';
import { IoIosArrowForward } from "react-icons/io";

const Electronics = () => {
  const { allProducts } = useContext(AppContext);
  const { category } = useParams();
  const [productCategory, setProductCategory] = useState(category ? [category] : []);
  const [filterEleProducts, setFilterEleProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Add Category
  const addCategory = (value) => {
    if (productCategory.includes(value)) {
      setProductCategory(productCategory.filter((item) => item !== value));
    } else {
      setProductCategory((prev) => ([...prev, value]));
    }
  };

  const getElectronicsProducts = () => {
    const electronicsProducts = allProducts.filter((product) => product.type === "electronics");
    let productClone = electronicsProducts.slice();
    if (productCategory.length > 0) {
      productClone = productClone.filter((product) => productCategory.includes(product.category));
    }
    setFilterEleProducts(productClone);
  };

  useEffect(() => {
    getElectronicsProducts();
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
        <div className={`p-5 border border-gray-300 rounded-xl transition-all duration-300 sm:block ${showFilters ? "block" : "hidden"}`}>
          <p className='mb-3 font-semibold'>Category</p>
          <div className='flex flex-col items-start justify-start gap-2'>
            <div className="flex items-center gap-2 text-gray-800">
              <input type='checkbox' id='smartphone' value={"Smartphone"} onChange={(event) => { addCategory(event.target.value); }} checked={productCategory.includes("Smartphone") ? true : false} className="cursor-pointer" />
              <label htmlFor='smartphone' className="cursor-pointer">Smartphone</label>
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <input type='checkbox' id='laptop' value={"Laptop"} onChange={(event) => { addCategory(event.target.value); }} checked={productCategory.includes("Laptop") ? true : false} className="cursor-pointer" />
              <label htmlFor='laptop' className="cursor-pointer">Laptop</label>
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <input type='checkbox' id='headphone' value={"Headphone"} onChange={(event) => { addCategory(event.target.value); }} checked={productCategory.includes("Headphone") ? true : false} className="cursor-pointer" />
              <label htmlFor='headphone' className="cursor-pointer">Headphone</label>
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <input type='checkbox' id='speaker' value={"Speaker"} onChange={(event) => { addCategory(event.target.value); }} checked={productCategory.includes("Speaker") ? true : false} className="cursor-pointer" />
              <label htmlFor='speaker' className="cursor-pointer">speaker</label>
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <input type='checkbox' id='camera' value={"Camera"} onChange={(event) => { addCategory(event.target.value); }} checked={productCategory.includes("Camera") ? true : false} className="cursor-pointer" />
              <label htmlFor='camera' className="cursor-pointer">Camera</label>
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <input type='checkbox' id='television' value={"Televisions"} onChange={(event) => { addCategory(event.target.value); }} checked={productCategory.includes("Televisions") ? true : false} className="cursor-pointer" />
              <label htmlFor='television' className="cursor-pointer">Television</label>
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <input type='checkbox' id='smartwatch' value={"Smartwatch"} onChange={(event) => { addCategory(event.target.value); }} checked={productCategory.includes("Smartwatch") ? true : false} className="cursor-pointer" />
              <label htmlFor='smartwatch' className="cursor-pointer">Smartwatch</label>
            </div>
          </div>
          <div>

          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className='w-full'>
        <p className='text-xl font-semibold mb-5 ml-1'>Electronics Products</p>
        <div className='grid grid-cols-auto gap-x-5 gap-y-10'>
          {
            filterEleProducts.map((product, index) => (
              <ProductItem key={index} id={product._id} title={product._title} description={product.description} price={product.price} discount={product.discount} images={product.images} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Electronics;
