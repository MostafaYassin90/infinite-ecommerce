import React from 'react';
import Hero from '../components/Hero';
import ElectronicsSection from '../components/ElectronicsSection';
import VideoGameSection from '../components/VideoGameSection';
import FashionSection from '../components/FashionSection';
import PerfumesSection from '../components/PerfumesSection';
import Banner from '../components/Banner';
import SubscribeSection from '../components/SubscribeSection';




const Home = () => {
  return (
    <div className='py-10 px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw] '>
      <Hero />
      <ElectronicsSection />
      <VideoGameSection />
      <FashionSection />
      <PerfumesSection />
      <Banner />
      <SubscribeSection />
    </div>
  );
};

export default Home;
