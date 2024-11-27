import { useRouter } from "next/router";
import React from "react";

const RoutePage: React.FC = () => {
  const router = useRouter();
  const { routeId } = router.query; // routeId will capture dynamic route like 'route-ab', 'route-ba', etc.

  const routeDetails = {
    "route-ab": "Details about Route AB",
    "route-ba": "Details about Route BA",
    "route-c": "Details about Route C",
    "route-college-13": "Details about Route College 13",
    "route-d": "Details about Route D",
    "route-e": "Details about Route E",
  };

  const routeIdString = Array.isArray(routeId) ? routeId[0] : routeId;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Route: {routeIdString?.toUpperCase()}
      </h1>
      <p>
        {routeDetails[routeIdString as keyof typeof routeDetails] ||
          "Route not found!"}
      </p>
    </div>
  );
};

export default RoutePage;
