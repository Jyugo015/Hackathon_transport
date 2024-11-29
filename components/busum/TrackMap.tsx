// import React, { useState, useCallback } from "react";
// import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
// import dynamic from "next/dynamic";

// // Load the component dynamically with no SSR
// const TrackMap = dynamic(
//   () =>
//     Promise.resolve(() => {
//       const containerStyle = {
//         width: "800px",
//         height: "600px",
//       };

//       const POINTS = [
//         { lat: 3.4974, lng: 101.6264 },
//         { lat: 3.4893, lng: 101.6314 },
//       ];

//       const { isLoaded } = useJsApiLoader({
//         id: "google-map-script",
//         googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Use environment variable with a fallback
//       });

//       const [map, setMap] = useState(null);

//       const onLoad = useCallback((map) => {
//         const bounds = new window.google.maps.LatLngBounds();

//         // Extend bounds to include all points
//         POINTS.forEach((point) => bounds.extend(point));

//         // Fit the map to the calculated bounds
//         map.fitBounds(bounds);

//         setMap(map);
//       }, []);

//       const onUnmount = useCallback(() => {
//         setMap(null);
//       }, []);

//       return isLoaded ? (
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           onLoad={onLoad}
//           onUnmount={onUnmount}
//           options={{ streetViewControl: false, mapTypeControl: false }}
//         >
//           {POINTS.map((point, index) => (
//             <MarkerF key={index} position={point} />
//           ))}
//         </GoogleMap>
//       ) : (
//         <div>Loading...</div>
//       );
//     }),
//   { ssr: false }
// );

// export default TrackMap;

// import React, { useState, useCallback, useEffect } from "react";
// import {
//   GoogleMap,
//   DirectionsRenderer,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import dynamic from "next/dynamic";

// // Load the component dynamically with no SSR
// const TrackMap = dynamic(
//   () =>
//     Promise.resolve(() => {
//       const [map, setMap] = useState<google.maps.Map | null>(null); // Map type
//       const [directions, setDirections] =
//         useState<google.maps.DirectionsResult | null>(null); // Explicitly define type

//       const containerStyle = {
//         width: "800px",
//         height: "600px",
//       };

//       const center = {
//         lat: 3.4974, // Initial map center
//         lng: 101.6264,
//       };

//       const POINTS = [
//         { lat: 3.4974, lng: 101.6264 },
//         { lat: 3.4893, lng: 101.6314 },
//       ];

//       const { isLoaded } = useJsApiLoader({
//         id: "google-map-script",
//         googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Use environment variable with a fallback
//       });

//       const calculateDirections = async () => {
//         if (isLoaded && POINTS.length > 1) {
//           const directionService = new google.maps.DirectionsService();

//           const request: google.maps.DirectionsRequest = {
//             origin: POINTS[0], // Starting point
//             destination: POINTS[POINTS.length - 1], // Ending point
//             waypoints: POINTS.slice(1, -1).map((point) => ({
//               location: point,
//             })), // Intermediate points
//             travelMode: google.maps.TravelMode.WALKING,
//           };

//           directionService.route(request, (result, status) => {
//             if (status === google.maps.DirectionsStatus.OK && result) {
//               setDirections(result);
//             } else {
//               console.error("Directions request failed due to: " + status);
//             }
//           });
//         }
//       };

//       // Trigger directions calculation after map is loaded
//       useEffect(() => {
//         if (isLoaded) calculateDirections();
//       }, [isLoaded]);

//       const onLoad = useCallback((map: google.maps.Map) => {
//         setMap(map);
//       }, []);

//       const onUnmount = useCallback(() => {
//         setMap(null);
//       }, []);

//       return isLoaded ? (
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={14}
//           onLoad={onLoad}
//           onUnmount={onUnmount}
//           options={{ streetViewControl: false, mapTypeControl: false }}
//         >
//           {/* Render directions */}
//           {directions && <DirectionsRenderer directions={directions} />}
//         </GoogleMap>
//       ) : (
//         <div>Loading...</div>
//       );
//     }),
//   { ssr: false }
// );

// export default TrackMap;
import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import dynamic from "next/dynamic";

type BusStop = {
  name: string;
  latitude: string;
  longitude: string;
};

type TrackMapProps = {
  busStops: BusStop[];
};

// Load the component dynamically with no SSR
const TrackMap = dynamic(
  () =>
    Promise.resolve(({ busStops }: TrackMapProps) => {
      const [map, setMap] = useState<google.maps.Map | null>(null); // Map type
      const [directions, setDirections] =
        useState<google.maps.DirectionsResult | null>(null); // Explicitly define type

      const containerStyle = {
        width: "800px",
        height: "600px",
      };

      const center = {
        lat: parseFloat(busStops[0]?.latitude) || 3.1209692, // Default if busStops is empty
        lng: parseFloat(busStops[0]?.longitude) || 101.6536755,
      };

      const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Use environment variable with a fallback
      });

      const calculateDirections = async () => {
        if (isLoaded && busStops.length > 1) {
          const POINTS = busStops.map((stop) => ({
            lat: parseFloat(stop.latitude),
            lng: parseFloat(stop.longitude),
          }));

          const directionService = new google.maps.DirectionsService();

          const request: google.maps.DirectionsRequest = {
            origin: POINTS[0], // Starting point
            destination: POINTS[POINTS.length - 1], // Ending point
            waypoints: POINTS.slice(1, -1).map((point) => ({
              location: point,
            })), // Intermediate points
            travelMode: google.maps.TravelMode.DRIVING, // Change travel mode if needed
          };

          directionService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK && result) {
              setDirections(result);
            } else {
              console.error("Directions request failed due to: " + status);
            }
          });
        }
      };

      useEffect(() => {
        if (isLoaded) calculateDirections();
      }, [isLoaded, busStops]);

      const onLoad = useCallback((map: google.maps.Map) => {
        setMap(map);
      }, []);

      const onUnmount = useCallback(() => {
        setMap(null);
      }, []);

      return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{ streetViewControl: false, mapTypeControl: false }}
        >
          {/* Render directions */}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      ) : (
        <div>Loading...</div>
      );
    }),
  { ssr: false }
);

export default TrackMap;
