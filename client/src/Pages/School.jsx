import React, { useState, useEffect } from "react";
import axios from "axios";

function School() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState("");

  // Fetch all reviews
  useEffect(() => {
    axios
      .get("https://www.scan-taps.com/api/data/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add a review
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = { name, description, stars: Number(stars) };
    const res = await axios.post(
      "https://www.scan-taps.com/api/data/addReview",
      newReview
    );
    setReviews([...reviews, res.data]);
    setName("");
    setDescription("");
    setStars("");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h1>School Reviews</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Your review"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stars (1–5)"
          min="1"
          max="5"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          required
        />
        <button type="submit">Add Review</button>
      </form>

      <h2>All Reviews</h2>
      {reviews.map((r, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h3>{r.name}</h3>
          <p>{r.description}</p>
          <p>{"⭐".repeat(r.stars)}</p>
        </div>
      ))}
    </div>
  );
}

export default School;
