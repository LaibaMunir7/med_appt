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
  const [bookedDoctors, setBookedDoctors] = useState([]);

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleAppointmentBooked = (doctor) => {
    setBookedDoctors((prev) => [...prev, doctor.name]);
    setSelectedDoctor(null);
  };

  const handleCancelAppointment = (doctor) => {
    setBookedDoctors((prev) =>
      prev.filter((name) => name !== doctor.name)
    );
  };

  const handleCloseForm = () => {
    setSelectedDoctor(null);
  };

  return (
    <div className="doctor-cards-container">
      {doctors.map((doctor, index) => {
        const isBooked = bookedDoctors.includes(doctor.name);

        return (
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

              <div className="doctor-card-options-container">
                {!isBooked ? (
                  <button
                    className="book-appointment-btn"
                    onClick={() => handleBookAppointment(doctor)}
                  >
                    <div>Book Appointment</div>
                    <div>No Booking Fee</div>
                  </button>
                ) : (
                  <button
                    className="cancel-appointment-btn"
                    onClick={() => handleCancelAppointment(doctor)}
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {selectedDoctor && (
        <AppointmentForm
          doctor={selectedDoctor}
          onClose={handleCloseForm}
          onBooked={() => handleAppointmentBooked(selectedDoctor)}
        />
      )}
    </div>
  );
};

export default DoctorCard;