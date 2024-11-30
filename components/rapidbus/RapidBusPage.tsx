"use client";

import { RAPID_BUSES } from "@/constant";
import TrackBus from "@/components/rapidbus/TrackBus";
import Timetable from "@/components/rapidbus/Timetable";
import Image from "next/image";

const BusPage = ({ slug }: { slug: string }) => {
  const route = RAPID_BUSES[slug];

  if (!route) {
    return <p className="h-screen">Route not found!</p>;
  }

  return (
    <div className="p-6 h-full">
      <h1 className="text-3xl font-bold mb-4 text-center">{route.name}</h1>
      <div className="h-screen">
        <TrackBus urlPath={route.urlPath} />
      </div>
      <div>
        {route.timetable_img && (
          <div className="flex justify-center">
            <Image
              src={route.timetable_img}
              alt="Timetable"
              width={800}
              height={800}
              className="w-1/2"
            />
          </div>
        )}
      </div>
      <div className="flex justify-center gap-x-20">
        {/* Render timetable if it exists */}
        {route.timetable_WDays && (
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Weekdays
            </h2>
            <Timetable times={route.timetable_WDays.map((item) => item.time)} />
          </div>
        )}
        {route.timetable_WEnds && (
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Weekends
            </h2>
            <Timetable times={route.timetable_WEnds.map((item) => item.time)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BusPage;
