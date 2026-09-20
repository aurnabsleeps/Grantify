const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Scholarship = require("../models/Scholarship");

const router = express.Router();

// Register Route (Student or Admin)
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role = "student",
      cgpa,
      country,
      degree,
      field,
      institution,
      graduationYear,
    } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "Name, email, and password are required." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: true, message: "An account with this email already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user in MongoDB
    const newUser = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
      cgpa: cgpa !== undefined && cgpa !== "" ? Number(cgpa) : undefined,
      country: country || "",
      degree: degree || "",
      field: field || "",
      institution: institution || "",
      graduationYear: graduationYear || "",
    });

    await newUser.save();

    // Generate JWT Token
    const jwtSecret = process.env.JWT_SECRET || "grantify_secret_key_2026";
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      jwtSecret,
      { expiresIn: "7d" }
    );

    const userObj = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      cgpa: newUser.cgpa,
      country: newUser.country,
      degree: newUser.degree,
      field: newUser.field,
      institution: newUser.institution,
      graduationYear: newUser.graduationYear,
    };

    return res.status(201).json({
      success: true,
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully!`,
      token,
      user: userObj,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ error: true, message: "Server error during registration." });
  }
});

// Login Route (Student or Admin)
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "Email and password are required." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user in MongoDB
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: "No account found with this email." });
    }

    // Verify role if specified
    if (role && user.role !== role) {
      return res.status(403).json({
        error: true,
        message: `This account is registered as a ${user.role}. Please log in on the ${user.role} login page.`,
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid email or password." });
    }

    // Generate JWT Token
    const jwtSecret = process.env.JWT_SECRET || "grantify_secret_key_2026";
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: "7d" }
    );

    const userObj = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      cgpa: user.cgpa,
      country: user.country,
      degree: user.degree,
      field: user.field,
      institution: user.institution,
      graduationYear: user.graduationYear,
    };

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: userObj,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: true, message: "Server error during login." });
  }
});

// Profile Fetch Route (GET)
router.get("/profile/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ error: true, message: "User profile not found." });
    }

    const userObj = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      cgpa: user.cgpa,
      country: user.country,
      degree: user.degree,
      field: user.field,
      institution: user.institution,
      graduationYear: user.graduationYear,
    };

    return res.status(200).json({ success: true, user: userObj });
  } catch (error) {
    console.error("Fetch Profile Error:", error);
    return res.status(500).json({ error: true, message: "Server error fetching profile." });
  }
});

// Profile Update Route (PUT)
router.put("/profile", async (req, res) => {
  try {
    const { email, name, country, cgpa, degree, field, institution, graduationYear } = req.body;

    if (!email) {
      return res.status(400).json({ error: true, message: "User email is required." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const updatedUser = await User.findOneAndUpdate(
      { email: normalizedEmail },
      {
        name,
        country,
        cgpa: cgpa !== undefined && cgpa !== "" ? Number(cgpa) : undefined,
        degree,
        field,
        institution,
        graduationYear,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: true, message: "User profile not found." });
    }

    const userObj = {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      cgpa: updatedUser.cgpa,
      country: updatedUser.country,
      degree: updatedUser.degree,
      field: updatedUser.field,
      institution: updatedUser.institution,
      graduationYear: updatedUser.graduationYear,
    };

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: userObj,
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    return res.status(500).json({ error: true, message: "Server error updating profile." });
  }
});

// List All Users for Admin Management
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password").sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    console.error("Fetch Users Error:", error);
    return res.status(500).json({ error: true, message: "Failed to fetch registered users." });
  }
});

// Delete User by ID for Admin Management
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: true, message: "User not found." });
    }
    return res.status(200).json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    console.error("Delete User Error:", error);
    return res.status(500).json({ error: true, message: "Failed to delete user." });
  }
});

// Admin Analytics / Stats Route
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const studentCount = await User.countDocuments({ role: "student" });
    const adminCount = await User.countDocuments({ role: "admin" });
    const activeScholarships = await Scholarship.countDocuments();

    return res.status(200).json({
      totalUsers,
      studentCount,
      adminCount,
      activeScholarships,
      totalApplications: 3420,
      successRate: "68%",
    });
  } catch (error) {
    console.error("Fetch Stats Error:", error);
    return res.status(500).json({ error: true, message: "Failed to fetch analytics statistics." });
  }
});

module.exports = router;
