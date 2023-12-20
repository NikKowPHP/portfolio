import React, {
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useState,
} from "react";

import { ChevronLeft, ChevronRight } from "react-feather";
type carouselTypes = {
  children: ReactNode[];
  slides: ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
	carouselRef: RefObject<HTMLDivElement> | null
};

const Carousel = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
	carouselRef = null
}: carouselTypes): ReactElement => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      slides && prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      slides && prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(handleNext, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div ref={carouselRef} className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides}
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={handlePrev}
          className="p-1 rounded-full shadow bg-gray-500/80 transition:all duration-300 text-gray-800 hover:bg-white hover:bg-gray-300/80"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="p-1 rounded-full shadow bg-gray-500/80 text-gray-800 hover:bg-gray-300/80 transition-all duration-300"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((slide, index: number) => (
            <div
              key={index}
              className={`transition-all w-1.5 h-1.5 bg-gray-500 rounded-full ${
                currentSlide === index ? "p-0.5" : "bg-opacity-50"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Carousel;
