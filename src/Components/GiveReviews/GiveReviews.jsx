import React, { useState } from "react";
import ReviewForm from "../ReviewForm/ReviewForm";
import "./GiveReviews.css";

const doctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialty: "Cardiology",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialty: "Dermatology",
  },
  {
    id: 3,
    name: "Dr. Sarah Ahmed",
    specialty: "General Physician",
  },
];

const GiveReviews = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [reviews, setReviews] = useState({});

  const handleFeedbackClick = (doctor) => {
    if (!reviews[doctor.id]) {
      setSelectedDoctor(doctor);
    }
  };

  const handleReviewSubmit = (doctorId, reviewData) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [doctorId]: reviewData,
    }));

    setSelectedDoctor(null);
  };

  return (
    <div className="give-reviews-container">
      <h1>Reviews</h1>

      <table className="reviews-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((doctor) => {
            const review = reviews[doctor.id];
            const isReviewed = Boolean(review);

            return (
              <React.Fragment key={doctor.id}>
                <tr>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialty}</td>

                  <td>
                    <button
                      className="feedback-btn"
                      onClick={() => handleFeedbackClick(doctor)}
                      disabled={isReviewed}
                    >
                      {isReviewed ? "Feedback Submitted" : "Click Here"}
                    </button>
                  </td>

                  <td>
                    {review ? (
                      <div className="review-given">
                        <p>
                          <strong>{review.name}</strong>
                        </p>

                        <p>{review.review}</p>

                        <p className="review-rating">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </p>
                      </div>
                    ) : (
                      <span className="no-review">
                        No review yet
                      </span>
                    )}
                  </td>
                </tr>

                {selectedDoctor?.id === doctor.id && (
                  <tr>
                    <td colSpan="5">
                      <ReviewForm
                        doctor={doctor}
                        onReviewSubmit={(reviewData) =>
                          handleReviewSubmit(
                            doctor.id,
                            reviewData
                          )
                        }
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GiveReviews;
