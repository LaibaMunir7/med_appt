import React, { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm/ReviewForm";
import "./ReviewFormApp.css";

const ReviewFormApp = () => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const storedDoctor = localStorage.getItem("doctorData");

    if (storedDoctor) {
      try {
        setDoctor(JSON.parse(storedDoctor));
      } catch (error) {
        console.error("Unable to read doctor data:", error);
      }
    }
  }, []);

  return (
    <main className="review-page">
      <div className="review-page-content">
        <ReviewForm doctor={doctor} />
      </div>
    </main>
  );
};

export default ReviewFormApp;