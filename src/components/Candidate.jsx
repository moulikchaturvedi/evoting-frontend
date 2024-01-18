import React from "react";
import { Rating } from "react-simple-star-rating";

function Candidate({ feedback, setFeedback }) {
  return (
    <div className="input-container">
      <h6 style={{ display: "inline-block" }}>{feedback.name}</h6>
      <Rating
        style={{ display: "inline-block" }}
        onClick={(r) => setFeedback({ ...feedback, rating: r })}
      />
    </div>
  );
}

export default Candidate;
