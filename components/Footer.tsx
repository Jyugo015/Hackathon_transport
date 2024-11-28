// import Image from "next/image";
// import Link from "next/link";
// import { footerLinks } from "@/constant";

// const Footer = () => {
//   return (
//     <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
//       <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
//         <div className="flex flex-col justify-start items-start gap-6">
//           <p className="text-base text-gray-700">
//             Carhub 2023 <br />
//             All Rights Reserved &copy;
//           </p>
//         </div>

//         {/* Footer Links Section */}
//         <div className="footer__links flex flex-wrap gap-5 justify-between">
//           {footerLinks.map((item) => (
//             <div key={item.title} className="footer__link w-full sm:w-1/3">
//               <h3 className="font-bold">{item.title}</h3>
//               <div className="flex flex-col gap-5">
//                 {item.links.map((link) => (
//                   <Link
//                     key={link.title}
//                     href={link.url}
//                     className="text-gray-500"
//                   >
//                     {link.title}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
//         <p>@2024 Grabbit. Build By XXX</p>

//         <div className="footer__copyrights-link">
//           <Link href="/" className="text-gray-500">
//             Privacy & Policy
//           </Link>
//           <Link href="/" className="text-gray-500">
//             Terms & Condition
//           </Link>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import Link from "next/link";
import { footerLinks } from "@/constant";
const Footer = () => {
  return (
    <footer className="relative text-black-100 mt-5 border-t border-gray-100 bg-white">
      <div className="sm:px-16 px-6 py-10">
        <p className="text-base text-gray-700">
          RideHub 2024 <br />
          All Rights Reserved &copy;
        </p>

        {/* Footer Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 my-10">
          {footerLinks.map((item) => (
            <div key={item.title}>
              <h3 className="font-bold mb-3">{item.title}</h3>
              <ul className="list-none">
                {item.links.map((link) => (
                  <li key={link.title} className="mt-2">
                    <Link href={link.url} className="text-gray-500">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 sm:px-16 px-6 py-10">
        <p className="text-center">@2024 Grabbit. Build By Java.util.random</p>
        <div className="text-center mt-4">
          <Link href="#" className="text-gray-500 mx-2">
            Privacy & Policy
          </Link>
          <Link href="#" className="text-gray-500 mx-2">
            Terms & Condition
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
