"use client";
import styles from "./Buses.module.css";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";

const Buses = () => {
  const moreInfoRef = useRef<HTMLDivElement>(null);

  const scrollToSection = () => {
    if (moreInfoRef.current) {
      moreInfoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className={styles.parallaxBackground}>
        <div className="flex flex-wrap items-center px-4 min-h-[80vh]">
          {/* Left Side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Effortless Campus Travel with RapidKL
            </h2>
            <p className="text-white text-lg">
              RapidKL buses provide University of Malaya students with a
              seamless and cost-effective transportation solution. With reliable
              schedules and extensive coverage, they make getting around campus
              and the city both convenient and economical.
            </p>
          </div>

          {/* Right Side*/}
          <div className="flex-1 relative group flex justify-center items-center">
            <Link href="#more-info">
              {/* Image */}
              <Image
                src="/images/hero/carousel/carousel-3.jpg"
                alt="Bus Image"
                width={500}
                height={500}
                className="rounded-md object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-bold">
                  Discover More
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* More Information Section */}
      <div
        ref={moreInfoRef}
        id="more-info"
        className="p-8 bg-gray-100 mt-12 rounded-lg shadow-lg"
      >
        <h3 className="text-2xl font-bold mb-4">Explore RapidKL Services</h3>
        <p className="text-gray-700 mb-2">
          RapidKL offers an extensive network of bus routes connecting key
          locations within Kuala Lumpur and the University of Malaya. Their
          services ensure timely and cost-efficient transportation, ideal for
          students.
        </p>
      </div>
    </div>
  );
};

export default Buses;
