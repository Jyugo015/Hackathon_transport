import Link from "next/link";
import { CARD_ITEMS } from "@/constant";

export default function Hero() {
  return (
    <div className="min-h-screen bg-blue-300">
      {/* CARD */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {CARD_ITEMS.map((item, index) => (
            <div
              key={index}
              className="text-center bg-white p-6 rounded-md shadow-md hover:scale-105 transition ease-in-out delay-150"
            >
              <item.icon className="text-blue-400 w-12 h-12 mx-auto" />
              <h3 className="font-bold text-xl mt-4">{item.title}</h3>
              <p className="text-gray-600 px-8 mt-2">{item.description}</p>
              <Link href={item.path}>
                <button className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                  {item.buttonTitle}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// import Link from "next/link";
// import { CARD_ITEMS } from "@/constant";

// export default function Hero() {
//   return (
//     <div
//       className="min-h-screen bg-blue-100 flex items-center justify-center"
//       style={{
//         backgroundImage: "url('/images/hero/carousel/carousel-1.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* 卡片部分 */}
//       <div className="bg-blue-100 bg-opacity-90 p-8 rounded-lg shadow-lg">
//         <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
//           {CARD_ITEMS.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white p-8 rounded-lg shadow-md hover:scale-105 transition ease-in-out delay-150"
//             >
//               <item.icon className="text-blue-400 w-12 h-12 mx-auto" />
//               <h3 className="font-bold text-2xl mt-4 text-center text-gray-800">
//                 {item.title}
//               </h3>
//               <p className="text-gray-600 mt-4 text-center">
//                 {item.description}
//               </p>
//               <Link href={item.path}>
//                 <button className="mt-6 w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
//                   {item.buttonTitle}
//                 </button>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
