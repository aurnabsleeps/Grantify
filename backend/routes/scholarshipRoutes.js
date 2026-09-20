const express = require("express");
const Scholarship = require("../models/Scholarship");

const router = express.Router();

// GET /api/scholarships (with search & filter)
router.get("/", async (req, res) => {
  try {
    const { search, country, degree } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { university: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
      ];
    }

    if (country && country !== "All Countries") {
      query.country = { $regex: country, $options: "i" };
    }

    if (degree && degree !== "All Degrees") {
      query.degree = { $regex: degree, $options: "i" };
    }

    const scholarships = await Scholarship.find(query).sort({ createdAt: -1 });
    return res.status(200).json(scholarships);
  } catch (error) {
    console.error("Fetch Scholarships Error:", error);
    return res.status(500).json({ error: true, message: "Failed to fetch scholarships." });
  }
});

// POST /api/scholarships (Add new scholarship)
router.post("/", async (req, res) => {
  try {
    const { title, university, country, degree, amount, deadline } = req.body;

    if (!title || !country || !degree) {
      return res.status(400).json({
        error: true,
        message: "Title, country, and degree are required.",
      });
    }

    const newScholarship = new Scholarship({
      title: title.trim(),
      university: university ? university.trim() : "Global University",
      country: country.trim(),
      degree: degree.trim(),
      amount: amount ? amount.trim() : "$10,000",
      deadline: deadline ? deadline.trim() : "31 December 2026",
    });

    await newScholarship.save();

    return res.status(201).json({
      success: true,
      message: "Scholarship created successfully.",
      scholarship: newScholarship,
    });
  } catch (error) {
    console.error("Create Scholarship Error:", error);
    return res.status(500).json({ error: true, message: "Failed to create scholarship." });
  }
});

// PUT /api/scholarships/:id (Update existing scholarship)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, university, country, degree, amount, deadline } = req.body;

    const updated = await Scholarship.findByIdAndUpdate(
      id,
      { title, university, country, degree, amount, deadline },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: true, message: "Scholarship not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Scholarship updated successfully.",
      scholarship: updated,
    });
  } catch (error) {
    console.error("Update Scholarship Error:", error);
    return res.status(500).json({ error: true, message: "Failed to update scholarship." });
  }
});

// DELETE /api/scholarships/:id (Delete scholarship)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Scholarship.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: true, message: "Scholarship not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Scholarship deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Scholarship Error:", error);
    return res.status(500).json({ error: true, message: "Failed to delete scholarship." });
  }
});

module.exports = router;
