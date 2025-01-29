const Client = require("../models/client-model");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find one user with matching email and password
    const user = await Client.findOne({ email, password });

    if (user) {
      return res.status(200).json({
        message: "Login successful",
        userId: user._id,
      });
    } else {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { login };
