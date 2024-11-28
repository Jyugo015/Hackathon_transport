"use client";
import React from "react";

interface TrackBusProps {
  urlPath: string;
}
const TrackBus = ({ urlPath }: TrackBusProps) => {
  return (
    <div className="relative w-full h-full p-6">
      <iframe
        src={urlPath}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Rapid Bus Kiosk"
      />
    </div>
  );
};

export default TrackBus;
