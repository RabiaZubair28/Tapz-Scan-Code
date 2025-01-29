require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Client = require("./models/client-model.js");
const authRoute = require("./router/auth-router.js");
const detailRoute = require("./router/detail-router");
const connectDb = require("./utils/db.js");
const errorMiddleware = require("./middlewares/error-middleware.js");

const corsOptions = {
  origin: "*",
  method: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

console.log("Auth Route:", authRoute);
app.use("/api/auth", authRoute);
app.use("/api/data", detailRoute);
app.post("/api/visit/:clientId", async (req, res) => {
  const clientId = req.params.clientId;
  try {
    let client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.visitCount += 1;
    await client.save();
    res.json({ count: client.visitCount });
  } catch (error) {
    console.error("Error updating visit count:", error);
    res.status(500).json({ message: "Error updating visit count" });
  }
});
app.use(errorMiddleware);

const PORT = 3500;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
