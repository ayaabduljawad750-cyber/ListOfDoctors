const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://ayaabduljawad:mongopassword@cluster0.44npmwz.mongodb.net/sample_app",
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Simple Schema
const DoctorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  specialization: String,
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

// Hardcoded Data (insert once)
const seedData = async () => {
  const count = await Doctor.countDocuments();
  if (count === 0) {
    await Doctor.insertMany([
      {
        name: "Dr. Ahmed Hassan",
        specialization: "Cardiology",
        age: 45,
        gender: "Male",
      },
      {
        name: "Dr. Sara Ali",
        specialization: "Dermatology",
        age: 38,
        gender: "Female",
      },
      {
        name: "Dr. Mohamed Youssef",
        specialization: "Neurology",
        age: 50,
        gender: "Male",
      },
      {
        name: "Dr. Nour El-Din",
        specialization: "Pediatrics",
        age: 35,
        gender: "Male",
      },
      {
        name: "Dr. Fatma Khaled",
        specialization: "Gynecology",
        age: 42,
        gender: "Female",
      },
    ]);
    console.log("Data seeded");
  }
};
seedData();

// API Route
app.get("/api/doctors", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

// Run server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
