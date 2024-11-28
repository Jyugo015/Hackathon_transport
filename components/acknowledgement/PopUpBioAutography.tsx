"use client";
import Image from "next/image";
import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";

const PopUpBioAutography = ({ selectedItem, onClose }: any) => {
  const autobiographyText = selectedItem.autobiography
    .toLowerCase()
    .startsWith("lorem")
    ? `Hello, my name is ${selectedItem.name}, and I am proud to serve as the ${selectedItem.position} of this organization. With my role, I am committed to contributing to the growth and success of our team, ensuring that we continue to thrive in all our endeavors.`
    : selectedItem.autobiography;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="relative lg:flexCenter bg-white rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-2/3 h-auto max-h-[80%] overflow-y-auto p-6">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <IconContext.Provider
            value={{ color: "#ce1126", className: "closeIcon" }}
          >
            <IoClose size={24} />
          </IconContext.Provider>
        </button>

        {/* Content Container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Left Side: Image and Info */}
          <div className="flex-initial w-full md:w-1/3 flex flex-col items-center px-4 py-6 md:py-12">
            <div className="w-36 h-36 mb-4">
              <Image
                className="rounded-full shadow-md object-cover"
                src={selectedItem.imgSrc}
                alt={selectedItem.position}
                width={200} // Consistent width
                height={200} // Consistent height
                style={{ objectFit: "cover" }} // Ensures proper cropping
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
              {selectedItem.name}
            </h3>
            <p className="text-center text-gray-500 mb-4">
              {selectedItem.position}
            </p>
          </div>

          {/* Right Side: Autobiography with Scrollbar */}
          <div className="flex-initial w-full md:w-2/3 bg-orange-200/30 p-8 md:p-6 rounded-lg">
            <div className="max-h-64 md:max-h-72 lg:max-h-80 overflow-y-auto">
              <div className="text-start text-gray-500">
                {autobiographyText
                  .split("\n")
                  .map((line: string, index: number) => (
                    <p key={index} className="mb-4">
                      {line}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpBioAutography;
