import { imageData } from "./data";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useState } from "react";
import "./busInfo.css";
import {Header} from './element';

const BusInfo = () => {
  const [current, setCurrent] = useState(0);
  const length = imageData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(imageData) || imageData.length <= 0) {
    return null;
  }

  return (
    <section className="slider" id='businfo'>
      <Header> NUS Shuttle Bus Information </Header>
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {imageData.map((slide, index) => {
        return (
          <div className={index===current ? 'slide active':'slide'} key={index}>
            {index === current && <img src={slide.image} alt={slide.id} className='image'/>}
          </div>
        );
      })}
    </section>
  );
};

export default BusInfo;
