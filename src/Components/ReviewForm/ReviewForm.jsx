import React, { useState } from "react";
import "./ReviewForm.css";

const ReviewForm = ({ doctor }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [submittedReview, setSubmittedReview] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !review.trim() || rating === 0) {
      setShowWarning(true);
      return;
    }

    setSubmittedReview({
      name: name.trim(),
      review: review.trim(),
      rating: rating,
    });

    setShowWarning(false);
    setFeedbackSubmitted(true);
    setShowForm(false);
  };

  return (
    <div className="review-form-container">
      <div className="review-doctor-info">
        <h2>Provide Feedback</h2>

        {doctor && (
          <>
            <h3>{doctor.name}</h3>
            <p>{doctor.specialty}</p>
          </>
        )}
      </div>

      {!showForm && !feedbackSubmitted && (
        <button
          type="button"
          className="feedback-btn"
          onClick={() => setShowForm(true)}
        >
          Click Here
        </button>
      )}

      {showForm && !feedbackSubmitted && (
        <form onSubmit={handleSubmit} className="feedback-form">
          <h3>Give Your Feedback</h3>

          {showWarning && (
            <p className="warning">
              Please fill out all fields and select a rating.
            </p>
          )}

          <div className="form-group">
            <label htmlFor="review-name">Name</label>
            <input
              id="review-name"
              name="name"
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
              name="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review"
              rows="5"
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
      )}

      {submittedReview && (
        <div className="submitted-review">
          <h3>Submitted Review</h3>

          <p>
            <strong>Name:</strong> {submittedReview.name}
          </p>

          <p>
            <strong>Review:</strong> {submittedReview.review}
          </p>

          <p>
            <strong>Rating:</strong>{" "}
            <span className="submitted-stars">
              {"★".repeat(submittedReview.rating)}
              {"☆".repeat(5 - submittedReview.rating)}
            </span>
          </p>

          <button
            type="button"
            className="feedback-btn"
            disabled
          >
            Feedback Submitted
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;