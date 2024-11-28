// import Image from "next/image";
// import { HERO_ITEMS } from "@/constant";

// const Slider = () => {
//   return (
//     <div>
//       <div
//         id="default-carousel"
//         className="relative w-full"
//         data-carousel="slide"
//       >
//         <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
//           {HERO_ITEMS.map((imagePath: any, index: any) => (
//             <div
//               key={index}
//               className=" duration-700 ease-in-out"
//               data-carousel-item
//             >
//               <Image
//                 src={imagePath}
//                 width={1000}
//                 height={800}
//                 className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//                 alt={`Slide ${index + 1}`}
//               />
//             </div>
//           ))}
//         </div>

//         <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
//           {HERO_ITEMS.map((_, index) => (
//             <button
//               key={index}
//               type="button"
//               className="w-3 h-3 rounded-full"
//               aria-current={index === 0 ? "true" : "false"}
//               aria-label={`Slide ${index + 1}`}
//               data-carousel-slide-to={index}
//             ></button>
//           ))}
//         </div>

//         <button
//           type="button"
//           className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//           data-carousel-prev
//         >
//           <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//             <svg
//               className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 6 10"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M5 1 1 5l4 4"
//               />
//             </svg>
//             <span className="sr-only">Previous</span>
//           </span>
//         </button>
//         <button
//           type="button"
//           className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//           data-carousel-next
//         >
//           <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//             <svg
//               className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 6 10"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M1 9l4-4-4-4"
//               />
//             </svg>
//             <span className="sr-only">Next</span>
//           </span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Slider;
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { HERO_ITEMS } from "@/constant";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // Track the active slide

  // Total number of slides
  const totalSlides = HERO_ITEMS.length;

  // Automatic slide change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [totalSlides]);

  // Go to the next slide
  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  // Go to the previous slide
  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div id="default-carousel" className="relative w-full max-w-full h-4/5">
        <div className="relative w-full h-full">
          {HERO_ITEMS.map((imagePath: any, index: number) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={imagePath}
                layout="fill"
                objectFit="cover"
                className="absolute"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {HERO_ITEMS.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Previous Button */}
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handlePrev}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        {/* Next Button */}
        <button
          type="button"
          className="absolute top-0 end-10 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none"
          onClick={handleNext}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 9l4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
