// interface TimetableProps {
//   times: string[]; // Array of times
// }

// const Timetable = ({ times }: TimetableProps) => {
//   return (
//     <div>
//       {times.map((time, index) => (
//         <div key={index}>{time}</div>
//       ))}
//     </div>
//   );
// };

// export default Timetable;
interface TimetableProps {
  times: string[];
}

const Timetable = ({ times }: TimetableProps) => {
  return (
    <div className="flex">
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[1px] bg-gray-300">
          {times.map((time, index) => (
            <div
              key={index}
              className="bg-white p-3 text-center text-sm md:text-base font-medium border border-gray-200 hover:bg-gray-100 transition-all"
            >
              {time}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
