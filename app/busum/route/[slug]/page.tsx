// "use client";
// import { useRouter } from "next/navigation";
// import { BUS_ROUTES } from "@/constant"; // Import bus route data
// import Image from "next/image";

// const RoutePage = () => {
//   const router = useRouter();
//   const { slug } = router.query;

//   const route = slug ? BUS_ROUTES[slug as keyof typeof BUS_ROUTES] : null;

//   // Handle loading state
//   if (!slug) {
//     return <p>Loading...</p>;
//   }

//   // Handle invalid route
//   if (!route) {
//     return <p>Route not found!</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">{route.name}</h1>

//       {/* Map Section */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold mb-2">Route Map</h2>
//         <Image
//           src={route.mapUrl}
//           alt={`${route.name} map`}
//           width={800}
//           height={400}
//           className="rounded-lg shadow-md"
//         />
//       </div>

//       {/* Timetable Section */}
//       <div>
//         <h2 className="text-2xl font-semibold mb-2">Timetable</h2>
//         <table className="table-auto w-full text-left border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 px-4 py-2">Time</th>
//               <th className="border border-gray-300 px-4 py-2">Stop</th>
//             </tr>
//           </thead>
//           <tbody>
//             {route.timetable.map((entry, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="border border-gray-300 px-4 py-2">
//                   {entry.time}
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   {entry.stop}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RoutePage;

"use client";
import { useParams } from "next/navigation";
import { BUS_ROUTES } from "@/constant";
import Image from "next/image";

const RoutePage = () => {
  const { slug } = useParams(); // Get dynamic route parameter
  const route = typeof slug === "string" ? BUS_ROUTES[slug] : null;

  if (!slug) {
    return <p className="h-screen">Loading...</p>;
  }

  if (!route) {
    return <p className="h-screen">Route not found!</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">{route.name}</h1>

      {/* Map Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Route Map</h2>
        <Image
          src={route.mapUrl}
          alt={`${route.name} map`}
          width={2000}
          height={2000}
          className="w-[600px] rounded-lg shadow-md"
        />
      </div>
      <div className="flex gap-x-20">
        {/* Timetable Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Timetable</h2>
          <table className="table-auto w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Trip</th>
                <th className="border border-gray-300 px-4 py-2">
                  Operation Time from UM Central
                </th>
              </tr>
            </thead>
            <tbody>
              {route.timetable.map((entry: any, index: any) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Location Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Location</h2>
          <table className="table-auto w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">No</th>
                <th className="border border-gray-300 px-4 py-2">Bus Stop</th>
              </tr>
            </thead>
            <tbody>
              {route.busStop.map((entry: any, index: any) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entry.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="my-4">
        Shuttle bus schedule:{" "}
        <a
          href="https://jpphb.um.edu.my/img/Pengangkutan/Oct.24/JADUAL%20SHUTTLE%202024.pdf"
          className="hover:text-blue-500"
        >
          Click here
        </a>
      </div>
    </div>
  );
};

export default RoutePage;
