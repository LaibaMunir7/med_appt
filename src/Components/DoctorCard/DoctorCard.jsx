import React, { useState } from "react";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

const doctors = [
  {
    name: "Dr. Sarah Ahmed",
    specialty: "General Physician",
    experience: "10 Years Experience",
    rating: "4.8",
  },
  {
    name: "Dr. Ali Khan",
    specialty: "Cardiologist",
    experience: "8 Years Experience",
    rating: "4.7",
  },
  {
    name: "Dr. Ayesha Malik",
    specialty: "Dermatologist",
    experience: "6 Years Experience",
    rating: "4.9",
  },
];

const DoctorCard = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleCloseForm = () => {
    setSelectedDoctor(null);
  };

  return (
    <div className="doctor-cards-container">
      {doctors.map((doctor, index) => (
        <div className="doctor-card" key={index}>
          <div className="doctor-card-details-container">
            <div className="doctor-icon">
              <i className="fa fa-user-md"></i>
            </div>

            <h2>{doctor.name}</h2>

            <p className="doctor-specialty">
              {doctor.specialty}
            </p>

            <p>
              <strong>Experience:</strong> {doctor.experience}
            </p>

            <p>
              <strong>Rating:</strong> ⭐ {doctor.rating}
            </p>

            <div>
              <button
                className="book-appointment-btn"
                onClick={() => handleBookAppointment(doctor)}
              >
                <div>Book Appointment</div>
                <div>No Booking Fee</div>
              </button>
            </div>
          </div>
        </div>
      ))}

      {selectedDoctor && (
        <AppointmentForm
          doctor={selectedDoctor}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default DoctorCard;