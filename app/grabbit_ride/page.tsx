"use client";
// const Page= () => {

//   return (
//     // <div>
//     //   <h1>Grabbit Ride</h1>
//     //   <p className="h-screen">This is the content for book ride page.</p>
//     // </div>
//   );
// };

// // export default Page;
// import { useEffect, useState } from "react";
// import { getFirestore, doc, setDoc, collection, getDocs, getDoc, updateDoc } from "firebase/firestore";
// import { initializeApp } from "firebase/app";
// import GrabbitRidePage from "@/components/grabbit_ride/GrabbitRidePage";


// export default function Page() {
//   // Your Firebase project configuration (found in the Firebase Console under "Project Settings")
//   const firebaseConfig = {
//     apiKey: "AIzaSyCMpwWdMFCmjjywDNzzzA8yXabKCsBYk3U",
//     authDomain: "transportation-9807f.firebaseapp.com",
//     projectId: "transportation-9807f",
//     storageBucket: "transportation-9807f.firebasestorage.app",
//     messagingSenderId: "1022719929860",
//     appId: "1:1022719929860:web:88a131723113eb0f434f51",
//     measurementId: "G-NMVHGRNJNQ"
//   };

//   // Initialize Firebase and Firestore
//   const app = initializeApp(firebaseConfig);
//   const db = getFirestore(app);
//   const locations = ["KK1", "KK2", "KK3", "KK4", "KK5", "KK6", "KK7", "KK8", "KK9", "KK10",
//   "KK11", "KK12", "KK13", "Academy of Islamic Studies","Acedmy of Malay Studies", //14,15
//   "Faculty of Arts and Social Sciences", "Faculty of Business and Economics", //16,17
//   "Faculty of Computer Science and Information Technology", "Faculty of Education", //18,19
//   "Faculty of Engineering", "Faculty of Language and Linguistics", "Faculty of Law",//20,21,22
//   "Faculty of Medicine", "Faculty of Science", "He n She Coffee", "Main Library", "UM Arena", "UM Central"];
//   //23,24,25,26,27,28
//   // const drivers = [
//   //   { id: 1, name: "Driver A", available: true, car: 4, phone: "012-3456789", telegram: "lyw015018" },
//   //   { id: 2, name: "Driver B", available: true, car: 6, phone: "013-9876543", telegram: "lyw015018" },
//   //   { id: 3, name: "Driver C", available: true, car: 4, phone: "014-5678910", telegram: "lyw015018" },
//   // ];

//   const [pickUp, setPickUp] = useState<string>("");
//   const [destination, setDestination] = useState<string>("");
//   const [passengers, setPassengers] = useState<number>(1);
//   const [fee, setFee] = useState<number | null>(null);
//   const [availableDriver, setAvailableDriver] = useState<{id:string;
//                                                           name: string; 
//                                                           phone: string; 
//                                                           telegram: string;
//                                                           plateNo: string;
//                                                           type: string;
//                                                           car: number;
//                                                           seatAvailable: number;
//                                                           available: boolean } | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const [shortestPaths, setShortestPaths] = useState<number[][] | null>(null); // State for shortest paths
//   const [distance, setDistance] = useState<number | 0>(0);  // State for storing the distance
//   const [drivers, setDrivers] = useState<any[]>([]);  // Store all drivers with seatAvailable
//   const [isRequestSent, setIsRequestSent] = useState(false); // To track if request is sent
//   const [canceled, setCanceled] = useState(false); // State to track if the ride was canceled

//   // const distanceMatrix: Record<string, Record<string, number>> = {
//   //   Library: { Hostel: 2, Cafeteria: 1.5, "Main Gate": 3, Lab: 2.5 },
//   //   Hostel: { Library: 2, Cafeteria: 1, "Main Gate": 2.5, Lab: 3 },
//   //   Cafeteria: { Hostel: 1, Library: 1.5, "Main Gate": 2, Lab: 1.2 },
//   //   "Main Gate": { Hostel: 2.5, Cafeteria: 2, Library: 3, Lab: 0.5 },
//   //   Lab: { Hostel: 3, Cafeteria: 1.2, Library: 2.5, "Main Gate": 0.5 },
//   // };

