// "use client";
// import React from "react";
// import Link from "next/link";
// import Image from "next/image";

// interface MenuItem {
//   name: string;
//   link: string;
//   dropdown?: { name: string; link: string }[];
// }

// interface NavbarProps {
//   menuItems: MenuItem[];
// }

// const Navbar = ({ menuItems }: NavbarProps) => {
//   const [dropdownIndex, setDropdownIndex] = React.useState<number | null>(null);

//   const handleMouseEnter = (index: number) => {
//     setDropdownIndex(index);
//   };

//   const handleMouseLeave = () => {
//     setDropdownIndex(null);
//   };

//   return (
//     <header className="sticky top-0 bg-blue-100 p-4 shadow-md">
//       <nav className="flex justify-between items-center">
//         {/* Logo */}
//         <div>
//           <Link href="/">
//             <Image
//               src="/logo/logo_grabbit.svg"
//               alt="grabbit logo"
//               width={150}
//               height={80}
//               className="hover:scale-105"
//             />
//           </Link>
//         </div>
//         <ul className="flex space-x-4">
//           {menuItems.map((item, index) => (
//             <li
//               key={index}
//               className="relative"
//               onMouseEnter={() => handleMouseEnter(index)}
//               onMouseLeave={handleMouseLeave}
//             >
//               <Link
//                 href={item.link}
//                 className="text-blue-600 hover:text-blue-800 hover:bg-white px-2 py-7"
//               >
//                 {item.name}
//               </Link>
//               {item.dropdown && dropdownIndex === index && (
//                 <ul
//                   className="absolute left-0 mt-2 bg-white shadow-lg rounded-md"
//                   onMouseEnter={() => setDropdownIndex(index)}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   {item.dropdown.map((dropdownItem, dropdownIndex) => (
//                     <li
//                       key={dropdownIndex}
//                       className="px-4 py-2 hover:bg-blue-100"
//                     >
//                       <Link
//                         href={dropdownItem.link}
//                         className="text-gray-700 hover:text-blue-600"
//                       >
//                         {dropdownItem.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import DropDownMenu from "./DropDownMenu"; // Import the DropDownMenu component

interface MenuItem {
  name: string;
  link: string;
  dropdown?: { name: string; link: string }[];
}

interface NavbarProps {
  menuItems: MenuItem[];
}

const Navbar = ({ menuItems }: NavbarProps) => {
  const [dropdownIndex, setDropdownIndex] = React.useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setDropdownIndex(index);
  };

  const handleMouseLeave = () => {
    setDropdownIndex(null);
  };

  return (
    <header className="z-50 sticky top-0 bg-blue-100 p-4 shadow-md">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src="/logo/logo_grabbit.svg"
              alt="grabbit logo"
              width={150}
              height={80}
              className="hover:scale-105"
            />
          </Link>
        </div>
        <ul className="flex space-x-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.link}
                className="text-xl font-bold text-blue-600 hover:text-blue-800 hover:bg-white/50 px-4 py-6 mr-2"
              >
                {item.name}
              </Link>
              {item.dropdown && (
                <div className="absolute top-full left-0 w-full">
                  <DropDownMenu
                    dropdownItems={item.dropdown}
                    isOpen={dropdownIndex === index}
                    onItemClick={() => setDropdownIndex(null)}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
