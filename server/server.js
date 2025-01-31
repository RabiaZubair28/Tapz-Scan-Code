require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Client = require("./models/client-model.js");
const authRoute = require("./router/auth-router.js");
const detailRoute = require("./router/detail-router");
const connectDb = require("./utils/db.js");
const errorMiddleware = require("./middlewares/error-middleware.js");
const path = require("path");
const corsOptions = {
  origin: "https://www.scan-taps.com/",
  method: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
  optionSuccessStatus: 200,
};

const _dirname = path.resolve();

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
    res.json({ visitCount: client.visitCount });
  } catch (error) {
    console.error("Error updating visit count:", error);
    res.status(500).json({ message: "Error updating visit count" });
  }
});
app.use(errorMiddleware);

app.use(express.static(path.join(__dirname, "..", "/client/dist")));
console.log(__dirname);
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"));
});

connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running at port: ${process.env.PORT}`);
  });
});