//     // Graph Representation as an Adjacency Matrix
//   // const locations = ["Library", "Hostel", "Cafeteria", "Main Gate", "Lab"];
//   const graph = [
//     // From KK1 Infinity,
//     [0, 0.6, 1.5, 2.3, 1.8, 0.6, 2.7, 3.0, 2.8, 3.2, 2.9, 3.1, 3.4, 3.0, 3.5, 3.8, 3.2, 3.9, 3.6, 3.4, 3.1, 0.45, 2.5, 3.7, 2.9, 0.25, 3.6, 3.9],  // KK1
//     [0.6, 0, 2.1, 2.5, 1.9, 2.2, 2.8, 3.4, 2.7, 3.5, 2.8, 3.3, 3.2, 3.8, 3.9, 3.1, 3.4, 3.7, 3.0, 0.6, 2.3, 3.1, 2.9, 3.5, 2.7, 3.0, 3.4, 2.8],  // KK2
//     [1.5, 2.1, 0, 0.35, 1.7, 2.0, 0.9, 2.6, 3.1, 3.4, 3.3, 2.5, 3.8, 3.7, 0.7, 2.9, 3.1, 3.5, 2.7, 3.1, 0.4, 2.7, 3.0, 3.8, 3.2, 2.6, 3.0, 3.4],  // KK3
//     [2.3, 2.5, 0.35, 0, 2.2, 3.0, 0.4, 3.5, 3.2, 2.7, 3.1, 2.9, 3.4, 3.2, 3.8, 3.0, 3.7, 2.8, 3.1, 2.4, 2.7, 2.6, 2.8, 3.2, 3.4, 3.6, 3.0, 3.7],  // KK4
//     [1.8, 1.9, 1.7, 2.2, 0, 1.5, 2.9, 2.8, 3.1, 2.4, 0.35, 0.26, 2.3, 1.9, 3.2, 3.5, 2.6, 2.9, 3.1, 2.7, 3.0, 2.5, 2.7, 2.8, 3.2, 3.1, 2.6, 3.4],  // KK5
//     [0.6, 2.2, 2.0, 3.0, 1.5, 0, 2.1, 3.5, 2.7, 2.5, 3.3, 3.0, 2.4, 3.2, 3.5, 2.6, 3.1, 3.8, 3.4, 2.5, 3.2, 2.6, 3.0, 3.5, 2.8, 0.3, 3.2, 2.9],  // KK6
//     [2.7, 2.8, 0.9, 0.4, 2.9, 2.1, 0, 2.5, 2.6, 3.4, 3.0, 2.8, 3.5, 3.1, 2.9, 3.3, 3.0, 3.2, 3.7, 2.8, 3.1, 2.7, 2.8, 3.1, 3.2, 3.6, 2.9, 3.4],  // KK7
//     [3.0, 3.4, 2.6, 3.5, 2.8, 3.5, 2.5, 0, 0.6, 2.8, 3.2, 2.9, 3.6, 3.1, 3.4, 3.7, 2.7, 3.5, 2.9, 3.2, 3.1, 2.6, 3.0, 3.8, 3.1, 3.3, 3.5, 3.0],  // KK8
//     [2.8, 2.7, 3.1, 3.2, 3.1, 2.7, 2.6, 0.6, 0, 0.3, 2.4, 2.7, 3.1, 3.2, 2.6, 3.3, 3.4, 3.2, 3.0, 3.4, 2.9, 2.5, 3.4, 3.7, 2.9, 3.2, 3.1, 3.5],  // KK9
//     [3.2, 3.5, 3.4, 2.7, 2.4, 2.5, 3.4, 2.8, 0.3, 0, 1.9, 3.5, 2.6, 3.7, 3.5, 3.2, 3.0, 3.8, 2.8, 3.4, 3.2, 2.8, 3.4, 3.8, 2.6, 3.0, 2.8, 3.1],  // KK10
//     [2.9, 2.8, 3.3, 3.1, 0.35, 3.3, 3.0, 3.2, 2.4, 1.9, 0, 2.8, 3.0, 3.4, 3.7, 2.8, 3.3, 3.1, 3.5, 3.1, 3.6, 2.9, 2.8, 3.6, 3.0, 3.2, 3.4, 2.9],  // KK11
//     [3.1, 3.3, 2.5, 2.9, 0.26, 3.0, 2.8, 2.9, 2.7, 3.5, 2.8, 0, 3.4, 3.3, 3.1, 3.6, 3.0, 3.7, 2.8, 2.6, 3.5, 2.7, 3.4, 3.2, 3.8, 3.1, 3.6, 3.0],  // KK12
//     [3.4, 3.2, 3.8, 3.4, 2.3, 2.4, 3.5, 3.6, 3.1, 2.6, 3.0, 3.4, 0, 2.5, 3.4, 2.9, 2.6, 3.2, 3.5, 3.8, 2.7, 3.1, 3.5, 3.3, 2.9, 3.6, 2.8, 3.4],  // KK13
//     [3.0, 3.8, 3.7, 3.2, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Academy of Islamic Studies
//     [3,5, 3.9, 0.7, 3.8, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Acedmy of Malay Studies
//     [3.8, 3.1, 2.9, 3.0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Faculty of Arts and Social Sciences
//     [3.2, 3.4, 3.1, 3.7, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Faculty of Business and Economics
//     [3.9, 3.7, 3.5, 2.8, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Faculty of Computer Science and Information Technology
//     [3.6, 3.0, 2.7, 3.1, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Faculty of Education
//     [3.4, 0.6, 3.1, 2.4, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Faculty of Engineering
//     [3.1, 2.3, 0.4, 2.7, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Faculty of Language and Linguistics
//     [0.45, 3.1, 2.7, 2.6, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity], //Faculty of Law
//     [2.5, 2.9, 3.0, 2.8, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity, Infinity, Infinity], //Faculty of Medicine
//     [3,7, 3.5, 3.8, 3.2, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity, Infinity], //Faculty of Science
//     [2.9, 2.7, 3.2, 3.4, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity, Infinity], //He n She Coffee
//     [0.25, 3.0, 2.6, 3.6, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0, Infinity, Infinity], //Main Library
//     [3.6, 3.4, 3.0, 3.0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0, Infinity], //UM Arena
//     [3.9, 2.8, 3.4, 3.7, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, 0], //UM Central
//   ];

