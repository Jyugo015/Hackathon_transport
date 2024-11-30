// "use client";
// // const Page = () => {
// //   return (
// //     <div>
// //       <h1>DRT Page</h1>
// //       <p className="h-screen">This is the content for DRT Page.</p>
// //     </div>
// //   );
// // };

// // export default Page;
// import { useEffect, useState } from "react";
// import { initializeApp } from "firebase/app";
// import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";

// export default function Page() {
//   const locations = ["Library", "Hostel", "Cafeteria", "Main Gate", "Lab"];
//   // const vans = [
//   //   { id: 1, name: "Van A", available: true, capacity: 15 },
//   //   { id: 2, name: "Van B", available: true, capacity: 15 },
//   // ];

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

//   const [pickUp, setPickUp] = useState<string>("");
//   const [destination, setDestination] = useState<string>("");
//   const [passengers, setPassengers] = useState<number>(1);
//   const [orderPassengers, setOrderPassengers] = useState<number>(1);
//   // const [availableVan, setAvailableVan] = useState<string>("");
//   const [availableVan, setAvailableVan] = useState<{id: string;
//                                                     name: string; 
//                                                     plateNo : string;
//                                                     seatAvailable: number;
//                                                     available: boolean;
//                                                     capacity: number
//                                                     } | null>(null);
//   const [waitingTime, setWaitingTime] = useState<number | null>(null);
//   const [shortestPaths, setShortestPaths] = useState<number[][] | null>(null); // State for shortest paths
//   const [distance, setDistance] = useState<number | 0>(0);  // State for storing the distance
//   const fixedFee = 1; // Fixed fare RM1
//   const [vans, setVans] = useState<any[]>([]);  // Store all vans with seatAvailable
//   const [noVansAvailableMessage, setNoVansAvailableMessage] = useState<string | null>(null);
//   const [isRequestSent, setIsRequestSent] = useState(false); // To track if request is sent
//   const [canceled, setCanceled] = useState(false); // State to track if the ride was canceled


//   // const distanceMatrix: Record<string, Record<string, number>> = {
//   //   Library: { Hostel: 2, Cafeteria: 1.5, "Main Gate": 3, Lab: 2.5 },
//   //   Hostel: { Library: 2, Cafeteria: 1, "Main Gate": 2.5, Lab: 3 },
//   //   Cafeteria: { Hostel: 1, Library: 1.5, "Main Gate": 2, Lab: 1.2 },
//   //   "Main Gate": { Hostel: 2.5, Cafeteria: 2, Library: 3, Lab: 0.5 },
//   //   Lab: { Hostel: 3, Cafeteria: 1.2, Library: 2.5, "Main Gate": 0.5 },
//   // };

//   const graph = [
//     [0, 2, 1.5, 3, 2.5], // Distances from Library
//     [2, 0, 1, 2.5, 3],   // Distances from Hostel
//     [1.5, 1, 0, 2, 1.2], // Distances from Cafeteria
//     [3, 2.5, 2, 0, 0.5], // Distances from Main Gate
//     [2.5, 3, 1.2, 0.5, 0], // Distances from Lab
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

//   // const calculateTime = () => {
//   //   if (pickUp && destination && pickUp !== destination) {
//   //     const distance = distanceMatrix[pickUp]?.[destination];
//   //     if (distance !== undefined) {
//   //       setWaitingTime(distance * 5); // 5 minutes per km
//   //     } else {
//   //       setWaitingTime(null);
//   //     }
//   //   } else {
//   //     setWaitingTime(null);
//   //   }
//   // };
//   // Fetch driver data (including seatAvailable)
//   const fetchVans = async () => {
//     const vansRef = collection(db, "drt");
//     const vansSnapshot = await getDocs(vansRef);
//     const vanData = vansSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setVans(vanData);
//   };

//   useEffect(() => {
//     fetchVans();  // Fetch the drivers when the component loads
//   }, []);

//   // Find available driver based on seat availability
//   const findVan = async () => {
//     const van = vans.find((v) => v.available && v.seatAvailable >= passengers);
//     if (van) {
//       setAvailableVan({ 
//         id: van.id,
//         name: van.name, 
//         plateNo: van.plateNo,
//         seatAvailable : van.seatAvailable - passengers,
//         available : van.available,
//         capacity : van.capacity,
//         });
//         setOrderPassengers(passengers);

//       // Update driver's seat availability
//       const driverRef = doc(db, "drt", van.id);
//       await updateDoc(driverRef, {
//         seatAvailable: van.seatAvailable - passengers,  // Subtract passengers from seatAvailable
//         available: van.seatAvailable - passengers > 0,  // If seats are 0, mark as unavailable
//       });
//       // Update the vans state immutably
//       if(availableVan){
//         const updatedVans = vans.map((v) =>
//         v.id === availableVan.id
//           ? { ...v, seatAvailable: availableVan.seatAvailable, available: (availableVan.seatAvailable) > 0 }
//           : v
//         );
//       }
//       setNoVansAvailableMessage(null); // Clear the message if a van is available
//       setIsRequestSent(true); // Mark request as sent
//     } else {
//       setAvailableVan(null);
//       setNoVansAvailableMessage("No vans available for your request.");
//     }
//   };

