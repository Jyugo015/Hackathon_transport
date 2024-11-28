// import { BUS_ROUTES } from "@/constant";
// import Buses from "@/components/busum/Buses";
// const Page = () => {
//   return (
//     <div className="h-screen p-6">
//       <div>
//         <Buses />
//       </div>

//       <h1>Bus UM Page</h1>
//       <p>This is the content for Bus UM Page.</p>

//       <ul className="list-disc">
//         Bus does not operate on the following days and times:
//         <li>Weekend (Saturday & Sunday)</li>
//         <li>Public holiday</li>
//         <li>Mid sem, semester break & study week</li>
//         <li>Friday Prayer (12:30 pm - 2:30 pm)</li>
//       </ul>
//     </div>
//   );
// };

// export default Page;
import { BUS_ROUTES } from "@/constant";
import Buses from "@/components/busum/Buses";

const Page = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Buses Component */}
      <div>
        <Buses />
      </div>

      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Bus UM Information</h1>
        <p className="text-lg text-gray-700">
          Learn about the University Malaya (UM) bus service, including
          operational details, contact information, and service limitations.
        </p>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 p-6 border-l-4 border-yellow-400 rounded-md shadow-sm">
        <h2 className="text-xl font-semibold mb-2 text-yellow-600">
          Important Notes:
        </h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Bus does not operate on weekends (Saturday & Sunday).</li>
          <li>Bus does not operate on public holidays.</li>
          <li>
            Bus does not operate during mid-semester, semester breaks, and study
            weeks.
          </li>
          <li>
            Friday prayers break: <strong>12:30 PM - 2:30 PM</strong>.
          </li>
        </ul>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-100 p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <p className="text-gray-700">
          <strong>Transportation Section</strong> <br />
          Facility Division <br />
          Estates' Department (JHB) <br />
          Universiti Malaya (UM) <br />
          50603 Kuala Lumpur <br />
          MALAYSIA
        </p>
        <p className="mt-4">
          <strong>Tel:</strong> +603-7967 7022 ext 3311 / 7984 <br />
          <strong>Email for booking:</strong>{" "}
          <a
            href="mailto:kenderaanjpphb@um.edu.my"
            className="text-blue-500 underline"
          >
            kenderaanjpphb@um.edu.my
          </a>
          <br />
          <strong>For other vehicle booking:</strong> Website under maintenance
          <br />
          <strong>For enquiry and complaint:</strong> UM Helpdesk
        </p>
      </div>
    </div>
  );
};

export default Page;