//   // useEffect to calculate shortest paths once when component mounts
//   useEffect(() => {
//     const shortestPaths = floydWarshall(graph);
//     setShortestPaths(shortestPaths); // Set the state with the result
//   }, []);

//   function floydWarshall(graph: number[][]) {
//     const dist = JSON.parse(JSON.stringify(graph)); // Clone graph to avoid mutation
//     const n = graph.length;

//     // Perform the Floyd-Warshall algorithm
//     for (let k = 0; k < n; k++) {
//       for (let i = 0; i < n; i++) {
//         for (let j = 0; j < n; j++) {
//           if (dist[i][k] + dist[k][j] < dist[i][j]) {
//             dist[i][j] = dist[i][k] + dist[k][j];
//           }
//         }
//       }
//     }

//     return dist;
//   }


//   // Utility to fetch the shortest path between locations
//   function getDistance(start: string, end: string): number {
//     if (shortestPaths === null) return 0; // Guard clause if shortestPaths is not available
//     const startIndex = locations.indexOf(start);
//     const endIndex = locations.indexOf(end);
  
//     if (startIndex === -1 || endIndex === -1) {
//       throw new Error("Invalid location");
//     }
  
//     return shortestPaths[startIndex][endIndex];
//   }

//   // const calculateFee = () => {
//   //   const distance = distanceMatrix[pickUp]?.[destination];
//   //   if (distance !== undefined) {
//   //     setFee(distance * 1.5); // 1.5 units per km
//   //   } else {
//   //     setFee(null);
//   //   }