//   useEffect(() => {
//     if (pickUp || destination) {
//       setIsRequestSent(false); // Reset if either pickUp or destination changes after a request is sent
//     }
//   }, [pickUp, destination]);


//   // const findVan = () => {
//   //   const van = vans.find((v) => v.available && v.capacity >= passengers);
//   //   setAvailableVan(van ? van.name : "No vans available");
//   //   if (van) {
//   //     van.available = false; // Mark the van as unavailable after the request
//   //   }
//   // };

//   const handleRequest = async () => {
//     if (pickUp && destination && pickUp !== destination) {
//       const calculatedDistance = getDistance(pickUp, destination); 
//       setWaitingTime(calculatedDistance * 5)
//       await findVan();
//       setCanceled(false);
//     } else {
//       setAvailableVan(null);
//       setWaitingTime(null);
//     }
//   };

//   const handleCancel = async () => {
//     // Reset all relevant states
//     setPickUp("");
//     setDestination("");
//     setPassengers(1);
//     setWaitingTime(null);
//     setDistance(0);
//     setCanceled(true); // Mark that the order was canceled
    
//     if (availableVan) {
//       // Use the availableDriver's ID for Firestore reference
//       const driverRef = doc(db, "drt", availableVan.id);
      
//       // Now update the driver's seat availability and availability status
//       await updateDoc(driverRef, {
//         seatAvailable: availableVan.seatAvailable + orderPassengers,  // Subtract passengers from seatAvailable
//         available: (availableVan.seatAvailable + orderPassengers) > 0,  // If seats become 0, mark as unavailable
//       });

//       const updatedVans = vans.map((d) => 
//         d.id === availableVan.id 
//         ? { ...d, seatAvailable: d.seatAvailable + orderPassengers, available: (d.seatAvailable + orderPassengers) > 0 }
//         : d
//       );
      
//       setVans(updatedVans); // Update the drivers state
//       setAvailableVan(null);
//       // Optionally, set some state or flags if you need to indicate that the request was sent
//       setIsRequestSent(false);  // Mark request as sent
//     }
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "600px", margin: "auto" }}>
//       {/* Header Image */}
//       <div style={{ textAlign: "center" }}>
//         <img
//           src="/images/ride/drt.jpg"
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
//           {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num) => (
//             <option key={num} value={num}>
//               {num}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Request Button */}
//       <button
//         onClick={() => handleRequest()}
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

