const express = require("express");
const Application = require("../models/Application");

const router = express.Router();

// POST /api/applications (Apply for a scholarship)
router.post("/", async (req, res) => {
  try {
    const { studentEmail, studentName, scholarshipId, scholarshipTitle, university, country, degree } = req.body;

    if (!studentEmail || !scholarshipId || !scholarshipTitle) {
      return res.status(400).json({
        error: true,
        message: "Student email, scholarship ID, and scholarship title are required.",
      });
    }

    const normalizedEmail = studentEmail.trim().toLowerCase();

    // Check if student already applied
    const existing = await Application.findOne({
      studentEmail: normalizedEmail,
      scholarshipId: String(scholarshipId),
    });

    if (existing) {
      return res.status(400).json({
        error: true,
        message: "You have already applied for this scholarship.",
        application: existing,
      });
    }

    const newApplication = new Application({
      studentEmail: normalizedEmail,
      studentName: studentName || "Student",
      scholarshipId: String(scholarshipId),
      scholarshipTitle: scholarshipTitle.trim(),
      university: university ? university.trim() : "Global University",
      country: country || "",
      degree: degree || "",
      status: "applied",
    });

    await newApplication.save();

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      application: newApplication,
    });
  } catch (error) {
    console.error("Submit Application Error:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        error: true,
        message: "You have already applied for this scholarship.",
      });
    }
    return res.status(500).json({ error: true, message: "Server error submitting application." });
  }
});

// GET /api/applications/student/:email (Fetch applications for a student)
router.get("/student/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const normalizedEmail = email.trim().toLowerCase();

    const applications = await Application.find({ studentEmail: normalizedEmail }).sort({ appliedAt: -1 });

    const stats = {
      applied: applications.filter((app) => app.status === "applied").length,
      accepted: applications.filter((app) => app.status === "accepted").length,
      rejected: applications.filter((app) => app.status === "rejected").length,
    };

    return res.status(200).json({
      success: true,
      stats,
      applications,
    });
  } catch (error) {
    console.error("Fetch Student Applications Error:", error);
    return res.status(500).json({ error: true, message: "Failed to fetch applications." });
  }
});

// GET /api/applications (Fetch all applications)
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().sort({ appliedAt: -1 });
    return res.status(200).json(applications);
  } catch (error) {
    console.error("Fetch All Applications Error:", error);
    return res.status(500).json({ error: true, message: "Failed to fetch applications." });
  }
});

// PUT /api/applications/:id/status (Update application status: applied | accepted | rejected)
router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["applied", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        error: true,
        message: "Invalid status. Allowed values: applied, accepted, rejected.",
      });
    }

    const updated = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: true, message: "Application not found." });
    }

    return res.status(200).json({
      success: true,
      message: `Application status updated to ${status}.`,
      application: updated,
    });
  } catch (error) {
    console.error("Update Application Status Error:", error);
    return res.status(500).json({ error: true, message: "Failed to update application status." });
  }
});

// DELETE /api/applications/:id (Delete application)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Application.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: true, message: "Application not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Application removed successfully.",
    });
  } catch (error) {
    console.error("Delete Application Error:", error);
    return res.status(500).json({ error: true, message: "Failed to delete application." });
  }
});

module.exports = router;
