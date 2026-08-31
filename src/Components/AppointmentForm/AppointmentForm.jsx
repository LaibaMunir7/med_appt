import React, { useState } from "react";

const AppointmentForm = ({ doctor, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Appointment booked with ${doctor?.name || "Doctor"}\nDate: ${date}\nTime: ${time}`
    );
  };

  return (
    <div className="appointment-form-container">
      <h2>Book Appointment</h2>

      {doctor && (
        <p>
          <strong>Doctor:</strong> {doctor.name}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patient-name">Name</label>
          <input
            id="patient-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="patient-phone">Phone Number</label>
          <input
            id="patient-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="appointment-date">Date</label>
          <input
            id="appointment-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="appointment-time">Time</label>
          <input
            id="appointment-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className="appointment-buttons">
          <button type="submit">Confirm Appointment</button>

          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
