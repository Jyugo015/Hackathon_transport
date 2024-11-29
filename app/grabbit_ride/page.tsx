"use client";
// const Page= () => {

//   return (
//     // <div>
//     //   <h1>Grabbit Ride</h1>
//     //   <p className="h-screen">This is the content for book ride page.</p>
//     // </div>
//   );
// };

// export default Page;
import { useEffect, useState } from "react";

export default function Page() {
  const locations = ["Library", "Hostel", "Cafeteria", "Main Gate", "Lab"];
  const drivers = [
    { id: 1, name: "Driver A", available: true, car: 4, phone: "012-3456789", telegram: "lyw015018" },
    { id: 2, name: "Driver B", available: true, car: 6, phone: "013-9876543", telegram: "lyw015018" },
    { id: 3, name: "Driver C", available: true, car: 4, phone: "014-5678910", telegram: "lyw015018" },
  ];

  const [pickUp, setPickUp] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [passengers, setPassengers] = useState<number>(1);
  const [fee, setFee] = useState<number | null>(null);
  const [availableDriver, setAvailableDriver] = useState<{ name: string; phone: string; telegram: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [shortestPaths, setShortestPaths] = useState<number[][] | null>(null); // State for shortest paths
  const [distance, setDistance] = useState<number | 0>(0);  // State for storing the distance

  // const distanceMatrix: Record<string, Record<string, number>> = {
  //   Library: { Hostel: 2, Cafeteria: 1.5, "Main Gate": 3, Lab: 2.5 },
  //   Hostel: { Library: 2, Cafeteria: 1, "Main Gate": 2.5, Lab: 3 },
  //   Cafeteria: { Hostel: 1, Library: 1.5, "Main Gate": 2, Lab: 1.2 },
  //   "Main Gate": { Hostel: 2.5, Cafeteria: 2, Library: 3, Lab: 0.5 },
  //   Lab: { Hostel: 3, Cafeteria: 1.2, Library: 2.5, "Main Gate": 0.5 },
  // };

    // Graph Representation as an Adjacency Matrix
  // const locations = ["Library", "Hostel", "Cafeteria", "Main Gate", "Lab"];
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

  // const calculateFee = () => {
  //   const distance = distanceMatrix[pickUp]?.[destination];
  //   if (distance !== undefined) {
  //     setFee(distance * 1.5); // 1.5 units per km
  //   } else {
  //     setFee(null);
  //   }
  // };

  const findDriver = () => {
    const driver = drivers.find((d) => d.available && d.car >= passengers);
    if (driver) {
      setAvailableDriver({ name: driver.name, phone: driver.phone, telegram: driver.telegram });
      driver.available = false; // Mark the driver as unavailable after the request
    } else {
      setAvailableDriver(null);
    }
  };

  const handleRequest = async () => {
    if (pickUp && destination) {
      if (pickUp === destination) {
        setErrorMessage("Pickup and destination cannot be the same. Please select different locations.");
        setFee(null);
        setAvailableDriver(null);
        return;
      }
      setErrorMessage(""); // Clear any previous error messages
      // calculateFee();
      const calculatedDistance = getDistance(pickUp, destination); // Get the distance between locations
      setDistance(calculatedDistance); // Set the calculated distance
      setFee(calculatedDistance * 1.5); // Calculate and set the fee
      findDriver();

      // Check if availableDriver is null before sending it to the backend
      const journeyData = {
        user_id: 1, // You can replace this with the actual user ID
        pickUp,
        destination,
        distance: calculatedDistance,
        fee: calculatedDistance * 1.5,
        driver: availableDriver ? availableDriver : null, // Only pass driver data if available
      };

      // Send the journey data to the backend to save to MySQL
      try {
        const response = await fetch('http://localhost:5000/api/save-journey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(journeyData), // Use the journeyData object to send the data
        });

        const data = await response.json();
        if (response.ok) {
          console.log('Journey saved with ID:', data.journeyId);
        } else {
          console.error('Error saving journey:', data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
      } else {
        setErrorMessage("Please select both pickup and destination locations.");
        setFee(null);
        setAvailableDriver(null);
      }
    };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "600px", margin: "auto" }}>
      {/* Header Image */}
      <div style={{ textAlign: "center" }}>
        <img
          src="/images/ride/um map.png" // Replace with your image URL
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
          {[1, 2, 3, 4, 5, 6].map((num) => (
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

      {/* Error Message */}
      {errorMessage && (
        <p style={{ color: "red", textAlign: "center", margin: "10px 0" }}>
          {errorMessage}
        </p>
      )}

      {/* Results Section */}
      <div style={{ marginTop: "20px" }}>
      {fee !== null && (
        <>
        <p style={{ fontSize: "16px", margin: "10px 0" }}>
          <strong>Distance:</strong> {distance.toFixed(2)} km
        </p>
        <p style={{ fontSize: "16px", margin: "10px 0" }}>
          <strong>Estimated Fee:</strong> RM {fee.toFixed(2)}
        </p>
      </>
      )}
      {availableDriver ? (
      <div style={{ fontSize: "16px", margin: "10px 0" }}>
        <p>
          <strong>Available Driver:</strong> {availableDriver.name} <br />
          <strong>Phone:</strong> {availableDriver.phone}
        </p>
        <a
          href={`https://t.me/${availableDriver.telegram}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#0088cc",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          Chat on Telegram
        </a>
      </div>
        ) : (
          !errorMessage && <p style={{ fontSize: "16px", margin: "10px 0" }}>No drivers available</p>
        )}
      </div>

    </div>
  );
}
