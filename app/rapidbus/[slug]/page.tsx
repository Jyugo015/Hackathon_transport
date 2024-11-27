"use client";
import { useParams } from "next/navigation";
import { RAPID_BUSES } from "@/constant";

const BusPage = () => {
  const { slug } = useParams(); // Get dynamic route parameter
  const route = typeof slug === "string" ? RAPID_BUSES[slug] : null;

  if (!slug) {
    return <p className="h-screen">Loading...</p>;
  }

  if (!route) {
    return <p className="h-screen">Route not found!</p>;
  }

  return (
    <div className="p-6 h-screen">
      <h1 className="text-3xl font-bold mb-4">{route.name}</h1>
    </div>
  );
};

export default BusPage;
