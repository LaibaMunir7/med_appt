import React, { useState } from "react";
import "./ReviewForm.css";

const ReviewForm = ({ doctor, onReviewSubmit }) => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !review.trim() || rating === 0) {
      setShowWarning(true);
      return;
    }

    const reviewData = {
      name: name.trim(),
      review: review.trim(),
      rating,
    };

    if (onReviewSubmit) {
      onReviewSubmit(reviewData);
    }

    setShowWarning(false);
  };

  return (
    <div className="review-form-container">
      <div className="review-doctor-info">
        <h2>Give Your Feedback</h2>

        {doctor && (
          <>
            <h3>{doctor.name}</h3>
            <p>{doctor.specialty}</p>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="feedback-form">
        {showWarning && (
          <p className="warning">
            Please fill out all fields and select a rating.
          </p>
        )}

        <div className="form-group">
          <label htmlFor="review-name">Name</label>
          <input
            id="review-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="review-text">Review</label>
          <textarea
            id="review-text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review"
            rows="4"
            required
          />
        </div>

        <div className="rating-section">
          <label>Rating</label>

          <div className="rating-buttons">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={
                  value <= rating
                    ? "rating-btn selected"
                    : "rating-btn"
                }
                onClick={() => setRating(value)}
                aria-label={`${value} star rating`}
              >
                ★
              </button>
            ))}
          </div>

          <p className="rating-value">
            {rating === 0
              ? "Select a rating from 1 to 5"
              : `You selected ${rating} out of 5 stars`}
          </p>
        </div>

        <button type="submit" className="submit-review-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;