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
import { useState } from "react";

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

  const distanceMatrix: Record<string, Record<string, number>> = {
    Library: { Hostel: 2, Cafeteria: 1.5, "Main Gate": 3, Lab: 2.5 },
    Hostel: { Library: 2, Cafeteria: 1, "Main Gate": 2.5, Lab: 3 },
    Cafeteria: { Hostel: 1, Library: 1.5, "Main Gate": 2, Lab: 1.2 },
    "Main Gate": { Hostel: 2.5, Cafeteria: 2, Library: 3, Lab: 0.5 },
    Lab: { Hostel: 3, Cafeteria: 1.2, Library: 2.5, "Main Gate": 0.5 },
  };

  const calculateFee = () => {
    const distance = distanceMatrix[pickUp]?.[destination];
    if (distance !== undefined) {
      setFee(distance * 1.5); // 1.5 units per km
    } else {
      setFee(null);
    }
  };

  const findDriver = () => {
    const driver = drivers.find((d) => d.available && d.car >= passengers);
    if (driver) {
      setAvailableDriver({ name: driver.name, phone: driver.phone, telegram: driver.telegram });
      driver.available = false; // Mark the driver as unavailable after the request
    } else {
      setAvailableDriver(null);
    }
  };

  const handleRequest = () => {
    if (pickUp && destination) {
      if (pickUp === destination) {
        setErrorMessage("Pickup and destination cannot be the same. Please select different locations.");
        setFee(null);
        setAvailableDriver(null);
        return;
      }
      setErrorMessage(""); // Clear any previous error messages
      calculateFee();
      findDriver();
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
        <p style={{ fontSize: "16px", margin: "10px 0" }}>
        <strong>Estimated Fee:</strong> RM {fee.toFixed(2)}
        </p>
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
