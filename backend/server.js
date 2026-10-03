const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const { co2 } = require("@tgwf/co2");

const authRoutes = require("./routes/authRoutes");
const scholarshipRoutes = require("./routes/scholarshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const Scholarship = require("./models/Scholarship");

dotenv.config({
  path: path.join(__dirname, ".env"),
});

const app = express();

app.use(express.json());
app.use(cors());

// Initialize CO2.js with the Sustainable Web Design model
const co2Emission = new co2({ model: "swd" });

// Middleware to calculate data transfer size and CO2 emissions
app.use((req, res, next) => {
  let requestBytes = 0;
  let responseBytes = 0;

  // Calculate request size
  if (req.body) {
    requestBytes += Buffer.byteLength(JSON.stringify(req.body), "utf8");
  }
  if (req.query) {
    requestBytes += Buffer.byteLength(JSON.stringify(req.query), "utf8");
  }
  if (req.headers) {
    requestBytes += Buffer.byteLength(JSON.stringify(req.headers), "utf8");
  }

  // Override res.write to calculate response size
  const originalWrite = res.write;
  const originalEnd = res.end;

  res.write = function (chunk) {
    if (chunk) {
      responseBytes += Buffer.byteLength(chunk, "utf8");
    }
    return originalWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk) {
      responseBytes += Buffer.byteLength(chunk, "utf8");
    }
    // Store total bytes
    res.locals.totalBytes = requestBytes + responseBytes;

    // Calculate carbon emissions
    const greenHost = false; // Set to true if server is hosted on a green host
    const emissions = co2Emission.perByte(res.locals.totalBytes, greenHost);

    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log(`Data transferred: ${res.locals.totalBytes} bytes`);
    console.log(`Estimated CO2 emissions: ${emissions.toFixed(6)} grams`);

    return originalEnd.apply(res, arguments);
  };

  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.send("Grantify Backend Server Running Successfully");
});

const mongoUri = process.env.MONGO_URI;

// Function to seed initial scholarships if database is empty
const seedInitialScholarships = async () => {
  try {
    const count = await Scholarship.countDocuments();
    if (count === 0) {
      const initialScholarships = [
        {
          title: "Global Excellence Scholarship",
          university: "University of Oxford",
          country: "United Kingdom",
          degree: "Master's",
          amount: "$25,000",
          deadline: "30 June 2026",
        },
        {
          title: "International Student Scholarship",
          university: "University of Toronto",
          country: "Canada",
          degree: "Bachelor's",
          amount: "$15,000",
          deadline: "15 July 2026",
        },
        {
          title: "Future Leaders Scholarship",
          university: "University of Melbourne",
          country: "Australia",
          degree: "Master's",
          amount: "$20,000",
          deadline: "1 August 2026",
        },
        {
          title: "Academic Achievement Scholarship",
          university: "University of Amsterdam",
          country: "Netherlands",
          degree: "Bachelor's",
          amount: "$10,000",
          deadline: "20 August 2026",
        },
      ];
      await Scholarship.insertMany(initialScholarships);
      console.log("Initial scholarships seeded successfully into MongoDB!");
    }
  } catch (err) {
    console.error("Error seeding initial scholarships:", err.message);
  }
};

// Connect to MongoDB Replica Set
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB Replica Set Connected Successfully!");
    await seedInitialScholarships();
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Grantify Backend Server running on port ${PORT}`);
});
