// const User = require('../models/userSchema');
// const bcrypt = require('bcryptjs');

// exports.registerUser = async (req, res) => {
//   const { user_name, user_email, user_password, user_mobile } = req.body;
//   try {
//     if (!user_name || !user_email || !user_password || !user_mobile ) {
//       return res.status(400).json({ error: "Fill the empty fields" });
//     }

//     const existingEmail = await User.findOne({ user_email });
//     const existingUsername = await User.findOne({ user_name });

//     if (existingEmail || existingUsername) {
//       return res.status(409).json({ error: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(user_password, 10);
//     const createUser = await User.create({
//       user_name,
//       user_email,
//       user_password: hashedPassword,
//       user_mobile,
//       user_role:user_role || "user",
      
//     });

//     return res.status(200).json({
//       message: "User created successfully",
//       data: {
//         user_name,
//         user_email,
//         user_mobile,
//         user_role: user_role || "user",
        
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: err.message });
//   }
// };

// exports.loginUser = async (req, res) => {
//   const { user_name, user_password } = req.body;
//   try {
//     if (!user_name || !user_password) {
//       return res.status(400).json({ error: "Fill the empty fields" });
//     }

//     const user = await User.findOne({ user_name });
//     if (!user) {
//       return res.status(400).json({ error: 'User not found' });
//     }

//     const isPasswordCorrect = await bcrypt.compare(user_password, user.user_password);
//     if (!isPasswordCorrect) {
//       return res.status(400).json({ error: "Wrong Credentials" });
//     }
    

//     return res.status(200).json({
//       message: "User signed in successfully",
//       data: {
//         user_name: user.user_name,
//         user_email: user.user_email,
//         user_mobile: user.user_mobile,
//         user_role: user.user_role,
        
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: err.message });
//   }
// };

// exports.getUserByUsername = async (req, res) => {
//   const { username } = req.params;
//   try {
//     const userData = await User.findOne({ user_name: username });
//     if (!userData) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     console.error('Error fetching user data:', err);
//     res.status(500).json({ error: 'An error occurred while fetching user data' });
//   }
// };

// exports.updateUser = async (req, res) => {
//   const { username } = req.params;
//   const { user_name, user_email, user_mobile } = req.body;

//   try {
//     const user = await User.findOne({ user_name: username });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     if (user_name) user.user_name = user_name;
//     if (user_email) user.user_email = user_email;
//     if (user_mobile) user.user_mobile = user_mobile;
//     if(user_role) user.user_role = user_role;
    

//     await user.save();

//     return res.status(200).json({
//       message: 'User updated successfully',
//       data: {
//         user_name: user.user_name,
//         user_email: user.user_email,
//         user_mobile: user.user_mobile,
        
//       },
//     });
//   } catch (err) {
//     console.error('Error updating user data:', err);
//     return res.status(500).json({ error: 'An error occurred while updating user data' });
//   }
// };



const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "bhutsecret"


