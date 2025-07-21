const Client = require("../models/client-model");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user with matching email & password
    const user = await Client.findOne({ email, password });

    if (!user) {
      // Check if the email exists separately
      const emailExists = await Client.findOne({ email });
      const passwordExists = await Client.findOne({ password });
      if (!emailExists && !passwordExists) {
        throw new Error("Invalid email & password");
      } else if (!emailExists) {
        throw new Error("Invalid email");
      } else if (!passwordExists) {
        throw new Error("Invalid password");
      } else {
        throw new Error("Invalid credentials");
      }
    }

    return res.status(200).json({
      message: "Login successful",
      userId: user._id,
    });
  } catch (error) {
    console.error("Error during login:", error.message);

    return res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = { login };
