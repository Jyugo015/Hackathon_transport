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
import { getFirestore, doc, setDoc, collection, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export default function Page() {
  // Your Firebase project configuration (found in the Firebase Console under "Project Settings")
  const firebaseConfig = {
    apiKey: "AIzaSyCMpwWdMFCmjjywDNzzzA8yXabKCsBYk3U",
    authDomain: "transportation-9807f.firebaseapp.com",
    projectId: "transportation-9807f",
    storageBucket: "transportation-9807f.firebasestorage.app",
    messagingSenderId: "1022719929860",
    appId: "1:1022719929860:web:88a131723113eb0f434f51",
    measurementId: "G-NMVHGRNJNQ"
  };

  // Initialize Firebase and Firestore
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const locations = ["KK1", "KK2", "KK3", "KK4", "KK5", "KK6", "KK7", "KK8", "KK9", "KK10",
  "KK11", "KK12", "KK13", "Academy of Islamic Studies","Acedmy of Malay Studies", //14,15
  "Faculty of Arts and Social Sciences", "Faculty of Business and Economics", //16,17
  "Faculty of Computer Science and Information Technology", "Faculty of Education", //18,19
  "Faculty of Engineering", "Faculty of Language and Linguistics", "Faculty of Law",//20,21,22
  "Faculty of Medicine", "Faculty of Science", "He n She Coffee", "Main Library", "UM Arena", "UM Central"];
  //23,24,25,26,27,28
  // const drivers = [
  //   { id: 1, name: "Driver A", available: true, car: 4, phone: "012-3456789", telegram: "lyw015018" },
  //   { id: 2, name: "Driver B", available: true, car: 6, phone: "013-9876543", telegram: "lyw015018" },
  //   { id: 3, name: "Driver C", available: true, car: 4, phone: "014-5678910", telegram: "lyw015018" },
  // ];

  const [pickUp, setPickUp] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [passengers, setPassengers] = useState<number>(1);
  const [fee, setFee] = useState<number | null>(null);
  const [availableDriver, setAvailableDriver] = useState<{id:string;
                                                          name: string; 
                                                          phone: string; 
                                                          telegram: string;
                                                          plateNo: string;
                                                          type: string;
                                                          car: number;
                                                          seatAvailable: number;
                                                          available: boolean } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [shortestPaths, setShortestPaths] = useState<number[][] | null>(null); // State for shortest paths
  const [distance, setDistance] = useState<number | 0>(0);  // State for storing the distance
  const [drivers, setDrivers] = useState<any[]>([]);  // Store all drivers with seatAvailable
  const [isRequestSent, setIsRequestSent] = useState(false); // To track if request is sent
  const [canceled, setCanceled] = useState(false); // State to track if the ride was canceled

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
    // From KK1 Infinity,
    [0, 0.6, Infinity, Infinity, Infinity, 0.6, Infinity, Infinity, Infinity, Infinity, Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity, 0.45,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity],  // KK1
    [0.6, 0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,0.6,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity],  // KK2
    [Infinity, Infinity, 0, 0.35, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0.7, Infinity, Infinity, Infinity, Infinity, Infinity, 0.4, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], // KK3
    [Infinity, Infinity, 0.35, 0, Infinity, Infinity, 0.7, Infinity, Infinity, Infinity, Infinity, Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity], // KK4
    [Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity, Infinity, Infinity, 0.35, 0.26, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], // KK5
    [0.6, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0.3, Infinity, Infinity, Infinity, Infinity, Infinity], // KK6
    [Infinity, Infinity, Infinity, 0.4, Infinity,Infinity, 0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity], // KK7
    
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0.5, 0, 0.75, Infinity, Infinity, Infinity, Infinity], // KK8
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0.75, 0, 0.75, Infinity, Infinity, Infinity], // KK9
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0.75, 0, 0.45, Infinity, Infinity], // KK10
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0.45, 0, 0.4, Infinity], // KK11
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0.4, 0, 0.35], // KK12
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0.35, 0, 0.7], // KK13
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0.7, 0], //Academy of Islamic Studies
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0.55], //Acedmy of Malay Studies
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Faculty of Arts and Social Sciences
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Faculty of Business and Economics
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Faculty of Computer Science and Information Technology
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Faculty of Education
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Faculty of Engineering
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Faculty of Language and Linguistics
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Faculty of Law
    [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Faculty of Medicine
    [0.4, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Faculty of Science
    [0.25, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //He n She Coffee
    [Infinity, 2.8, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],//Main Library
    [Infinity, 2.8, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity] ,//UM Arena
    [Infinity, 2.8, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity]  //UM Central
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

  // Fetch driver data (including seatAvailable)
  const fetchDrivers = async () => {
    const driversRef = collection(db, "drivers");
    const driversSnapshot = await getDocs(driversRef);
    const driverData = driversSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDrivers(driverData);
  };

  useEffect(() => {
    fetchDrivers();  // Fetch the drivers when the component loads
  }, []);

  // Find available driver based on seat availability
  const findDriver = async () => {
    const driver = drivers.find((d) => d.available && d.seatAvailable >= passengers);
    if (driver) {
      setAvailableDriver({ 
        id: driver.id,
        name: driver.name,
        phone: driver.phone,
        telegram: driver.telegram,
        plateNo: driver.plateNo,  // Include plateNo
        type: driver.type,        // Include type
        seatAvailable : driver.seatAvailable,
        available : driver.available,
        car:driver.car,
      });

      // Update driver's seat availability
      const driverRef = doc(db, "drivers", driver.id);
      await updateDoc(driverRef, {
        available: false,  // If seats are 0, mark as unavailable
      });
      setIsRequestSent(true); // Mark request as sent
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
      await findDriver();

      // Check if availableDriver is null before sending it to the backend
      // const journeyData = {
      //   user_id: 1, // You can replace this with the actual user ID
      //   pickUp,
      //   destination,
      //   distance: calculatedDistance,
      //   fee: calculatedDistance * 1.5,
      //   driver: availableDriver ? availableDriver : null, // Only pass driver data if available
      // };

      // Send the journey data to the backend to save to MySQL
      // try {
      //   const response = await fetch('http://localhost:5000/api/save-journey', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(journeyData), // Use the journeyData object to send the data
      //   });

      //   const data = await response.json();
      //   if (response.ok) {
      //     console.log('Journey saved with ID:', data.journeyId);
      //   } else {
      //     console.error('Error saving journey:', data.error);
      //   }
      // } catch (error) {
      //   console.error('Error:', error);
      // }
      } else {
        setErrorMessage("Please select both pickup and destination locations.");
        setFee(null);
        setAvailableDriver(null);
      }
    };

    useEffect(() => {
      if (pickUp || destination) {
        setIsRequestSent(false); // Reset if either pickUp or destination changes after a request is sent
      }
    }, [pickUp, destination]);

    const handleCancel = async () => {
      // Reset all relevant states
      setPickUp("");
      setDestination("");
      setPassengers(1);
      setFee(null);
      setDistance(0);
      setErrorMessage("");
      setCanceled(true); // Mark that the order was canceled
      
      if (availableDriver) {
        // Use the availableDriver's ID for Firestore reference
        const driverRef = doc(db, "drivers", availableDriver.id);
        
        // Now update the driver's seat availability and availability status
        await updateDoc(driverRef, {
          available: true,  // If seats become 0, mark as unavailable
        });

        const updatedDrivers = drivers.map((d) => 
          d.id === availableDriver.id 
          ? { ...d, available: true }
          : d
        );
        
        setDrivers(updatedDrivers); // Update the drivers state
        
        // Optionally, set some state or flags if you need to indicate that the request was sent
        setIsRequestSent(false);  // Mark request as sent
      }

      setAvailableDriver(null);
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
        <strong>Phone:</strong> {availableDriver.phone} <br />
        <strong>Plate Number:</strong> {availableDriver.plateNo} <br />
        <strong>Vehicle Type:</strong> {availableDriver.type} <br />
        </p>
        <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "15px", // Adds margin-top for proper spacing
            }}
          >
          {/* Chat on Telegram button */}
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
              }}
            >
              Chat on Telegram
        </a>

        {/* Cancel Order Button */}
        <button
          onClick={() => handleCancel()} // Cancel the request
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336", // Red color for cancel
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            display: "block",
            margin: "10px auto",
            marginLeft: "250px", // This pushes the button to the far right
          }}
        >
          Cancel Order
        </button>
        </div>
      </div>
        ) : (
          !errorMessage && <p style={{ fontSize: "16px", margin: "10px 0" }}>No drivers available</p>
        )}
      </div>

    </div>
  );
}
