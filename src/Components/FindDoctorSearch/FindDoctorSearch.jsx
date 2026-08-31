import React, { useState } from "react";
import "./FindDoctorSearch.css";

const FindDoctorSearch = () => {
  const [search, setSearch] = useState("");
  const [showSpecialties, setShowSpecialties] = useState(false);

  const specialties = [
    "General Physician",
    "Dentist",
    "Dermatologist",
    "Cardiologist",
    "Neurologist",
    "Pediatrician",
  ];

  const handleFocus = () => {
    setShowSpecialties(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSpecialties(false);
    }, 200);
  };

  const handleSpecialtyClick = (specialty) => {
    setSearch(specialty);
    setShowSpecialties(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", search);
  };

  return (
    <div className="doctor-search-container">
      <h2>Find a Doctor</h2>

      <form onSubmit={handleSearch} className="doctor-search-form">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search by doctor's specialty"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {showSpecialties && (
            <ul className="specialties-list">
              {specialties
                .filter((specialty) =>
                  specialty.toLowerCase().includes(search.toLowerCase())
                )
                .map((specialty) => (
                  <li
                    key={specialty}
                    onMouseDown={() => handleSpecialtyClick(specialty)}
                  >
                    {specialty}
                  </li>
                ))}
            </ul>
          )}
        </div>

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default FindDoctorSearch;
