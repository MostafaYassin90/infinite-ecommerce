import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import ProductItem from "../components/ProductItem";
import { IoIosArrowForward } from "react-icons/io";


const VideoGames = () => {
  const { allProducts } = useContext(AppContext);
  const { category } = useParams();
  const [videoGamesCategory, setVideoGamesCategory] = useState(category ? [category] : []);
  const [videoGamesProducts, setVideoGamesProduct] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Add Category
  const addCategory = (value) => {
    if (videoGamesCategory.includes(value)) {
      setVideoGamesCategory(videoGamesCategory.filter((item) => item !== value));
    } else {
      setVideoGamesCategory((prev) => ([...prev, value]));
    }
  };

  // Get Video Games Products
  const getVideoGamesProducts = () => {
    const videoGameProductsData = allProducts.filter((product) => product.type === "Video games");
    let productsClone = videoGameProductsData.slice();

    if (videoGamesCategory.length > 0) {
      productsClone = productsClone.filter((product) => videoGamesCategory.includes(product.category));
    }
    setVideoGamesProduct(productsClone);
  };

  useEffect(() => {
    getVideoGamesProducts();
  }, [allProducts, videoGamesCategory]);

  return (
    <div className="py-10 flex flex-col sm:flex-row items-start gap-5 px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {/* Left Side */}
      <div className="w-full sm:w-[250px]">
        <p className='text-xl font-semibold mb-5 ml-1 flex items-center cursor-pointer'
          onClick={() => { setShowFilters((prev) => !prev); }}>
          <p>Filters</p>
          <IoIosArrowForward className={`transition-all duration-300 ${showFilters ? "rotate-90" : ""}`} />
        </p>
        <div className={`p-5 border border-gray-300 rounded-xl sm:block ${showFilters ? "block" : "hidden"}`}>
          <p className="mb-3 font-semibold">Category</p>
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="playstation" value={"Play station"} className="cursor-pointer" onChange={(event) => { addCategory(event.target.value); }} checked={videoGamesCategory.includes("Play station") ? true : false} />
              <label htmlFor="playstation" className="cursor-pointer">Play Station</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="xbox" value={"Xbox"} className="cursor-pointer" onChange={(event) => { addCategory(event.target.value); }} checked={videoGamesCategory.includes("Xbox") ? true : false} />
              <label htmlFor="xbox" className="cursor-pointer">XBox</label>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full grid grid-cols-auto gap-5">
        {
          videoGamesProducts.map((product, index) => (
            <ProductItem key={index} id={product._id} title={product.title} description={product.description} price={product.price} discount={product.discount} images={product.images} />
          ))
        }
      </div>
    </div>
  );
};

export default VideoGames;
