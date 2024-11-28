"use client";
import Image from "next/image";
import { BIOGRAPHIES } from "@/constant";
import PopUpBioAutography from "@/components/acknowledgement/PopUpBioAutography";
import { useState } from "react";

const BioAutography = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item: any) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <div className="grid gap-8 lg:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 py-10 mx-6 md:mx-8 lg:mx-10 my-6 md:my-8 lg:my-10">
        {BIOGRAPHIES.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-gray-500 p-2"
          >
            <div className="transition-transform duration-300 ease-in-out transform hover:scale-105">
              <Image
                className="mx-auto mb-4 w-36 h-36 rounded-full cursor-pointer shadow-lg"
                src={item.imgSrc}
                alt={item.position}
                width={300}
                height={300}
                onClick={() => openModal(item)}
              />
            </div>
            <h3
              onClick={() => openModal(item)}
              className="flexCenter text-2xl font-bold text-gray-900 min-h-10 text-center mx-14 xl:mx-12 cursor-pointer"
            >
              {item.name}
            </h3>

            <p className="text-center my-4">{item.position}</p>
          </div>
        ))}
      </div>

      {selectedItem && (
        <PopUpBioAutography selectedItem={selectedItem} onClose={closeModal} />
      )}
    </div>
  );
};

export default BioAutography;