//   // Fetch driver data (including seatAvailable)
//   const fetchDrivers = async () => {
//     const driversRef = collection(db, "drivers");
//     const driversSnapshot = await getDocs(driversRef);
//     const driverData = driversSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setDrivers(driverData);
//   };

//   useEffect(() => {
//     fetchDrivers();  // Fetch the drivers when the component loads
//   }, []);

//   // Find available driver based on seat availability
//   const findDriver = async () => {
//     const driver = drivers.find((d) => d.available && d.seatAvailable >= passengers);
//     if (driver) {
//       setAvailableDriver({ 
//         id: driver.id,
//         name: driver.name,
//         phone: driver.phone,
//         telegram: driver.telegram,
//         plateNo: driver.plateNo,  // Include plateNo
//         type: driver.type,        // Include type
//         seatAvailable : driver.seatAvailable,
//         available : driver.available,
//         car:driver.car,
//       });

//       // Update driver's seat availability
//       const driverRef = doc(db, "drivers", driver.id);
//       await updateDoc(driverRef, {
//         available: false,  // If seats are 0, mark as unavailable
//       });
//       setIsRequestSent(true); // Mark request as sent
//     } else {
//       setAvailableDriver(null);
//     }
//   };

//   const handleRequest = async () => {
//     if (pickUp && destination) {
//       if (pickUp === destination) {
//         setErrorMessage("Pickup and destination cannot be the same. Please select different locations.");
//         setFee(null);
//         setAvailableDriver(null);
//         return;
//       }
//       setErrorMessage(""); // Clear any previous error messages
//       // calculateFee();
//       const calculatedDistance = getDistance(pickUp, destination); // Get the distance between locations
//       setDistance(calculatedDistance); // Set the calculated distance
//       setFee(calculatedDistance * 1.5); // Calculate and set the fee
//       await findDriver();

//       // Check if availableDriver is null before sending it to the backend
//       // const journeyData = {
//       //   user_id: 1, // You can replace this with the actual user ID
//       //   pickUp,
//       //   destination,
//       //   distance: calculatedDistance,
//       //   fee: calculatedDistance * 1.5,
//       //   driver: availableDriver ? availableDriver : null, // Only pass driver data if available
//       // };

//       // Send the journey data to the backend to save to MySQL
//       // try {
//       //   const response = await fetch('http://localhost:5000/api/save-journey', {
//       //     method: 'POST',
//       //     headers: {
//       //       'Content-Type': 'application/json',
//       //     },
//       //     body: JSON.stringify(journeyData), // Use the journeyData object to send the data
//       //   });

//       //   const data = await response.json();
//       //   if (response.ok) {
//       //     console.log('Journey saved with ID:', data.journeyId);
//       //   } else {
//       //     console.error('Error saving journey:', data.error);
//       //   }
//       // } catch (error) {
//       //   console.error('Error:', error);
//       // }
//       } else {
//         setErrorMessage("Please select both pickup and destination locations.");
//         setFee(null);
//         setAvailableDriver(null);
//       }
//     };

//     useEffect(() => {
//       if (pickUp || destination) {
//         setIsRequestSent(false); // Reset if either pickUp or destination changes after a request is sent
//       }
//     }, [pickUp, destination]);

//     const handleCancel = async () => {
//       // Reset all relevant states
//       setPickUp("");
//       setDestination("");
//       setPassengers(1);
//       setFee(null);
//       setDistance(0);
//       setErrorMessage("");
//       setCanceled(true); // Mark that the order was canceled
      
//       if (availableDriver) {
//         // Use the availableDriver's ID for Firestore reference
//         const driverRef = doc(db, "drivers", availableDriver.id);
        
//         // Now update the driver's seat availability and availability status
//         await updateDoc(driverRef, {
//           available: true,  // If seats become 0, mark as unavailable
//         });

