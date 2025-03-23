import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, singleProduct }) => {
  const { allProducts } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  console.log(category);
  // Get Related Products BasedOn Category
  const getRelatedProducts = () => {
    let productsData = [];
    allProducts.map((product) => {
      if (product.category === category) {
        productsData.push(product);
      }
    });
    setProducts(productsData);
  };

  useEffect(() => {
    getRelatedProducts();
  }, [category, singleProduct]);

  return (
    <div className='py-10'>
      <p className='text-2xl text-gray-800 font-semibold mb-5'>Related Products</p>
      {/* Show Products */}
      <div className='grid grid-cols-auto gap-8'>
        {
          products.slice(0, 4).map((product, index) => (
            <ProductItem key={index} id={product._id} title={product.title} description={product.description} images={product.images} price={product.price} discount={product.discount} />
          ))
        }
      </div>
    </div>
  );
};

export default RelatedProducts;
