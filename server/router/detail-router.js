const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth-controller.js");
const Client = require("../models/client-model.js");
const Review = require("../models/review-model.js");
const RafaReview = require("../models/rafaReview.model.js");
const mongoose = require("mongoose");
const {
  hashPassword,
  requireAdminAccess,
} = require("../middlewares/auth-middleware");

const TEMPLATE_COLORS = [
  ["#ffb8d6", "#f6ece9"],
  ["#16215c", "#ffffff"],
  ["#544e66", "#1f153d"],
  ["#030712", "#374151"],
  ["#4e867e", "#e6eaea"],
  ["#111827", "#f9fafb"],
  ["#1d8eb7", "#ffffff"],
  ["#16215c", "#a3c24e"],
  ["#16215c", "#f2b0b4"],
  ["#111827", "#c79d3d"],
  ["#ffffff", "#c79d3d"],
  ["#bdbdbd", "#c79d3d"],
  ["#111111", "#c79d3d"],
  ["#38572e", "#111827"],
  ["#38572e", "#868e52"],
  ["#6d7c3f", "#fafcee"],
  ["#4c9537", "#aee19f"],
  ["#f9d6cd", "#f6ece9"],
  ["#784330", "#957a71"],
  ["#b10000", "#f5e7c8"],
  ["#c12c2c", "#fab23f"],
  ["#9e201c", "#f4e7e6"],
  ["#1e2533", "#c79d3d"],
  ["#111827", "#38572e"],
  ["#000000", "#ffffff"],
  ["#231f20", "#38572e"],
  ["#000000", "#b89a64"],
  ["#65141a", "#f0d3b5"],
  ["#111827", "#6b7280"],
  ["#000000", "#b89a64"],
  ["#111827", "#9ca3af"],
  ["#000000", "#b89a64"],
  ["#1f7a3f", "#ffffff"],
  ["#d4a84e", "#fff7dd"],
  ["#000000", "#b89a64"],
  ["#000000", "#fef485"],
  ["#5d0618", "#ead9c9"],
];

const DASHBOARD_SYSTEM_FIELDS = new Set([
  "_id",
  "__v",
  "password",
  "color01",
  "color02",
  "color03",
]);
const DASHBOARD_EDITABLE_FIELDS = Object.keys(Client.schema.paths).filter(
  (field) => !DASHBOARD_SYSTEM_FIELDS.has(field),
);

const escapeRegex = (value) =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const dashboardClientJson = (client) => {
  const result = client.toJSON();
  delete result.flag;
  return result;
};

const cleanDashboardBody = (body, creating = false) => {
  const result = {};

  DASHBOARD_EDITABLE_FIELDS.forEach((field) => {
    if (!Object.prototype.hasOwnProperty.call(body, field)) return;
    if (field === "visitCount") {
      result.visitCount = Math.max(0, Number(body.visitCount || 0));
    } else {
      result[field] = String(body[field] ?? "").trim();
    }
  });

  if (Object.prototype.hasOwnProperty.call(result, "email")) {
    result.email = result.email.toLowerCase();
  }

  if (Object.prototype.hasOwnProperty.call(result, "companyName")) {
    result.companyName = result.companyName.replace(/\s+/g, "-");
  }

  if (Object.prototype.hasOwnProperty.call(result, "option")) {
    const option = Number.parseInt(result.option, 10);
    if (!Number.isInteger(option) || option < 1 || option > 37) {
      const error = new Error("Template option must be between 1 and 37.");
      error.status = 400;
      throw error;
    }
    result.option = String(option);
    [result.color01, result.color02] = TEMPLATE_COLORS[option - 1];
  } else if (creating) {
    result.option = "1";
    [result.color01, result.color02] = TEMPLATE_COLORS[0];
  }

  return result;
};

const validateDashboardIdentity = async (
  { email, companyName },
  excludeId = null,
) => {
  if (email) {
    const existingEmail = await Client.findOne({
      email: { $regex: `^${escapeRegex(email)}$`, $options: "i" },
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    }).select("_id");
    if (existingEmail) {
      const error = new Error("A profile with this email already exists.");
      error.status = 409;
      throw error;
    }
  }

  if (companyName) {
    const existingCompany = await Client.findOne({
      companyName: {
        $regex: `^${escapeRegex(companyName)}$`,
        $options: "i",
      },
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    }).select("_id");
    if (existingCompany) {
      const error = new Error("This profile URL name is already in use.");
      error.status = 409;
      throw error;
    }
  }
};

const normalizeIdentityValue = (value) =>
  String(value || "").trim().toLowerCase();

const requireDashboardObjectId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid client ID." });
  }
  next();
};

