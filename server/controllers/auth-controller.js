const bcrypt = require("bcryptjs");
const Client = require("../models/client-model");
const {
  createAuthSession,
  destroyAuthSession,
  hashPassword,
  loadAuth,
  verifyPassword,
} = require("../middlewares/auth-middleware");

const escapeRegex = (value) =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const verifyAdminCredentials = async (email, password) => {
  const adminEmail = String(process.env.ADMIN_EMAIL || "")
    .trim()
    .toLowerCase();
  if (!adminEmail || email !== adminEmail) return false;

  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  if (passwordHash) return bcrypt.compare(password, passwordHash);

  const plainPassword = process.env.ADMIN_PASSWORD;
  return plainPassword ? password === plainPassword : false;
};

const login = async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    if (await verifyAdminCredentials(email, password)) {
      await destroyAuthSession(req, res);
      await createAuthSession(res, { role: "admin" });
      return res.status(200).json({
        message: "Administrator login successful.",
        role: "admin",
        userId: null,
      });
    }

    const user = await Client.findOne({
      email: { $regex: `^${escapeRegex(email)}$`, $options: "i" },
    }).select("+password");

    if (!user || !(await verifyPassword(password, user.password))) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    if (!/^\$2[aby]\$\d{2}\$/.test(user.password || "")) {
      user.password = await hashPassword(password);
      await user.save();
    }

    await destroyAuthSession(req, res);
    await createAuthSession(res, {
      role: "client",
      clientId: user._id,
    });

    return res.status(200).json({
      message: "Login successful.",
      role: "client",
      userId: user._id,
      profile: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await destroyAuthSession(req, res);
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    next(error);
  }
};

const session = async (req, res, next) => {
  try {
    const auth = await loadAuth(req);
    if (!auth) {
      return res.status(200).json({ authenticated: false });
    }

    res.status(200).json({
      authenticated: true,
      role: auth.role,
      userId: auth.clientId,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, logout, session };
