import { useState, useEffect } from "react";
import "./Carousel.css";

const Carousel = ({ images, autoPlay = true, delay = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(nextSlide, delay);
    return () => clearInterval(interval);
  }, [currentIndex, autoPlay, delay]);

  return (
    <div className="carousel">
      <div
        className="carousel-slides"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, i) => (
          <img  key={i} src={img} alt={`Slide ${i}`} />
        ))}
      </div>
      <button className="carousel-btn prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="carousel-btn next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