// Dashboard 02: paginated client directory.
router.get("/admin/clients", requireAdminAccess, async (req, res, next) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page || "1", 10));
    const limit = Math.min(
      100,
      Math.max(1, Number.parseInt(req.query.limit || "12", 10)),
    );
    const search = String(req.query.search || "").trim();
    const query = {};

    if (search) {
      const regex = new RegExp(escapeRegex(search), "i");
      query.$or = [
        { companyName: regex },
        { name: regex },
        { clientName: regex },
        { email: regex },
      ];
    }
    const [items, total] = await Promise.all([
      Client.find(query)
        .select("-flag")
        .sort({ _id: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Client.countDocuments(query),
    ]);

    res.status(200).json({
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
      stats: {
        total,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Dashboard 02: load one client by MongoDB ID.
router.get(
  "/admin/clients/:id",
  requireAdminAccess,
  requireDashboardObjectId,
  async (req, res, next) => {
    try {
      const client = await Client.findById(req.params.id)
        .select("-flag")
        .lean();
      if (!client) {
        return res.status(404).json({ message: "Client not found." });
      }
      res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  },
);

// Dashboard 02: create a profile.
router.post("/admin/clients", requireAdminAccess, async (req, res, next) => {
  try {
    const payload = cleanDashboardBody(req.body, true);
    const password = String(req.body.password || "");

    if (!payload.companyName || !payload.email || !password) {
      return res.status(400).json({
        message: "Profile URL name, email and password are required.",
      });
    }

    await validateDashboardIdentity(payload);
    payload.password = await hashPassword(password);

    const client = await Client.create(payload);
    res.status(201).json({
      message: "Profile created successfully.",
      client: dashboardClientJson(client),
    });
  } catch (error) {
    next(error);
  }
});

const updateDashboardClient = async (req, res, next) => {
  try {
    const payload = cleanDashboardBody(req.body);
    const password = String(req.body.password || "");

    const existingClient = await Client.findById(req.params.id)
      .select("email companyName")
      .lean();

    if (!existingClient) {
      return res.status(404).json({ message: "Client not found." });
    }

    // Only run uniqueness checks when an identity value is actually changed.
    // This allows legacy profiles that already share an email to be edited
    // without falsely treating the profile's own unchanged email as a conflict.
    const changedIdentity = {};
    if (
      Object.prototype.hasOwnProperty.call(payload, "email") &&
      normalizeIdentityValue(payload.email) !==
        normalizeIdentityValue(existingClient.email)
    ) {
      changedIdentity.email = payload.email;
    }
    if (
      Object.prototype.hasOwnProperty.call(payload, "companyName") &&
      normalizeIdentityValue(payload.companyName) !==
        normalizeIdentityValue(existingClient.companyName)
    ) {
      changedIdentity.companyName = payload.companyName;
    }

    await validateDashboardIdentity(changedIdentity, existingClient._id);
    if (password) payload.password = await hashPassword(password);

    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { $set: payload },
      { new: true, runValidators: true },
    );

    if (!client) {
      return res.status(404).json({ message: "Client not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully.",
      client: dashboardClientJson(client),
    });
  } catch (error) {
    next(error);
  }
};

router.patch(
  "/admin/clients/:id",
  requireAdminAccess,
  requireDashboardObjectId,
  updateDashboardClient,
);
router.put(
  "/admin/clients/:id",
  requireAdminAccess,
  requireDashboardObjectId,
  updateDashboardClient,
);

router.delete(
  "/admin/clients/:id",
  requireAdminAccess,
  requireDashboardObjectId,
  async (req, res, next) => {
    try {
      const client = await Client.findByIdAndDelete(req.params.id);
      if (!client) {
        return res.status(404).json({ message: "Client not found." });
      }
      res.status(200).json({ message: "Client deleted successfully." });
    } catch (error) {
      next(error);
    }
  },
);

// GET all reviews
router.route("/reviews").get(async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new review
router.route("/addReview").post(async (req, res) => {
  try {
    const { name, description, stars } = req.body;
    const review = new Review({ name, description, stars });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// GET all reviews
router.route("/rafareviews").get(async (req, res) => {
  try {
    const rafareviews = await RafaReview.find();
    res.json(rafareviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new review
router.route("/addRafaReview").post(async (req, res) => {
  try {
    const { name, description, stars } = req.body;
    const rafareview = new RafaReview({ name, description, stars });
    await rafareview.save();
    res.status(201).json(rafareview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
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
    option,
    visitCount,
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
        option,
        visitCount,
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

router.route("/client/:companyName").get(async (req, res) => {
  const { companyName } = req.params;
  console.log(companyName);
  // Validate the ID format

  try {
    // Find the client by ID
    const client = await Client.findOne({ companyName: companyName });

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
router.route("/clients/:companyName").get(async (req, res) => {
  const { companyName } = req.params;
  console.log(companyName);
  // Validate the ID format

  try {
    // Find the client by ID
    const client = await Client.findOne({ _id: companyName });

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
    console.log(req.body);
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
      option,
      visitCount,
    } = req.body;

    const userCreated = await Client.create({
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
      option,
      visitCount,
    });

    res.status(201).json({
      msg: "client making successful",
    });
  } catch (error) {
    // res.status(500).json("internal server error");
    next(error);
  }
});

router.route("/fetchClients").get(async (req, res) => {
  try {
    const clients = await Client.find();
    console.log("Fetched clients count:", clients.length);
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching clients",
      details: error.message,
    });
  }
});

router.delete("/deleteClient/:id", async (req, res) => {
  const { id } = req.params;
  await Client.findByIdAndDelete(id);
  res.status(200).json({ message: "Client deleted" });
});

router.use(require("../middlewares/error-middleware.js"));

module.exports = router;
