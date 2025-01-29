const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth-controller.js");
const Client = require("../models/client-model.js");
const mongoose = require("mongoose");
router.route("/update/:id").put(async (req, res) => {
  const { id } = req.params;
  const {
    companyName,
    name,
    description,
    phone01,
    phone02,
    phone03,
    telephone01,
    telephone02,
    telephone03,
    services,
    clientName,
    designation,
    qr,
    address,
    whatsapp01,
    location,
    whatsapp02,
    whatsapp03,
    instagramLink,
    instagramLink02,
    instagramLink03,
    instagramName,
    instagramName02,
    instagramName03,
    snapchatLink,
    snapchatLink02,
    snapchatLink03,
    snapchatName,
    snapchatName02,
    snapchatName03,
    youtubeLink,
    youtubeLink02,
    youtubeLink03,
    youtubeName,
    youtubeName02,
    youtubeName03,
    tiktokLink,
    tiktokLink02,
    tiktokLink03,
    tiktokName,
    tiktokName02,
    tiktokName03,
    twitterLink,
    twitterLink02,
    twitterLink03,
    twitterName,
    twitterName02,
    twitterName03,
    facebookLink,
    facebookLink02,
    facebookLink03,
    facebookName,
    facebookName02,
    facebookName03,
    googleReviewLink,
    googleReviewLink02,
    googleReviewLink03,
    googleReviewName,
    googleReviewName02,
    googleReviewName03,
    website,
    website02,
    website03,
    websiteName,
    websiteName02,
    websiteName03,
    email,
    email02,
    email03,
    youtubeShortsLink,
    youtubeShortsLink02,
    youtubeShortsLink03,
    youtubeShortsName,
    youtubeShortsName02,
    youtubeShortsName03,
    googleMapLink,
    googleMapLink02,
    googleMapLink03,
    googleMapName,
    googleMapName02,
    googleMapName03,
    menuLink,
    menuName,
    catalogueLink,
    catalogueName,
    profileLink01,
    profileLink02,
    profileName01,
    profileName02,
    logo,
    romanName,
    images,
    img01,
    img02,
    img03,
    img04,
    img05,
    img06,
    img07,
    img08,
    img09,
    img10,
    password,
    color01,
    color02,
    color03,
    flag,
    option,
  } = req.body; // The new name from the frontend

  try {
    // Update the name field of the specific document in MongoDB
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      {
        companyName,
        name,
        description,
        phone01,
        phone02,
        phone03,
        telephone01,
        telephone02,
        telephone03,
        services,
        clientName,
        designation,
        qr,
        address,
        whatsapp01,
        location,
        whatsapp02,
        whatsapp03,
        instagramLink,
        instagramLink02,
        instagramLink03,
        instagramName,
        instagramName02,
        instagramName03,
        snapchatLink,
        snapchatLink02,
        snapchatLink03,
        snapchatName,
        snapchatName02,
        snapchatName03,
        youtubeLink,
        youtubeLink02,
        youtubeLink03,
        youtubeName,
        youtubeName02,
        youtubeName03,
        tiktokLink,
        tiktokLink02,
        tiktokLink03,
        tiktokName,
        tiktokName02,
        tiktokName03,
        twitterLink,
        twitterLink02,
        twitterLink03,
        twitterName,
        twitterName02,
        twitterName03,
        facebookLink,
        facebookLink02,
        facebookLink03,
        facebookName,
        facebookName02,
        facebookName03,
        googleReviewLink,
        googleReviewLink02,
        googleReviewLink03,
        googleReviewName,
        googleReviewName02,
        googleReviewName03,
        website,
        website02,
        website03,
        websiteName,
        websiteName02,
        websiteName03,
        email,
        email02,
        email03,
        youtubeShortsLink,
        youtubeShortsLink02,
        youtubeShortsLink03,
        youtubeShortsName,
        youtubeShortsName02,
        youtubeShortsName03,
        googleMapLink,
        googleMapLink02,
        googleMapLink03,
        googleMapName,
        googleMapName02,
        googleMapName03,
        menuLink,
        menuName,
        catalogueLink,
        catalogueName,
        profileLink01,
        profileLink02,
        profileName01,
        profileName02,
        logo,
        romanName,
        images,
        img01,
        img02,
        img03,
        img04,
        img05,
        img06,
        img07,
        img08,
        img09,
        img10,
        color01,
        color02,
        color03,
        password,
        flag,
        option,
      },
      { new: true } // Returns the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.route("/add/:id").put(async (req, res) => {
  const { id } = req.params;
  const {
    companyName,
    name,
    description,
    phone01,
    phone02,
    phone03,
    telephone01,
    telephone02,
    telephone03,
    services,
    clientName,
    designation,
    qr,
    address,
    whatsapp01,
    location,
    whatsapp02,
    whatsapp03,
    instagramLink,
    instagramLink02,
    instagramLink03,
    instagramName,
    instagramName02,
    instagramName03,
    snapchatLink,
    snapchatLink02,
    snapchatLink03,
    snapchatName,
    snapchatName02,
    snapchatName03,
    youtubeLink,
    youtubeLink02,
    youtubeLink03,
    youtubeName,
    youtubeName02,
    youtubeName03,
    tiktokLink,
    tiktokLink02,
    tiktokLink03,
    tiktokName,
    tiktokName02,
    tiktokName03,
    twitterLink,
    twitterLink02,
    twitterLink03,
    twitterName,
    twitterName02,
    twitterName03,
    facebookLink,
    facebookLink02,
    facebookLink03,
    facebookName,
    facebookName02,
    facebookName03,
    googleReviewLink,
    googleReviewLink02,
    googleReviewLink03,
    googleReviewName,
    googleReviewName02,
    googleReviewName03,
    website,
    website02,
    website03,
    websiteName,
    websiteName02,
    websiteName03,
    email,
    email02,
    email03,
    youtubeShortsLink,
    youtubeShortsLink02,
    youtubeShortsLink03,
    youtubeShortsName,
    youtubeShortsName02,
    youtubeShortsName03,
    googleMapLink,
    googleMapLink02,
    googleMapLink03,
    googleMapName,
    googleMapName02,
    googleMapName03,
    menuLink,
    menuName,
    catalogueLink,
    catalogueName,
    profileLink01,
    profileLink02,
    profileName01,
    profileName02,
    logo,
    romanName,
    images,
    img01,
    img02,
    img03,
    img04,
    img05,
    img06,
    img07,
    img08,
    img09,
    img10,
    color01,
    color02,
    color03,
    password,
    flag,
    visitCount,
    option,
  } = req.body; // The new name from the frontend

  try {
    // Update the name field of the specific document in MongoDB
    const addClient = await Client.findByIdAndUpdate(
      id,
      {
        companyName,
        name,
        description,
        phone01,
        phone02,
        phone03,
        telephone01,
        telephone02,
        telephone03,
        services,
        clientName,
        designation,
        qr,
        address,
        whatsapp01,
        location,
        whatsapp02,
        whatsapp03,
        instagramLink,
        instagramLink02,
        instagramLink03,
        instagramName,
        instagramName02,
        instagramName03,
        snapchatLink,
        snapchatLink02,
        snapchatLink03,
        snapchatName,
        snapchatName02,
        snapchatName03,
        youtubeLink,
        youtubeLink02,
        youtubeLink03,
        youtubeName,
        youtubeName02,
        youtubeName03,
        tiktokLink,
        tiktokLink02,
        tiktokLink03,
        tiktokName,
        tiktokName02,
        tiktokName03,
        twitterLink,
        twitterLink02,
        twitterLink03,
        twitterName,
        twitterName02,
        twitterName03,
        facebookLink,
        facebookLink02,
        facebookLink03,
        facebookName,
        facebookName02,
        facebookName03,
        googleReviewLink,
        googleReviewLink02,
        googleReviewLink03,
        googleReviewName,
        googleReviewName02,
        googleReviewName03,
        website,
        website02,
        website03,
        websiteName,
        websiteName02,
        websiteName03,
        email,
        email02,
        email03,
        youtubeShortsLink,
        youtubeShortsLink02,
        youtubeShortsLink03,
        youtubeShortsName,
        youtubeShortsName02,
        youtubeShortsName03,
        googleMapLink,
        googleMapLink02,
        googleMapLink03,
        googleMapName,
        googleMapName02,
        googleMapName03,
        menuLink,
        menuName,
        catalogueLink,
        catalogueName,
        profileLink01,
        profileLink02,
        profileName01,
        profileName02,
        logo,
        romanName,
        images,
        img01,
        img02,
        img03,
        img04,
        img05,
        img06,
        img07,
        img08,
        img09,
        img10,
        color01,
        color02,
        color03,
        password,
        flag,
        visitCount,
        option,
      },
      { new: true } // Returns the updated document
    );

    if (!addClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(addClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.route("/updateLogo/:id").put(async (req, res) => {
  const { id } = req.params;
  const { logo } = req.body;

  console.log("Received ID:", id);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Ensure img01 is valid
    if (logo && typeof logo !== "string") {
      return res.status(400).json({ message: "Invalid img01 URL" });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { logo },
      { new: true } // Return the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.route("/updateCover/:id").put(async (req, res) => {
  const { id } = req.params;
  const { images } = req.body;

  console.log("Received ID:", id);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Ensure img01 is valid
    if (images && typeof images !== "string") {
      return res.status(400).json({ message: "Invalid img01 URL" });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { images },
      { new: true } // Return the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.route("/updateImg01/:id").put(async (req, res) => {
  const { id } = req.params;
  const { img01 } = req.body;

  console.log("Received ID:", id);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Ensure img01 is valid
    if (img01 && typeof img01 !== "string") {
      return res.status(400).json({ message: "Invalid img01 URL" });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { img01 },
      { new: true } // Return the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.route("/updateImg02/:id").put(async (req, res) => {
  const { id } = req.params;
  const { img02 } = req.body;

  console.log("Received ID:", id);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Ensure img01 is valid
    if (img02 && typeof img02 !== "string") {
      return res.status(400).json({ message: "Invalid img01 URL" });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { img02 },
      { new: true } // Return the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.route("/updateImg03/:id").put(async (req, res) => {
  const { id } = req.params;
  const { img03 } = req.body;

  console.log("Received ID:", id);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Ensure img03 is valid
    if (img03 && typeof img03 !== "string") {
      return res.status(400).json({ message: "Invalid img03 URL" });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { img03 },
      { new: true } // Return the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.route("/updateImg04/:id").put(async (req, res) => {
  const { id } = req.params;
  const { img04 } = req.body;

  console.log("Received ID:", id);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Ensure img04 is valid
    if (img04 && typeof img04 !== "string") {
      return res.status(400).json({ message: "Invalid img04 URL" });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { img04 },
      { new: true } // Return the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.route("/updateImg05/:id").put(async (req, res) => {
  const { id } = req.params;
  const { img05 } = req.body;

  console.log("Received ID:", id);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Ensure img05 is valid
    if (img05 && typeof img05 !== "string") {
      return res.status(400).json({ message: "Invalid img05 URL" });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { img05 },
      { new: true } // Return the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.route("/updateImg06/:id").put(async (req, res) => {
  const { id } = req.params;
  const { img06 } = req.body;

  console.log("Received ID:", id);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Ensure img06 is valid
    if (img06 && typeof img06 !== "string") {
      return res.status(400).json({ message: "Invalid img06 URL" });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { img06 },
      { new: true } // Return the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.route("/updateImg07/:id").put(async (req, res) => {
  const { id } = req.params;
  const { img07 } = req.body;

  console.log("Received ID:", id);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Ensure img07 is valid
    if (img07 && typeof img07 !== "string") {
      return res.status(400).json({ message: "Invalid img07 URL" });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { img07 },
      { new: true } // Return the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.route("/updateImg08/:id").put(async (req, res) => {
  const { id } = req.params;
  const { img08 } = req.body;

  console.log("Received ID:", id);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Ensure img08 is valid
    if (img08 && typeof img08 !== "string") {
      return res.status(400).json({ message: "Invalid img08 URL" });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { img08 },
      { new: true } // Return the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.route("/updateImg09/:id").put(async (req, res) => {
  const { id } = req.params;
  const { img09 } = req.body;

  console.log("Received ID:", id);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Ensure img09 is valid
    if (img09 && typeof img09 !== "string") {
      return res.status(400).json({ message: "Invalid img09 URL" });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { img09 },
      { new: true } // Return the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.route("/updateImg10/:id").put(async (req, res) => {
  const { id } = req.params;
  const { img10 } = req.body;

  console.log("Received ID:", id);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Ensure img10 is valid
    if (img10 && typeof img10 !== "string") {
      return res.status(400).json({ message: "Invalid img10 URL" });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { img10 },
      { new: true } // Return the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.route("/client/:id").get(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    // Find the client by ID
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json(client);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred", details: error.message });
  }
});
router.route("/addClient").post(async (req, res) => {
  try {
    const newClient = new Client(req.body);
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error saving client", details: error.message });
  }
});
module.exports = router;
