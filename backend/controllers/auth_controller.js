const authService = require("../services/auth_service");

const register = async (req, res) => {
  try {
    const { userID, firstName, lastName, email, password, phoneNumber } =
      req.body;

    if (req.body.role === "Admin") {
      return res
        .status(403)
        .json({ message: "Cannot register as Admin. Admin account is fixed." });
    }

    let profileImage =
      "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="; // default
    if (req.file && req.file.path) {
      profileImage = req.file.path;
    }

    const data = {
      userID,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role: "student",

      profileImage,
    };

    if (
      !data.userID ||
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.password ||
      !data.phoneNumber
    ) {
      return res.status(400).json({ message: "Missing required user data" });
    }

    const user = await authService.registeruser(data);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res
        .status(409)
        .json({ message: "User already registered with this email" });
    }

    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.loginuser(email, password);
    res.json({ token, user });
  } catch (err) {
    console.log("Login error:", err.message);
    res.status(401).json({
      message: "Login failed. " + err.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedData = req.body;

    if (req.file) {
      updatedData.profileImage = req.file.path;
    }

    const updatedUser = await authService.updateUserProfile(
      userId,
      updatedData
    );
    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Update profile error:", err && (err.stack || err));
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};



const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.requestPasswordReset(email);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const result = await authService.resetPassword(token, newPassword);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;
    const result = await authService.changePassword(
      userId,
      currentPassword,
      newPassword
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
  updateProfile,
  forgotPassword,
  resetPassword,
  changePassword,
};