// Register a new user
exports.registerUser = async (req, res) => {
  const { user_name, user_email, user_password, user_mobile, user_role } = req.body;

  try {
    // Check for missing fields
    if (!user_name || !user_email || !user_password || !user_mobile) {
      return res.status(400).json({ error: "Please fill in all required fields." });
    }

    // Check if email or username already exists
    const existingEmail = await User.findOne({ user_email });
    const existingUsername = await User.findOne({ user_name });

    if (existingEmail || existingUsername) {
      return res.status(409).json({ error: "Username or email already exists." });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(user_password, 10);

    // Create a new user
    const createUser = await User.create({
      user_name,
      user_email,
      user_password: hashedPassword,
      user_mobile,
      user_role: user_role || "User", // Default role is "User"
    });

    return res.status(201).json({
      message: "User registered successfully.",
      data: {
        user_name,
        user_email,
        user_mobile,
        user_role: user_role || "User",
      },
    });
  } catch (err) {
    console.error("Error during user registration:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// Log in an existing user

exports.loginUser = async (req, res) => {
  const { user_name, user_password } = req.body;

  try {
    if (!user_name || !user_password) {
      return res.status(400).json({ error: "Please fill in all required fields." });
    }

    const user = await User.findOne({ user_name });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(user_password, user.user_password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate JWT
    const token = jwt.sign(
      { user_id: user._id, user_role: user.user_role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set the cookie
    res.cookie('auth_token', token, {
      httpOnly: true,         // Prevents JavaScript access
      secure: process.env.NODE_ENV === 'production', // Ensures cookies are sent over HTTPS
      sameSite: 'Strict',     // Prevents CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "User logged in successfully.",
      data: {
        user_name: user.user_name,
        user_email: user.user_email,
        user_mobile: user.user_mobile,
        user_role: user.user_role,
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};


// Get user details by username
exports.getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const userData = await User.findOne({ user_name: username });
    if (!userData) {
      return res.status(404).json({ error: "User not found." });
    }
    // console.log(userData);
    return res.status(200).json(userData);
  } catch (err) {
    console.error("Error fetching user data:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  const { username } = req.params;
  const { user_name, user_email, user_mobile, user_role } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ user_name: username });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update fields if they are provided
    if (user_name) user.user_name = user_name;
    if (user_email) user.user_email = user_email;
    if (user_mobile) user.user_mobile = user_mobile;
    if (user_role) user.user_role = user_role;

    // Save updated user data
    await user.save();

    return res.status(200).json({
      message: "User updated successfully.",
      data: {
        user_name: user.user_name,
        user_email: user.user_email,
        user_mobile: user.user_mobile,
        user_role: user.user_role,
      },
    });
  } catch (err) {
    console.error("Error updating user data:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};









// const User = require('../models/userSchema');
// const bcrypt = require('bcryptjs');

// // Register a new user
// exports.registerUser = async (req, res) => {
//   const { user_name, user_email, user_password, user_mobile, role } = req.body;

//   try {
//     if (!user_name || !user_email || !user_password || !user_mobile || !role) {
//       return res.status(400).json({ error: "Fill the empty fields" });
//     }

//     const existingEmail = await User.findOne({ user_email });
//     const existingUsername = await User.findOne({ user_name });

//     if (existingEmail || existingUsername) {
//       return res.status(409).json({ error: "User already exists" });
//     }

//     if (!["admin", "user"].includes(role)) {
//       return res.status(400).json({ error: "Invalid role. Allowed roles: admin, user" });
//     }

//     const hashedPassword = await bcrypt.hash(user_password, 10);

//     const createUser = await User.create({
//       user_name,
//       user_email,
//       user_password: hashedPassword,
//       user_mobile,
//       role,
//     });

//     return res.status(200).json({
//       message: "User created successfully",
//       data: {
//         user_name,
//         user_email,
//         user_mobile,
//         role,
//       },
//     });
//   } catch (err) {
//     console.error("Error during registration:", err);
//     return res.status(500).json({ error: "Server error during registration" });
//   }
// };

// // Login an existing user
// exports.loginUser = async (req, res) => {
//   const { user_name, user_password } = req.body;

//   try {
//     if (!user_name || !user_password) {
//       return res.status(400).json({ error: "Fill the empty fields" });
//     }

//     const user = await User.findOne({ user_name });
//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     const isPasswordCorrect = await bcrypt.compare(user_password, user.user_password);
//     if (!isPasswordCorrect) {
//       return res.status(400).json({ error: "Wrong Credentials" });
//     }

//     if (user.role === "admin") {
//       return res.status(200).json({
//         message: "Login successful as admin",
//         redirect: "/admin",
//         data: {
//           user_name: user.user_name,
//           user_email: user.user_email,
//           role: user.role,
//         },
//       });
//     } else if (user.role === "user") {
//       return res.status(200).json({
//         message: "Login successful as user",
//         redirect: "/home",
//         data: {
//           user_name: user.user_name,
//           user_email: user.user_email,
//           role: user.role,
//         },
//       });
//     } else {
//       return res.status(400).json({ error: "Invalid role" });
//     }
//   } catch (err) {
//     console.error("Login error:", err);
//     return res.status(500).json({ error: "Server error during login" });
//   }
// };

// // Get user details by username
// exports.getUserByUsername = async (req, res) => {
//   const { username } = req.params;

//   try {
//     const userData = await User.findOne({ user_name: username });
//     if (!userData) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     console.error("Error fetching user data:", err);
//     res.status(500).json({ error: "An error occurred while fetching user data" });
//   }
// };

// // Update user details
// exports.updateUser = async (req, res) => {
//   const { username } = req.params;
//   const { user_name, user_email, user_mobile, role } = req.body;

//   try {
//     const user = await User.findOne({ user_name: username });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (user_name) user.user_name = user_name;
//     if (user_email) user.user_email = user_email;
//     if (user_mobile) user.user_mobile = user_mobile;
//     if (role && ["admin", "user"].includes(role)) user.role = role;

//     await user.save();

//     return res.status(200).json({
//       message: "User updated successfully",
//       data: {
//         user_name: user.user_name,
//         user_email: user.user_email,
//         user_mobile: user.user_mobile,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error("Error updating user data:", err);
//     return res.status(500).json({ error: "An error occurred while updating user data" });
//   }
// };
