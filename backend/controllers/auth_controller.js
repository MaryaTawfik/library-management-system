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
      "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="; 
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

    const result = await authService.registeruser(data);
    
    const responsePayload = { message: "User registered successfully", user: result.user };
    if (!result.emailSent) {
      // expose verification urls to ease local testing when mail can't be sent
      responsePayload.verificationUrl = result.verificationUrl;
      if (result.frontendVerificationUrl) responsePayload.frontendVerificationUrl = result.frontendVerificationUrl;
      responsePayload.note = 'Email not sent — use verificationUrl to verify manually.';
    }
    res.status(201).json(responsePayload);
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



const verifyEmail = async (req, res) => {
  try {
    const result = await authService.verifyEmail(req.params.token);

    if (result.success) {
      return res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Email Verified</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: #f4f4f9;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
            }
            .card {
              background: white;
              padding: 2rem;
              border-radius: 12px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.1);
              text-align: center;
            }
            h1 { color: #4caf50; }
            p { margin-top: 1rem; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>✅ Email Verified</h1>
            <p>Your email has been successfully verified. You can now log in.</p>
          </div>
        </body>
        </html>
      `);
    }

    return res.status(400).send(`
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Email Verified</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: #f4f4f9;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
            }
            .card {
              background: white;
              padding: 2rem;
              border-radius: 12px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.1);
              text-align: center;
            }
            h1 { color: #ed1123ff; }
            p { margin-top: 1rem; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>❌ Verification Failed</h1>
            <p>${result.message || "Invalid or expired token."}</p>
          </div>
        </body>
        </html>`
      
     
    );

  } catch (error) {
    return res.status(500).send("<h1>⚠️ Something went wrong.</h1>");
  }
};


// const verifyEmail = async (req, res) => {
//   try {
//     const result = await authService.verifyEmail(req.params.token);

//     const frontendLogin = process.env.BASE_URL || process.env.CLIENT_URL || null;

//     if (result.success) {
//       if (frontendLogin) {
//         // If frontend configured, redirect there so user sees login screen
//         // Append ?verified=true so frontend can show a confirmation message
//         const separator = frontendLogin.includes('?') ? '&' : '?';
//         const url = `${frontendLogin}${separator}verified=true`;
//         return res.redirect(url);
//       }

//       // No frontend configured — return a simple success HTML page
//       return res.send(`
//         <!DOCTYPE html>
//         <html lang="en">
//         <head><meta charset="utf-8" /><title>Email Verified</title></head>
//         <body>
//           <h1>✅ Email Verified</h1>
//           <p>Your email has been successfully verified. You can now log in.</p>
//         </body>
//         </html>
//       `);
//     }

//     // Verification failed
//     if (frontendLogin) {
//       return res.redirect(`${frontendLogin}?error=${encodeURIComponent(result.message || 'Invalid or expired token')}`);
//     }

//     return res.status(400).send(`<h1>❌ Verification Failed</h1><p>${result.message || 'Invalid or expired token.'}</p>`);

//   } catch (error) {
//     const frontendLogin = process.env.BASE_URL || process.env.CLIENT_URL || null;
//     if (frontendLogin) {
//       return res.redirect(`${frontendLogin}?error=Something went wrong`);
//     }
//     return res.status(500).send('<h1>⚠️ Something went wrong.</h1>');
//   }
// };



module.exports = {
  register,
  login,
  updateProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmail,
};
