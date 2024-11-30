"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import { CustomInput } from "@/components/grabbit_ride/CustomInput"; // Adjust the import path as needed

export const GrabbitRidePage = () => {
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
  const [price, setPrice] = useState<number | null>(null);

  const [drivers, setDrivers] = useState<any[]>([]);
  const [availableDriver, setAvailableDriver] = useState<{
    id: string;
    name: string;
    phone: string;
    plateNo: string;
    type: string;
    car: number;
    available: boolean;
    telegram: string;
  } | null>(null);
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
      (d) => d.available && d.car >= numberOfPassengers
    );

    if (driver) {
      setAvailableDriver(driver);

      // Update Firestore to mark the driver as unavailable
      const driverRef = doc(db, "drivers", driver.id);
      await updateDoc(driverRef, { available: false });

      setDrivers((prev) =>
        prev.map((d) => (d.id === driver.id ? { ...d, available: false } : d))
      );
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
      });

      setDrivers((prev) =>
        prev.map((d) =>
          d.id === availableDriver.id ? { ...d, available: true } : d
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
        <p style={{ color: "red", textAlign: "center", margin: "10px 0" }}>
          {errorMessage}
        </p>
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
            <p style={{ marginTop: "10px", color: "#555" }}>
              No drivers available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
