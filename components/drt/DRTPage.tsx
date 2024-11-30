"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
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
  const [noVansAvailableMessage, setNoVansAvailableMessage] = useState<
    string | null
  >(null);
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
    } else {
      setNoVansAvailableMessage(
        "Please select both pickup and destination locations."
      );
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
                  "Kolej Kediaman Tuanku Bahiyah (KK2), Jalan Universiti, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
              },
              {
                name: "KK3",
                address:
                  "Kolej Kediaman Ketiga, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
              },
              {
                name: "KK4",
                address:
                  "Kolej Kediaman Bestari (KK4), Kolej Kediaman Bestari, Jln Profesor Diraja Ungku Aziz, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
              },
              {
                name: "KK5",
                address:
                  "Kolej Kediaman Kelima, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
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
                  "Kolej Kediaman Tuanku Bahiyah (KK2), Jalan Universiti, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
              },
              {
                name: "KK3",
                address:
                  "Kolej Kediaman Ketiga, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
              },
              {
                name: "KK4",
                address:
                  "Kolej Kediaman Bestari (KK4), Kolej Kediaman Bestari, Jln Profesor Diraja Ungku Aziz, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
              },
              {
                name: "KK5",
                address:
                  "Kolej Kediaman Kelima, Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
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
          style={{
            padding: "5px",
            marginLeft: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
            (num) => (
              <option key={num} value={num}>
                {num}
              </option>
            )
          )}
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
      {isRequestSent&& distance && duration &&  (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>
            <strong>Distance:</strong> {distance}
          </p>
          <p>
            <strong>Duration:</strong> {duration}
          </p>
          <p>
            <strong>Fixed Fee:</strong> RM {fixedFee*numberOfPassengers}
          </p>
        </div>
      )}

      {/* Van messager */}
      {availableVan ? (
        <div style={{ textAlign: "center", marginTop: "5px" }}>
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
        <p style={{ marginTop: "10px", color: "#555" }}>
          {noVansAvailableMessage}
        </p>
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
