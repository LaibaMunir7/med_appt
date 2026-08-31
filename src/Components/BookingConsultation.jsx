import React from "react";
import FindDoctorSearch from "./FindDoctorSearch/FindDoctorSearch";
import DoctorCard from "./DoctorCard/DoctorCard";

const BookingConsultation = () => {
  return (
    <div className="booking-consultation">
      <FindDoctorSearch />
      <DoctorCard />
    </div>
  );
};

export default BookingConsultation;
