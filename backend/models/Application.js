const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  studentEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  studentName: {
    type: String,
    trim: true,
  },
  scholarshipId: {
    type: String,
    required: true,
  },
  scholarshipTitle: {
    type: String,
    required: true,
    trim: true,
  },
  university: {
    type: String,
    trim: true,
    default: "Global University",
  },
  country: {
    type: String,
    trim: true,
  },
  degree: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["applied", "accepted", "rejected"],
    default: "applied",
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index to prevent duplicate active applications for the same scholarship by the same student
applicationSchema.index({ studentEmail: 1, scholarshipId: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
