"use client";
// const Page = () => {
//   return (
//     <div>
//       <h1>DRT Page</h1>
//       <p className="h-screen">This is the content for DRT Page.</p>
//     </div>
//   );
// };

// export default Page;
import { useEffect, useState } from "react";

export default function Page() {
  const locations = ["Library", "Hostel", "Cafeteria", "Main Gate", "Lab"];
  const vans = [
    { id: 1, name: "Van A", available: true, capacity: 15 },
    { id: 2, name: "Van B", available: true, capacity: 15 },
  ];

  const [pickUp, setPickUp] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [passengers, setPassengers] = useState<number>(1);
  const [availableVan, setAvailableVan] = useState<string>("");
  const [waitingTime, setWaitingTime] = useState<number | null>(null);
  const [shortestPaths, setShortestPaths] = useState<number[][] | null>(null); // State for shortest paths
  const [distance, setDistance] = useState<number | 0>(0);  // State for storing the distance
  const fixedFee = 1; // Fixed fare RM1

  // const distanceMatrix: Record<string, Record<string, number>> = {
  //   Library: { Hostel: 2, Cafeteria: 1.5, "Main Gate": 3, Lab: 2.5 },
  //   Hostel: { Library: 2, Cafeteria: 1, "Main Gate": 2.5, Lab: 3 },
  //   Cafeteria: { Hostel: 1, Library: 1.5, "Main Gate": 2, Lab: 1.2 },
  //   "Main Gate": { Hostel: 2.5, Cafeteria: 2, Library: 3, Lab: 0.5 },
  //   Lab: { Hostel: 3, Cafeteria: 1.2, Library: 2.5, "Main Gate": 0.5 },
  // };

  const graph = [
    [0, 2, 1.5, 3, 2.5], // Distances from Library
    [2, 0, 1, 2.5, 3],   // Distances from Hostel
    [1.5, 1, 0, 2, 1.2], // Distances from Cafeteria
    [3, 2.5, 2, 0, 0.5], // Distances from Main Gate
    [2.5, 3, 1.2, 0.5, 0], // Distances from Lab
  ];

  // useEffect to calculate shortest paths once when component mounts
  useEffect(() => {
    const shortestPaths = floydWarshall(graph);
    setShortestPaths(shortestPaths); // Set the state with the result
  }, []);

  function floydWarshall(graph: number[][]) {
    const dist = JSON.parse(JSON.stringify(graph)); // Clone graph to avoid mutation
    const n = graph.length;

    // Perform the Floyd-Warshall algorithm
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }

    return dist;
  }


  // Utility to fetch the shortest path between locations
  function getDistance(start: string, end: string): number {
    if (shortestPaths === null) return 0; // Guard clause if shortestPaths is not available
    const startIndex = locations.indexOf(start);
    const endIndex = locations.indexOf(end);
  
    if (startIndex === -1 || endIndex === -1) {
      throw new Error("Invalid location");
    }
  
    return shortestPaths[startIndex][endIndex];
  }

  // const calculateTime = () => {
  //   if (pickUp && destination && pickUp !== destination) {
  //     const distance = distanceMatrix[pickUp]?.[destination];
  //     if (distance !== undefined) {
  //       setWaitingTime(distance * 5); // 5 minutes per km
  //     } else {
  //       setWaitingTime(null);
  //     }
  //   } else {
  //     setWaitingTime(null);
  //   }
  // };

  const findVan = () => {
    const van = vans.find((v) => v.available && v.capacity >= passengers);
    setAvailableVan(van ? van.name : "No vans available");
    if (van) {
      van.available = false; // Mark the van as unavailable after the request
    }
  };

  const handleRequest = () => {
    if (pickUp && destination && pickUp !== destination) {
      const calculatedDistance = getDistance(pickUp, destination); 
      setWaitingTime(calculatedDistance * 5)
      findVan();
    } else {
      setAvailableVan("Invalid request. Please select different locations.");
      setWaitingTime(null);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "600px", margin: "auto" }}>
      {/* Header Image */}
      <div style={{ textAlign: "center" }}>
        <img
          src="/images/ride/drt.jpg"
          alt="Campus Ride Service"
          style={{ width: "100%", borderRadius: "10px", marginBottom: "20px" }}
        />
      </div>

      <h1 style={{ textAlign: "center", color: "#4CAF50" }}>Campus Ride Service</h1>

      {/* Pickup Location */}
      <div style={{ marginBottom: "10px" }}>
        <label>Pick Up: </label>
        <select
          value={pickUp}
          onChange={(e) => setPickUp(e.target.value)}
          style={{
            padding: "5px",
            marginLeft: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Destination */}
      <div style={{ marginBottom: "10px" }}>
        <label>Destination: </label>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{
            padding: "5px",
            marginLeft: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Number of Passengers */}
      <div style={{ marginBottom: "10px" }}>
        <label>Passengers: </label>
        <select
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}
          style={{
            padding: "5px",
            marginLeft: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Request Button */}
      <button
        onClick={handleRequest}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          display: "block",
          margin: "10px auto",
        }}
      >
        Request Ride
      </button>

      {/* Results Section */}
      <div style={{ marginTop: "20px" }}>
        {pickUp && destination && pickUp !== destination && (
          <p style={{ fontSize: "16px", margin: "10px 0" }}>
            <strong>Estimated Fee:</strong> RM {fixedFee.toFixed(2)}
          </p>
        )}
        {waitingTime !== null && (
          <p style={{ fontSize: "16px", margin: "10px 0" }}>
            <strong>Estimated Waiting Time:</strong> {waitingTime} minutes
          </p>
        )}
        {availableVan && (
          <p style={{ fontSize: "16px", margin: "10px 0" }}>
            <strong>Available Van:</strong> {availableVan}
          </p>
        )}
      </div>
    </div>
  );
}