//         const updatedDrivers = drivers.map((d) => 
//           d.id === availableDriver.id 
//           ? { ...d, available: true }
//           : d
//         );
        
//         setDrivers(updatedDrivers); // Update the drivers state
        
//         // Optionally, set some state or flags if you need to indicate that the request was sent
//         setIsRequestSent(false);  // Mark request as sent
//       }

//       setAvailableDriver(null);
//     };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "600px", margin: "auto" }}>
//       {/* Header Image */}
//       <div style={{ textAlign: "center" }}>
//         <img
//           src="/images/ride/um map.png" // Replace with your image URL
//           alt="Campus Ride Service"
//           style={{ width: "100%", borderRadius: "10px", marginBottom: "20px" }}
//         />
//       </div>

//       <h1 style={{ textAlign: "center", color: "#4CAF50" }}>Campus Ride Service</h1>

//       {/* Pickup Location */}
//       <div style={{ marginBottom: "10px" }}>
//         <label>Pick Up: </label>
//         <select
//           value={pickUp}
//           onChange={(e) => setPickUp(e.target.value)}
//           style={{
//             padding: "5px",
//             marginLeft: "10px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//           }}
//         >
//           <option value="">Select Location</option>
//           {locations.map((loc) => (
//             <option key={loc} value={loc}>
//               {loc}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Destination */}
//       <div style={{ marginBottom: "10px" }}>
//         <label>Destination: </label>
//         <select
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//           style={{
//             padding: "5px",
//             marginLeft: "10px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//           }}
//         >
//           <option value="">Select Location</option>
//           {locations.map((loc) => (
//             <option key={loc} value={loc}>
//               {loc}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Number of Passengers */}
//       <div style={{ marginBottom: "10px" }}>
//         <label>Passengers: </label>
//         <select
//           value={passengers}
//           onChange={(e) => setPassengers(Number(e.target.value))}
//           style={{
//             padding: "5px",
//             marginLeft: "10px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//           }}
//         >
//           {[1, 2, 3, 4, 5, 6].map((num) => (
//             <option key={num} value={num}>
//               {num}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Request Button */}
//       <button
//         onClick={handleRequest}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "#4CAF50",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//           display: "block",
//           margin: "10px auto",
//         }}
//       >
//         Request Ride
//       </button>

//       {/* Error Message */}
//       {errorMessage && (
//         <p style={{ color: "red", textAlign: "center", margin: "10px 0" }}>
//           {errorMessage}
//         </p>
//       )}

//       {/* Results Section */}
//       <div style={{ marginTop: "20px" }}>
//       {fee !== null && (
//         <>
//         <p style={{ fontSize: "16px", margin: "10px 0" }}>
//           <strong>Distance:</strong> {distance.toFixed(2)} km
//         </p>
//         <p style={{ fontSize: "16px", margin: "10px 0" }}>
//           <strong>Estimated Fee:</strong> RM {fee.toFixed(2)}
//         </p>
//       </>
//       )}
//       {availableDriver ? (
//       <div style={{ fontSize: "16px", margin: "10px 0" }}>
//         <p>
//         <strong>Available Driver:</strong> {availableDriver.name} <br />
//         <strong>Phone:</strong> {availableDriver.phone} <br />
//         <strong>Plate Number:</strong> {availableDriver.plateNo} <br />
//         <strong>Vehicle Type:</strong> {availableDriver.type} <br />
//         </p>
//         <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginTop: "15px", // Adds margin-top for proper spacing
//             }}
//           >
//           {/* Chat on Telegram button */}
//             <a
//               href={`https://t.me/${availableDriver.telegram}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               style={{
//                 display: "inline-block",
//                 padding: "10px 20px",
//                 backgroundColor: "#0088cc",
//                 color: "#fff",
//                 textDecoration: "none",
//                 borderRadius: "5px",
//               }}
//             >
//               Chat on Telegram
//         </a>

