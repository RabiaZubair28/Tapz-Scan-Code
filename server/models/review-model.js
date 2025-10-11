const { mongoose } = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  stars: { type: Number, required: true, min: 1, max: 5 },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
