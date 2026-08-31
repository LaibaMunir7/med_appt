import React, { useEffect, useState } from "react";
import "./Notification.css";

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("email");
    const storedDoctorData = JSON.parse(
      localStorage.getItem("doctorData")
    );

    const storedAppointmentData = storedDoctorData
      ? JSON.parse(localStorage.getItem(storedDoctorData.name))
      : null;

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true);
    }
  }, []);

  useEffect(() => {
    if (!appointmentData) {
      setShowNotification(false);
    }
  }, [appointmentData]);

  return (
    <div>
      {children}

      {isLoggedIn &&
        appointmentData &&
        doctorData &&
        showNotification && (
          <div className="appointment-notification">
            <h3>Appointment Details</h3>

            <p>
              <strong>Patient:</strong>{" "}
              {appointmentData.name || username}
            </p>

            <p>
              <strong>Doctor:</strong> {doctorData.name}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {appointmentData.date}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {appointmentData.time}
            </p>
          </div>
        )}
    </div>
  );
};

export default Notification;