//         {/* Cancel Order Button */}
//         <button
//           onClick={() => handleCancel()} // Cancel the request
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#f44336", // Red color for cancel
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             display: "block",
//             margin: "10px auto",
//             marginLeft: "250px", // This pushes the button to the far right
//           }}
//         >
//           Cancel Order
//         </button>
//         </div>
//       </div>
//         ) : (
//           !errorMessage && <p style={{ fontSize: "16px", margin: "10px 0" }}>No drivers available</p>
//         )}
//       </div>

//     </div>
//   );
// }

import React, { useRef, useState, useEffect} from "react";
import { getFirestore, doc, setDoc, collection, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import { CustomInput } from "@/components/grabbit_ride/CustomInput"; // Adjust the import path as needed

export default function GrabbitRidePage() {
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


  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);
  const [numberOfPassengers, setNumberOfPassengers] = useState(1);
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);

  const [drivers, setDrivers] = useState<any[]>([]);
  const [availableDriver, setAvailableDriver] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRequestSent, setIsRequestSent] = useState<boolean>(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const calculateRoute = async () => {
    if (!originRef.current?.value || !destinationRef.current?.value) {
      alert("Please fill out both pickup and destination fields.");
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    try {
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      if (results.routes?.length > 0) {
        const route = results.routes[0].legs[0];
        if (route.distance) {
          const distanceInKm = route.distance.value / 1000; // Convert meters to kilometers
          const calculatedPrice = distanceInKm * 3; // RM3 per kilometer

          setDirectionsResponse(results);
          setDistance(route.distance.text || null);
          setDuration(route.duration ? route.duration.text : null);
          setPrice(calculatedPrice);
        } else {
          alert("Distance information is not available.");
        }
      } else {
        alert("No route found between the selected locations.");
      }
    } catch (error) {
      console.error("Error calculating route:", error);
    }
  };

  // Fetch Drivers from Firestore
  const fetchDrivers = async () => {
    try {
      const driversSnapshot = await getDocs(collection(db, "drivers"));
      const driverData = driversSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDrivers(driverData);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Find Available Driver
  const findDriver = async () => {
    // Find a driver with enough seats available
    const driver = drivers.find(
      (d) => d.available && d.seatAvailable >= numberOfPassengers
    );
  
    if (driver) {
      setAvailableDriver(driver);
  
      // Update Firestore to mark the driver as unavailable
      const driverRef = doc(db, "drivers", driver.id);
      await updateDoc(driverRef, { available: false });
  
      // Optionally reduce the seat count (if you track it in real-time)
      await updateDoc(driverRef, {
        seatAvailable: driver.seatAvailable - numberOfPassengers,
      });
    } else {
      setAvailableDriver(null);
    }
  };
  

  // Handle Request Ride
  const handleRequest = async () => {
    if (originRef.current?.value && destinationRef.current?.value) {
      await calculateRoute();
      await findDriver(); // Assign a suitable driver
      setIsRequestSent(true);
    } else {
      setErrorMessage("Please select both pickup and destination locations.");
    }
  };

  // Cancel Ride
  const handleCancel = async () => {
    if (availableDriver) {
      const driverRef = doc(db, "drivers", availableDriver.id);
      await updateDoc(driverRef, {
        available: true,
        seatAvailable: availableDriver.seatAvailable + numberOfPassengers,
      });
  
      setDrivers((prev) =>
        prev.map((d) =>
          d.id === availableDriver.id
            ? { ...d, available: true, seatAvailable: d.seatAvailable + numberOfPassengers }
            : d
        )
      );
    }
  
    setAvailableDriver(null);
    setIsRequestSent(false);
    setPrice(null);
    setDistance(null);
    setDuration(null);
  };
  
  
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#4CAF50" }}>
        Campus Ride Service
      </h1>
      {/* Map to Display Route */}
      <div style={{ marginTop: "20px", height: "300px" }}>
        {isLoaded && directionsResponse && (
          <GoogleMap
            center={{ lat: 3.1209692, lng: 101.6536755 }}
            zoom={14}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            <DirectionsRenderer directions={directionsResponse} />
          </GoogleMap>
        )}
      </div>

      {/* Origin Input with CustomInput */}
      {isLoaded && (
        <div style={{ marginBottom: "10px" }}>
          <label>Pick Up: </label>
          <CustomInput
            placeholder="Enter pickup location"
            inputRef={originRef}
            predefinedLocations={[
              {
                name: "KK1",
                address:
                  "Kolej Kediaman Pertama Universiti Malaya, Lingkungan Budi, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
              },
              {
                name: "KK2",
                address:
                  "Kolej Kediaman Raja Dr. Nazrin Shah (KK12), Universiti Malaya, Lingkaran Wawasan, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
              },
              {
                name: "KK3",
                address:
                  "Kolej Kediaman Ketiga, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
              },
            ]}
          />
        </div>
      )}

      {/* Destination Input with CustomInput */}
      {isLoaded && (
        <div style={{ marginBottom: "10px" }}>
          <label>Destination: </label>
          <CustomInput
            placeholder="Enter destination location"
            inputRef={destinationRef}
            predefinedLocations={[
              {
                name: "KK1",
                address:
                  "Kolej Kediaman Pertama Universiti Malaya, Lingkungan Budi, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
              },
              {
                name: "KK2",
                address:
                  "Kolej Kediaman Raja Dr. Nazrin Shah (KK12), Universiti Malaya, Lingkaran Wawasan, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
              },
              {
                name: "KK3",
                address:
                  "Kolej Kediaman Ketiga, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
              },
            ]}
          />
        </div>
      )}

      {/* Calculate Route Button
      <button
        onClick={calculateRoute}
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
        Calculate Route
      </button> */}

      {/* Display Distance, Duration, and Price
      {distance && duration && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>
            <strong>Distance:</strong> {distance}
          </p>
          <p>
            <strong>Duration:</strong> {duration}
          </p>
          {price !== null && (
            <p>
              <strong>Estimated Price:</strong> RM {price.toFixed(2)}
            </p>
          )}
        </div>
      )} */}

      {/* Number of Passengers */}
      <div style={{ marginBottom: "10px" }}>
        <label>Passengers: </label>
        <select
          value={numberOfPassengers}
          onChange={(e) => setNumberOfPassengers(Number(e.target.value))}
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
      {!isRequestSent && (
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
      )}

      {/* Error Message */}
      {errorMessage && (
        <p style={{ color: "red", textAlign: "center", margin: "10px 0" }}>{errorMessage}</p>
      )}

      {/* Results Section */}
      {distance && duration && (
       <div style={{ marginTop: "20px", textAlign: "center" }}>
         {/* Display Distance and Duration */}
         <div style={{ marginBottom: "10px" }}>
         <p style={{ margin: "5px 0" }}>
           <strong>Distance:</strong> {distance}
         </p>
      <p style={{ margin: "5px 0" }}>
        <strong>Duration:</strong> {duration}
      </p>
      {price !== null && (
        <p style={{ margin: "5px 0" }}>
          <strong>Estimated Price:</strong> RM {price.toFixed(2)}
        </p>
      )}
    </div>

    {/* Driver Information */}
    {availableDriver ? (
      <div>
        <p style={{ margin: "5px 0" }}>
          <strong>Driver:</strong> {availableDriver.name} <br />
          <strong>Phone:</strong> {availableDriver.phone} <br />
          <strong>Plate Number:</strong> {availableDriver.plateNo} <br />
          <strong>Vehicle Type:</strong> {availableDriver.type} <br />
        </p>

        {/* Action Buttons */}
        <div style={{ marginTop: "10px" }}>
          {/* Chat on Telegram Button */}
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
              marginRight: "10px",
            }}
          >
            Chat on Telegram
          </a>

          {/* Cancel Order Button */}
          <button
            onClick={handleCancel}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel Order
          </button>
        </div>
      </div>
    ) : (
      <p style={{ marginTop: "10px", color: "#555" }}>No drivers available.</p>
    )}
  </div>
)}


      
    </div>
  );
}
