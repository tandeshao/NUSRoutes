import { imageData } from "./data";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useState } from "react";
import "./busInfo.css";
import {Header} from './element';

const BusInfo = () => {
  const [isOpen, setIsOpen] = useState(() => null);
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
          <div className={index===current ? 'slide active':'slide'} key={index} onClick={() => setIsOpen(index)}>
            {index === current && <img src={slide.image} alt={slide.id} className='image'/>}
          </div>
        );
      })}
      {(isOpen === 0 || isOpen ) && (
          <>
            <div
              style={{
                zIndex: "99",
                position: "fixed",
                background: "#353535",
                width: "100vw",
                height: "100vh",
                top: "0",
                right: "0",
                backdropFilter: "blur(5px) brightness(0.5)",
                opacity: "80%",
                cursor: "pointer",
              }}
              onClick={() => setIsOpen(null)}
            />
            <img
              src={imageData[isOpen].image}
              alt={""}
              style={{
                position: "fixed",
                left: "50%",
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '100',
                width: "75%",
                height: "auto",
                minWidth: '100px',
                cursor: 'pointer'
              }}
              onClick={() => setIsOpen(null)}
            />
          </>
        )}
    </section>
  );
};

export default BusInfo;
