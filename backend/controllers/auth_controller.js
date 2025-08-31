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

    // ✅ Handle profile image
    let profileImage = "https://via.placeholder.com/150"; // default
    if (req.file && req.file.path) {
      profileImage = req.file.path;

    if (req.body.role === 'Admin') {
      return res.status(403).json({ message: 'Cannot register as Admin. Admin account is fixed.' });

    }

    // ✅ Handle profile image
    let profileImage = 'https://via.placeholder.com/150'; // default
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
      is_member: true,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      profileImage, // ✅ Add image to user data

      role: 'student',
      is_member: true,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      profileImage // ✅ Add image to user data

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


      return res.status(409).json({ message: 'User already registered with this email' });
    }

    res.status(500).json({ message: 'Server error', error: err.message });
  }
};






const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.loginuser(email, password);
    res.json({ token, user });
  } catch (err) {

    console.error("Login error:", err && (err.stack || err));
    res.status(401).json({ error: err.message });

  console.error('Login error:', err && (err.stack || err));
  res.status(401).json({ error: err.message });
    

  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Get the authenticated user's ID
    const updatedData = req.body;

    // If a new profile image is uploaded, include it in the update
    if (req.file) {
      updatedData.profileImage = req.file.path; // Assuming multer is set up
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
module.exports = { register, login, updateProfile };

    const updatedUser = await authService.updateUserProfile(userId, updatedData);
    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
  console.error('Update profile error:', err && (err.stack || err));
  res.status(500).json({ message: 'Update failed', error: err.message });
  }
};
module.exports = { register, login , updateProfile};

