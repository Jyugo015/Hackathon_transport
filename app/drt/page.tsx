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
import { useState } from "react";

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
  const fixedFee = 1; // Fixed fare RM1

  const distanceMatrix: Record<string, Record<string, number>> = {
    Library: { Hostel: 2, Cafeteria: 1.5, "Main Gate": 3, Lab: 2.5 },
    Hostel: { Library: 2, Cafeteria: 1, "Main Gate": 2.5, Lab: 3 },
    Cafeteria: { Hostel: 1, Library: 1.5, "Main Gate": 2, Lab: 1.2 },
    "Main Gate": { Hostel: 2.5, Cafeteria: 2, Library: 3, Lab: 0.5 },
    Lab: { Hostel: 3, Cafeteria: 1.2, Library: 2.5, "Main Gate": 0.5 },
  };

  const calculateTime = () => {
    if (pickUp && destination && pickUp !== destination) {
      const distance = distanceMatrix[pickUp]?.[destination];
      if (distance !== undefined) {
        setWaitingTime(distance * 5); // 5 minutes per km
      } else {
        setWaitingTime(null);
      }
    } else {
      setWaitingTime(null);
    }
  };

  const findVan = () => {
    const van = vans.find((v) => v.available && v.capacity >= passengers);
    setAvailableVan(van ? van.name : "No vans available");
    if (van) {
      van.available = false; // Mark the van as unavailable after the request
    }
  };

  const handleRequest = () => {
    if (pickUp && destination && pickUp !== destination) {
      calculateTime();
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