//       {/* Results Section */}
//       <div style={{ marginTop: "20px" }}>
//         {pickUp && destination && pickUp !== destination && (
//           <p style={{ fontSize: "16px", margin: "10px 0" }}>
//             <strong>Estimated Fee:</strong> RM {fixedFee.toFixed(2)}
//           </p>
//         )}
//         {waitingTime !== null && (
//           <p style={{ fontSize: "16px", margin: "10px 0" }}>
//             <strong>Estimated Waiting Time:</strong> {waitingTime} minutes
//           </p>
//         )}
//         {availableVan && (
//           <div>
//             <p style={{ fontSize: "16px", margin: "10px 0" }}>
//               <strong>Available Van:</strong> {availableVan.name}
//             </p>
//             <p style={{ fontSize: "16px", margin: "10px 0" }}>
//               <strong>Plate Number:</strong> {availableVan.plateNo}
//             </p>
//           </div>
//         )}
//         {noVansAvailableMessage && (
//           <p style={{ fontSize: "16px", color: "red", margin: "10px 0" }}>
//             <strong>{noVansAvailableMessage}</strong>
//           </p>
//         )}
//         {/* Cancel Order Button */}
//         {isRequestSent && !canceled && (
//           <button
//             onClick={handleCancel} // Cancel the request
//             style={{
//               padding: "10px 20px",
//               backgroundColor: "#f44336", // Red color for cancel
//               color: "#fff",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//               display: "block",
//               marginTop: "15px",
//               margin: "10px auto",
//             }}
//           >
//           Cancel Order
//         </button>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useRef, useState, useEffect } from "react";
import { getFirestore, doc, collection, getDocs, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { DirectionsRenderer, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { CustomInput } from "@/components/grabbit_ride/CustomInput";

export default function GrabbitRidePage() {
  // Your Firebase project configuration (found in the Firebase Console under "Project Settings")
  const firebaseConfig = {
    apiKey: "AIzaSyCMpwWdMFCmjjywDNzzzA8yXabKCsBYk3U",
    authDomain: "transportation-9807f.firebaseapp.com",
    projectId: "transportation-9807f",
    storageBucket: "transportation-9807f.firebasestorage.app",
    messagingSenderId: "1022719929860",
    appId: "1:1022719929860:web:88a131723113eb0f434f51",
    measurementId: "G-NMVHGRNJNQ",
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
  const [availableVan, setAvailableVan] = useState<any | null>(null);
  const [vans, setVans] = useState<any[]>([]);
  const [noVansAvailableMessage, setNoVansAvailableMessage] = useState<string | null>(null);
  const [isRequestSent, setIsRequestSent] = useState<boolean>(false);
  const [canceled, setCanceled] = useState(false); // State to track if the ride was canceled

  const fixedFee = 1; // fee fixed RM 1

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  // Calculate distance
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

          setDirectionsResponse(results);
          setDistance(route.distance.text || null);
          setDuration(route.duration ? route.duration.text : null);
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

  // fetch van data
  const fetchVans = async () => {
    const vansRef = collection(db, "drt");
    const vansSnapshot = await getDocs(vansRef);
    const vanData = vansSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setVans(vanData);
  };

  useEffect(() => {
    fetchVans();
  }, []);

  // find available van
  const findVan = async () => {
    const van = vans.find((v) => v.available && numberOfPassengers <= v.seatAvailable);
    if (van) {
      setAvailableVan({
        id: van.id,
        name: van.name,
        plateNo: van.plateNo,
        capacity: van.car,
        seatAvailable : van.seatAvailable - numberOfPassengers,
        available : van.seatAvailable - numberOfPassengers > 0,
      });
      // Update driver's seat availability
      const vanRef = doc(db, "drt", van.id);
      await updateDoc(vanRef, {
        seatAvailable: van.seatAvailable - numberOfPassengers,  // Subtract passengers from seatAvailable
        available: van.seatAvailable - numberOfPassengers > 0,  // If seats are 0, mark as unavailable
      });
      // Update the vans state immutably
      if(availableVan){
        const updatedVans = vans.map((v) =>
        v.id === availableVan.id
          ? { ...v, seatAvailable: availableVan.seatAvailable, available: (availableVan.seatAvailable) > 0 }
          : v
        );
        setVans(updatedVans); 
      }

      setNoVansAvailableMessage(null);
      setIsRequestSent(true);
    } else {
      setAvailableVan(null);
      setNoVansAvailableMessage("No vans available for your request.");
    }
  };

  // request van
  const handleRequest = async () => {
    if (originRef.current?.value && destinationRef.current?.value) {
      await calculateRoute();
      await findVan();
      setCanceled(false);
    } else {
      setNoVansAvailableMessage("Please select both pickup and destination locations.");
      setDistance(null);
      setDuration(null);
    }
  };

  useEffect(() => {
    if (originRef || destinationRef) {
      setIsRequestSent(false); // Reset if either pickUp or destination changes after a request is sent
    }
  }, [originRef, destinationRef]);

  // cancel request van
  const handleCancel = async () => {
    setCanceled(true);
    if (availableVan) {
      const vanRef = doc(db, "drt", availableVan.id);
      await updateDoc(vanRef, { seatAvailable: availableVan.seatAvailable + numberOfPassengers, available: (availableVan.seatAvailable + numberOfPassengers) > 0});

      const updatedVans = vans.map((v) =>
        v.id === availableVan.id ? { ...v, seatAvailable: availableVan.seatAvailable + numberOfPassengers, available: (availableVan.seatAvailable + numberOfPassengers) > 0 } : v
      );
      setVans(updatedVans);
    }
    setNumberOfPassengers(1);
    setAvailableVan(null);
    setIsRequestSent(false);
    setDistance(null);
    setDuration(null);
    setDirectionsResponse(null);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", color: "#4CAF50" }}>Campus Ride Service</h1>
      {/* Header Image */}
      <div style={{ textAlign: "center" }}>
        <img
          src="/images/ride/drt.jpg"
          alt="Campus Ride Service"
          style={{ width: "100%", borderRadius: "10px", marginBottom: "20px" }}
        />
      </div>

      {/* Enter pick up & destination */}
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

      {/* Number or passenger */}
      <div style={{ marginBottom: "10px" }}>
        <label>Passengers: </label>
        <select
          value={numberOfPassengers}
          onChange={(e) => setNumberOfPassengers(Number(e.target.value))}
          style={{ padding: "5px", marginLeft: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          {[1, 2, 3, 4, 5, 6,7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((num) => (
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

      {/* Results */}
      {distance && duration && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>
            <strong>Distance:</strong> {distance}
          </p>
          <p>
            <strong>Duration:</strong> {duration}
          </p>
          <p>
            <strong>Fixed Fee:</strong> RM {fixedFee}
          </p>
        </div>
      )}

      {/* Van messager */}
      {availableVan ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>
            <strong>Van Name:</strong> {availableVan.name} <br />
            <strong>Plate Number:</strong> {availableVan.plateNo}
          </p>
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
            Cancel Ride
          </button>
        </div>
      ) : (
        <p style={{ marginTop: "10px", color: "#555" }}>{noVansAvailableMessage}</p>
      )}
      {/* Map */}
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
    </div>
  );
}
