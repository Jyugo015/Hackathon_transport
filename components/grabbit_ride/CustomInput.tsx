import React, { useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";

interface CustomInputProps {
  placeholder: string;
  inputRef: React.RefObject<HTMLInputElement>;
  predefinedLocations?: { name: string; address: string }[];
}

export const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  inputRef,
  predefinedLocations = [],
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownSelect = (location: string) => {
    if (inputRef.current) {
      inputRef.current.value = location; // Update input field with the selected location
    }
    setShowDropdown(false); // Close dropdown after selection
  };

  return (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      <Autocomplete>
        <input
          type="text"
          ref={inputRef}
          placeholder={placeholder}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)} // Delay to allow selection
          style={{
            padding: "10px",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </Autocomplete>

      {/* Dropdown for predefined locations */}
      {showDropdown && predefinedLocations.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            zIndex: 10,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {predefinedLocations.map((location) => (
            <div
              key={location.name}
              onClick={() => handleDropdownSelect(location.address)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking
            >
              {location.name} - {location.address}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
