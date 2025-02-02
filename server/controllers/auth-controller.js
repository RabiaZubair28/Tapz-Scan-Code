const Client = require("../models/client-model");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find one user with matching email and password
    const user = await Client.findOne({ email, password });

  } catch (error) {

    if (user.email != email && user.password != password) {
      return res.status(401).json({
        message: "Invalid email & Password",
      });
    } else if (user.email != email) {
      return res.status(401).json({
        message: "Invalid email",
      });
    } else if (user.password != password) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    } else if (user) {
      return res.status(200).json({
        message: "Login successful",
        userId: user.companyName,
      });
    } else {
      return res.status(401).json({
        message: "Invalid credentials",
      });
  }
};

module.exports = { login };
