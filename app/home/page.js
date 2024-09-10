"use client";
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
const CourserComponent = () => {
  const imageArray = ["/burger.jpeg", "/cake.jpeg", "/milkshake.jpeg"];

  return (
    <div>
      <Carousel autoPlay showStatus={false} showThumbs={false} infiniteLoop emulateTouch
       className="custom-carousel" >
        {imageArray.map((image,index) => (
          <div className='h-[60vh] object-contain w-full' key={index}>
            <Image  layout='fill' objectFit="object-fit" className= 'object-fit' src={`${image}`}  />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CourserComponent;
