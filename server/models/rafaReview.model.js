const { mongoose } = require("mongoose");

const rafaReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  stars: { type: Number, required: true, min: 1, max: 5 },
});

const RafaReview = mongoose.model("RafaReview", rafaReviewSchema);
module.exports = RafaReview;
